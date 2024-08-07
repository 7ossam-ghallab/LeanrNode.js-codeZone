const express = require('express');
const router = express.Router();
const coursesControlller = require('../controllers/courses-controllers')
const {validationSchem} = require('./middlewares/validationSchema')

router.route('/')
        .get(coursesControlller.getAllCourses)
        .post(validationSchem(), coursesControlller.addNewCourse) 
        .delete(coursesControlller.deleteAllCourses)
router.route('/:courseID')
        .get(coursesControlller.getSingleCourse)
        .patch(coursesControlller.updateCourse)
        .delete(coursesControlller.deleteCourse)

module.exports = router