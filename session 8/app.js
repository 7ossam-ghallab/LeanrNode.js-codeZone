require("dotenv").config()
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText')
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongoDB server started');
})
app.use(cors())

app.use(express.json())
const coursesRouter = require('./routes/courses-route')
const usersRouter = require('./routes/users-route')

app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res, next) => {
  return res.status(404).json({status : httpStatusText.ERROR, message : "this resource is not available"})
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status : error.statusText || httpStatusText.ERROR, message : error.message, code : error.statusCode || 500, data : null})
})

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port :", process.env.PORT)
})