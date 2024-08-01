const {validationResult} = require('express-validator')
let {courses} = require('../courses')


const getAllCourses = (req, res) => {
  res.json(courses)
}

const getSingleCourse = (req, res) => {
  const courseID = +req.params.courseID;
  const course = courses.find((course) => course.id === courseID);
  if(!course) {
    return res.status(404).json({message : "course not found"})
  }
  res.json(course)
}

const addNewCourse = (req, res) => {
const errors = validationResult(req);
if(!errors.isEmpty()) {
  return res.status(400).json(errors.array())
}
const course = {id: courses.length + 1, ...req.body}
courses.push(course)
res.status(201).json(course)
}

const updateCourse = (req, res) => {
  const courseId = +req.params.courseID;
  let course = courses.find((course) => course.id === courseId);
  if(!course) {
    return res.status(404).json({message : "course not found"})
  }
  course = {...course, ...req.body}
  courses[courseId - 1] = course
  res.status(200).json(course)
}

const deleteCourse = (req, res) => {
  const courseId = +req.params.courseID;
  courses = courses.filter((course) => course.id !== courseId)
  res.status(200).json({success: true})
}

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  updateCourse,
  deleteCourse
}