const {validationResult} = require('express-validator')
const Course = require('../models/course_model')

const getAllCourses = async (req, res) => {
  // get all courses from db using Course model
  const courses = await Course.find();
  res.json(courses)
}

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseID);
    if(!course) {
      return res.status(404).json({message : "courses not found"})
    } 
    return res.json(course)
  } catch(errr) {
    console.log(errr)
    return res.status(400).json({message : "invalid Object ID"})
  }
}

const addNewCourse = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  const new_course = new Course(req.body);
  await new_course.save()
  res.status(201).json(new_course)
}

const updateCourse = async (req, res) => {
  const courseID = req.params.courseID;
  try {
    const updatedCourse = await Course.updateOne({_id : courseID}, {$set: {...req.body}})
    return res.status(200).json(updatedCourse)
  } catch(e) {
    return res.status(400).json({
      error : e
    })
  }
}


const deleteCourse = async (req, res) => {
  console.log(req)
  const data = await Course.deleteOne({_id:req.params.courseID})
  res.status(200).json({success: true, msg: data})
}


const deleteAllCourses = async (req, res) => {
  await Course.deleteMany(Course.find())
  res.status(200).json({success: true})
}

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses
}