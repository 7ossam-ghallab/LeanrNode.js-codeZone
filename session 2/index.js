const fs = require('node:fs');

// Read File
// const fileContent = fs.readFileSync('hello.txt');
// console.log("file Content =>", fileContent);

const fileContent = fs.readFileSync('hello.txt', 'utf8');
console.log("file Content =>", fileContent);

// Write File


// Deletr File