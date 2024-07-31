/*
const fs = require("node:fs");

console.log("first")

fs.readFile('./test.txt', 'utf8', (err, content) => {
  if(err) {
    console.log("Error -> ", err)
  } else {
    console.log("=== ASYNC === \ncontent in file is : \n", content)
  }
})
const file_content = fs.readFileSync('./test.txt', 'utf8')
console.log("=== SYNC ===\n", file_content)

console.log("second")
*/


/*
  const crypto = require('node:crypto')

  console.log(process.env.UV_THREADPOOL_SIZE)

  const start = performance.now()
  // == thread pool ==
  
  // process.env.UV_THREADPOOL_SIZE = 5
  
  // crypto.pbkdf2Sync('secret', 'salt', 100000,64, 'sha512');
  // console.log("End of PBKDF2 .ms", performance.now() - start)
  // crypto.pbkdf2Sync('secret', 'salt', 100000,64, 'sha512');
  // console.log("End of PBKDF2 .ms", performance.now() - start)

  // crypto.pbkdf2('secret', 'salt', 100000,64, 'sha512', () => {
  //   console.log("End of PBKDF2 .ms", performance.now() - start)
  // });
  // crypto.pbkdf2('secret', 'salt', 100000,64, 'sha512', () => {
  //   console.log("End of PBKDF2 .ms", performance.now() - start)
  // });
  // crypto.pbkdf2('secret', 'salt', 100000,64, 'sha512', () => {
  //   console.log("End of PBKDF2 .ms", performance.now() - start)
  // });
  // crypto.pbkdf2('secret', 'salt', 100000,64, 'sha512', () => {
  //   console.log("End of PBKDF2 .ms", performance.now() - start)
  // });
  // crypto.pbkdf2('secret', 'salt', 100000,64, 'sha512', () => {
  //   console.log("End of PBKDF2 .ms", performance.now() - start)
  // });


  // output before editing size ->
  // End of PBKDF2 .ms 192.8355
  // End of PBKDF2 .ms 208.71890000000002
  // End of PBKDF2 .ms 209.13849999999996
  // End of PBKDF2 .ms 213.74759999999998
  // End of PBKDF2 .ms 324.5352

  // +++++++++++++++++++++
  // output after editing size ->
  // ! Not Work


  // == Network tasks ==
  fetch("https://dummyjson.com/products").then(() => {
    console.log("End of Request ms", performance.now() - start);
  })
  fetch("https://dummyjson.com/products").then(() => {
    console.log("End of Request ms", performance.now() - start);
  })
  fetch("https://dummyjson.com/products").then(() => {
    console.log("End of Request ms", performance.now() - start);
  })
  fetch("https://dummyjson.com/products").then(() => {
    console.log("End of Request ms", performance.now() - start);
  })
  fetch("https://dummyjson.com/products").then(() => {
    console.log("End of Request ms", performance.now() - start);
  })
*/









// Create Server

const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log("Request :", req.url)
  if(req.url === '/') {
    res.end("Welcome in home page");
  }else if(req.url === '/about') {
    res.end("About page");
  }else {
    res.end("Not Found => Error:404");
  }
})
server.listen(3200, ()=> {
  console.log("listening on port 3200")
})