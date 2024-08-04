const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  }
})

module.exports = mongoose.model('course', courseSchema); // mongoose.model('collection_name', schema);
// ** Automatically MongoDB converts the first letter to lower and adds an S at the end so 'Course' will become 'course' collection