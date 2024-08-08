const {validationResult} = require('express-validator')
const Course = require('../models/course_model')
const {SUCCESS, FAIL, ERROR} = require("../utils/httpStatusText")
const asyncWrapper = require('../routes/middlewares/asyncWrapper')
const AppError = require('../utils/appError')


const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit; 
  const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
  res.json({status : SUCCESS, data : {courses}})
})
const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
      const course = await Course.findById(req.params.courseID);
      if(!course) {
        const error = AppError.create("not found course", 404, FAIL)
        return next(error);
      } 
      return res.json({status : SUCCESS, data : {course}})
    }
)
const addNewCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, FAIL, )
    return next(error)
  }
  const new_course = new Course(req.body);
  await new_course.save()
  res.status(201).json({status : SUCCESS, data : {course : new_course}})
})
const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseID = req.params.courseID;
  const old_course = await Course.findById(courseID);
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