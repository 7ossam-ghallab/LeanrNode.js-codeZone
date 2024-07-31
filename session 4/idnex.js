// npm run mainFile



const http = require('node:http');

/*
const server = http.createServer((req, res) => {
  console.log("=== request URL ===")
  console.log(req.url)
  // // res.write("hello world");
  // // res.write("<h1>test code</h1>")
  // res.write(JSON.stringify({
  //   id: 1,
  //   name : "hossam", 
  //   skills : { M:"mongoDB", E:"express", R:"react", N:"node.js"}
  // }))
  res.end();
})

server.listen(2000, () => {
  console.log('listening on port : 2000');
}) 

*/




const fs = require('node:fs')
const testPage = fs.readFileSync('test/index.html', 'utf8');
const style = fs.readFileSync('test/style.css', 'utf8');

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.write(testPage)
  } else if(req.url === '/about') {
    res.write('<h1>about page</h1>')
  } else if(req.url === '/style.css') {
    res.write(style)
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.statusCode = 404; 
    res.write("<h1 style=\"color: red;\">page is not found : error 404</h1>")
  }
  res.end();
})

// https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
server.listen(2000, () => {
  console.log('listening on port : 2000');
}) 