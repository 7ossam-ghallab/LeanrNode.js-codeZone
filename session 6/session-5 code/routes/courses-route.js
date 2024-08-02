const express = require('express');
const router = express.Router();
const coursesControlller = require('../controllers/courses-controllers')
const {validationSchem} = require('./middlewares/validationSchema')

/*
router.get('/', coursesControlller.getAllCourses)

router.get('/:courseID', coursesControlller.getSingleCourse)

router.post('/', 
  [
    body('title')
      .notEmpty()
      .withMessage("title is required")
      .isLength({min:2})
      .withMessage("title at least is 2 char"),
    body('price')
      .notEmpty()
      .withMessage("price is required")
  ], coursesControlller.addNewCourse)

router.patch('/:courseID', coursesControlller.updateCourse)

router.delete('/:courseID', coursesControlller.deleteCourse)
*/

router.route('/')
        .get(coursesControlller.getAllCourses)
        .post(validationSchem(), coursesControlller.addNewCourse) 
        .delete(coursesControlller.deleteAllCourses)
router.route('/:courseID')
        .get(coursesControlller.getSingleCourse)
        .patch(coursesControlller.updateCourse)
        .delete(coursesControlller.deleteCourse)

module.exports = router