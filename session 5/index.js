// npm i express
// npm i express-validator


const express = require('express');
const {body, validationResult} = require('express-validator')
const app = express();
let courses = [
  {
    id: 1,
    title: "java Script",
    price: 2000
  },
  {
    id: 2,
    title: "React.js",
    price: 1000
  },
  {
    id: 3,
    title: "Node.js",
    price: 1500
  },
  {
    id: 4,
    title: "Express",
    price: 1000
  },
  {
    id: 5,
    title: "MongoDB",
    price: 2000
  }
]


/// CRUD (create, read, update, delete)

// ================ get all courses ================
app.get('/api/courses', (req, res) => {
  res.json(courses)
})

// ================ get single course ================
app.get('/api/courses/:courseID', (req, res) => {
  // console.log(req.params);
  // console.log(req.params.courseID);
  const courseID = +req.params.courseID;
  const course = courses.find((course) => course.id === courseID);
  if(!course) {
    return res.status(404).json({message : "course not found"})
  }
  res.json(course)
})
// app.get('/api/courses/2', (req, res) => {
//   const course = courses.find((course) => course.id === 1);
//   res.json(course)
// })


// ================ Create a new course ================
app.use(express.json()) // bodyParser.json()
/*
app.post('/api/courses', body('title').notEmpty().withMessage("title is required"), body('title').isLength({min:2}).withMessage("title at least is 2 char"), (req, res) => {   // body('title').notEmpty().isLength({min:2})
  // لو انت جيت تبعت حاجة من بوستمان علي هيئة جسون هيرجع عنا undefined
  // لازم علشان تستخدم middelware اللي هو express.json()
  // console.log(req.body)
  const errors = validationResult(req);
  console.log("errors =>",errors)
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  // if(!req.body.title) {
  //   return res.status(400).json({error : "title not provided"})
  // }
  // if(!req.body.price) {
  //   return res.status(400).json({error : "price not provided"})
  // }
  courses.push({id: courses.length + 1, ...req.body} )
  res.status(201).json(courses)
})
*/
app.post('/api/courses',
  [
    body('title')
      .notEmpty()
      .withMessage("title is required")
      .isLength({min:2})
      .withMessage("title at least is 2 char"),
    body('price')
      .notEmpty()
      .withMessage("price is required")
  ], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
  const course = {id: courses.length + 1, ...req.body}
  courses.push(course)
  res.status(201).json(course)
})


// ================ update a course ================
app.patch('/api/courses/:courseID', (req, res) => {
  const courseId = +req.params.courseID;
  let course = courses.find((course) => course.id === courseId);
  if(!course) {
    return res.status(404).json({message : "course not found"})
  }
  course = {...course, ...req.body}
  // console.log(courses[courseId-1])
  // console.log(course)
  courses[courseId - 1] = course
  // console.log(courses[courseId-1])
  res.status(200).json(course)
})


// ================ delete a course ================
app.delete('/api/courses/:courseID', (req, res) => {
  const courseId = +req.params.courseID;
  courses = courses.filter((course) => course.id !== courseId)
  res.status(200).json({success: true})

})





app.listen(5000, () => {
  console.log("listening on port : 5000")
})
