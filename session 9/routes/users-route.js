const express = require('express');
const router = express.Router();
const usersControlller = require('../controllers/users-controllers')
const verifyToken = require('./middlewares/verifyToken')

const multer = require('multer');
const appError = require('../utils/appError');

// const upload = multer({dest : 'uploads/'})
const diskStorage = multer.diskStorage({
  destination : function(req, file, cb) {
    console.log("file :", file)
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    const fileType = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${fileType}`
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];
  if(imageType == 'image') {
    return cb(null, true)
  } else {
    return cb(appError.create("the file must be an image", 400), false)
  }
}
const upload = multer({storage : diskStorage, fileFilter})
// get all users
// register
// login

router.route('/')
        .get(verifyToken, usersControlller.getAllUsers)
        .delete(usersControlller.deleteAllUsers)

router.route('/register')
        .post(upload.single('avatar'), usersControlller.register)

router.route('/login')
        .post(usersControlller.login)


module.exports = router