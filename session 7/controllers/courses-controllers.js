const {validationResult} = require('express-validator')
const Course = require('../models/course_model')
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")
const asyncWrapper = require('../routes/middlewares/asyncWrapper')
const AppError = require('../utils/appError')
const appError = require('../utils/appError')


/*
const getAllCourses = async (req, res) => {
  const query = req.query;
  console.log("query => ", query); // query =>  { limit: '2', page: '1' } from link => http://localhost:5000/api/courses?limit=2&page=1
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit; 
  // get all courses from db using Course model
  // const courses = await Course.find({price : {$gt: 5000}}, {"__v": 0})
  const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
  res.json({status : SUCCESS, data : {courses}})
}
const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseID);
    if(!course) {
      return res.status(404).json({status : FAIL, data : {course : null}})
    } 
    return res.json({status : SUCCESS, data : {course}})
  } catch(err) {
    console.log(err)
    return res.status(400).json({status : ERROR, data : null, messsage : err.messsage,  code : 400})
  }
}
const addNewCourse = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({status : FAIL, data : errors.array()})
  }
  const new_course = new Course(req.body);
  await new_course.save()
  res.status(201).json({status : SUCCESS, data : {course : new_course}})
}
const updateCourse = async (req, res) => {
  const courseID = req.params.courseID;
  const old_course = await Course.findById(courseID);
  try {
    const updatedCourse = await Course.updateOne({_id : courseID}, {$set: {...req.body}})
    return res.status(200).json({status : SUCCESS, data : {course : {oldCourse : old_course,updatedCourse : await Course.findById(courseID)}}})
  } catch(err) {
    return res.status(400).json({status : ERROR, data : null, messsage : err.messsage,  code : 400})
  }
}
const deleteCourse = async (req, res) => {
  console.log(req)
  await Course.deleteOne({_id:req.params.courseID})
  res.status(200).json({status: SUCCESS, data : null})
}
const deleteAllCourses = async (req, res) => {
  await Course.deleteMany(Course.find())
  res.status(200).json({status: SUCCESS, data : null})
}
*/

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit; 
  // get all courses from db using Course model
  // const courses = await Course.find({price : {$gt: 5000}}, {"__v": 0})
  const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
  res.json({status : SUCCESS, data : {courses}})
})
const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
      const course = await Course.findById(req.params.courseID);
      if(!course) {
        /*
        const error = new Error();
        error.message = 'not found course';
        error.statusCode = 404;
        */
        const error = AppError.create("not found course", 404, FAIL)
        return next(error);
      } 
      return res.json({status : SUCCESS, data : {course}})
    }
)
const addNewCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, FAIL, )
    return next(error)
  }
  const new_course = new Course(req.body);
  await new_course.save()
  res.status(201).json({status : SUCCESS, data : {course : new_course}})
})
const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseID = req.params.courseID;
  const old_course = await Course.findById(courseID);
  // const updatedCourse = await Course.updateOne({_id : courseID}, {$set: {...req.body}})
  // console.log(old_course)
  // console.log(await Course.findById(courseID))
  // console.log(JSON.stringify(old_course) == JSON.stringify(await Course.findById(courseID)))
  if(JSON.stringify(old_course) == JSON.stringify(await Course.findById(courseID))) {
    const error = AppError.create("no changes occurred or the field is empty", 400, FAIL)
    return next(error);
  }
  return res.status(200).json({status : SUCCESS, data : {course : {oldCourse : old_course,updatedCourse : await Course.findById(courseID)}}})

})
const deleteCourse = asyncWrapper(async (req, res) => {
  await Course.deleteOne({_id:req.params.courseID})
  res.status(200).json({status: SUCCESS, data : null})
})
const deleteAllCourses = asyncWrapper(async (req, res) => {
  await Course.deleteMany(Course.find())
  res.status(200).json({status: SUCCESS, data : null})
})



module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses
}