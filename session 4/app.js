// npm run app_express

const express = require('express');
// const fs = require('node:fs');
const app = express();

// const htmlFile = fs.readFileSync('test/index.html', 'utf8');
// app.get('/', (req, res) => {
//   res.send(htmlFile)
// })


// دي بتستخدمها لما تكون عايز تعرض حاجة ثابته بس يعني مش هتعدل فيهاعلشان لو هتعرضها بطريقة انك تستدعي الملفات فكدا هتحتتاج تنادي علي ملفات الاستايل وهتبقي ليلة و نفس الموال اللي حصل قبل كدا في ملف الانديكس
// علشان هنا مش محددين مسار هو تلقئيًا هيروح علي ال /
// app.use(express.static('./test')) 



// https://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps
// middleware
//  دة بيشتغل مع أي rout بتعملها 
app.use(/*"/about",*/(req, res, next) => {
  console.log("MIDDLEWARE 1")
  console.log("MEHTOD : ", req.method, "\nURL : ", req.url)
  next();
})
app.use((req, res, next) => {
  console.log("MIDDLEWARE 2")
  next();
})

app.get('/', (req, res) => {
  res.send('hello world')
})
app.get('/about', (req, res) => {
  res.send('Hello from about page')
})
app.get('/products', (req, res) => {
  res.send([
    {id:1, title:"product one"},
    {id:2, title:"product two"}
  ])
})

app.listen('2001', () => {
  console.log('listening on port 2001')
})