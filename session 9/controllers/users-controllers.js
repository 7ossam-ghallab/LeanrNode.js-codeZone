const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")
const asyncWrapper = require('../routes/middlewares/asyncWrapper')
const User = require('../models/user_model')
const appError = require('../utils/appError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generate_JWT = require("../utils/generate_JWT")

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit; 
  const users = await User.find({}, {"__v": false, "password" : false}).limit(limit).skip(skip);
  // console.log(await User.find())
  res.json({status : SUCCESS, data : {users}})
})


const register = asyncWrapper(async(req, res, next) => {
  // console.log(req.body)
  const {firstName, lastName, email, password, role} = req.body;
  console.log('req.file -> ', req.file)

  const oldUser = await User.findOne({email : email})
  // console.log(oldUser)

  if(oldUser) {
    const error = appError.create('user already exists', 400, FAIL, )
    return next(error)
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password : hashedPassword,
    role,
    avatar : req.file.filename
  })
  await newUser.save()

  // generate JWT
  const token = await generate_JWT({email : newUser.email, id : newUser._id, role : newUser.role})
  // console.log("token", token)
  newUser.token = token

  res.status(201).json({status : SUCCESS, data : {User : newUser}})
})

const login = asyncWrapper(async(req, res, next) => {
  const {email, password} = req.body
  if(!email || !password) {
    const error = appError.create('email and password are required', 400, FAIL)
    return next(error)
  }

  const user = await User.findOne({email : email})
  // console.log(user) // return null if user not found
  if (!user) {
    const error = appError.create('user not found', 400, FAIL)
    return next(error)
  }
  
  const matchedPass = await bcrypt.compare(password, user.password)
  // console.log(matchedPass) // return ture or false
  if(user && matchedPass) {
    // logged in successfully
    const token = await generate_JWT({email : user.email, id : user._id, role : user.role})
    return res.json({status : SUCCESS, data : {token}})
  } else {
    const error = appError.create('something worng', 500, ERROR)
    return next(error)
  } 
})


const deleteAllUsers = asyncWrapper(async(req, res, ) => {
  await User.deleteMany(User.find())
  res.status(200).json({status: SUCCESS, data : null})
})



module.exports = {
  getAllUsers,
  register,
  login,
  deleteAllUsers
}