const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = "mongodb+srv://7ossamghallab:nodejs_123@learn-mongo-db.grvc2t0.mongodb.net/helloWorld?retryWrites=true&w=majority&appName=learn-mongo-db" // add db_name after .net/ in url
mongoose.connect(url).then(() => {
  console.log('mongoDB server started');
})

app.use(express.json())
const coursesRouter = require('./routes/courses-route')


app.use('/api/courses', coursesRouter)


app.listen(5000, () => {
  console.log("listening on port : 5000")
})