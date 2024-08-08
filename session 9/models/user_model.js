const mongoose = require('mongoose');
const validator = require('validator');
const {USER, ADMIN , MANAGER} = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true,
    validate : [validator.isEmail, 'failed must be a vaid email address']
  },
  password : {
    type : String,
    required : true
  },
  token : {
    type : String
  },
  role : {
    type : String,
    enum : [USER, ADMIN, MANAGER],
    default : USER
  },
  avatar : {
    type : String,
    default : '../uploads/profile.png'
  }
})


module.exports = mongoose.model('User', userSchema);
