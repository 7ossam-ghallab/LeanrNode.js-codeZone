const express = require('express');
const router = express.Router();
const coursesControlller = require('../controllers/courses-controllers')
const {validationSchem} = require('./middlewares/validationSchema')
const verifyToken = require('./middlewares/verifyToken')
const allowedTo = require('./middlewares/allowedTo')
const {USER, MANAGER, ADMIN} = require('../utils/userRoles')

router.route('/')
        .get(coursesControlller.getAllCourses)
        .post(validationSchem(), verifyToken, allowedTo(MANAGER), coursesControlller.addNewCourse) 
        .delete(coursesControlller.deleteAllCourses)
router.route('/:courseID')
        .get(coursesControlller.getSingleCourse)
        .patch(coursesControlller.updateCourse)
        .delete(verifyToken, allowedTo(ADMIN, MANAGER), coursesControlller.deleteCourse)

module.exports = router