const express = require('express');
const router = express.Router();
const usersControlller = require('../controllers/users-controllers')
const verifyToken = require('./middlewares/verifyToken')

// get all users
// register
// login

router.route('/')
        .get(verifyToken, usersControlller.getAllUsers)
        .delete(usersControlller.deleteAllUsers)

router.route('/register')
        .post(usersControlller.register)

router.route('/login')
        .post(usersControlller.login)


module.exports = router