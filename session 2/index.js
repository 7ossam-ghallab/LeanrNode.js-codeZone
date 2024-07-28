const fs = require('node:fs');
// import { writeFile } from 'node:fs';

// Read File
/*
console.log("first")
const fileContent = fs.readFileSync('hello.txt', 'utf8');
console.log("file Content =>", fileContent);
console.log("second")

console.log("=".repeat(10))

console.log("first")
fs.readFile('hello.txt', 'utf8', (err, data) => {
  if(err) {
    console.log("Error Reading File", err);
  } else {
    console.log("file Content =>", data);
  }
});
console.log("second")
*/

/// ============================= ///

// Write File
/*
fs.writeFile('./test.json', JSON.stringify([{id: 1, name: "ahmed"}, {id: 2, name: "mohamed"}]), err => {
  if(err) {
    console.log("Error Writing File =>", err)
  }
  console.log("Done")
})
*/

/// ============================= ///

// Deletr File
/*
fs.unlink('./test.json', (err) => {
  if(err) {
    console.log("Error Deleting File", err)
  }
})
*/

/// ============================= ///

// Streams [readable - writeable]
/*
const rStream = fs.createReadStream('./hello.txt', "utf8")
const wStream = fs.createWriteStream('./stream.txt', "utf8")

rStream.on('data', (chunk) => {
  console.log("\n========= chunk =========\n", chunk)
  wStream.write("=========================\n========= chunk =========\n=========================")
  wStream.write(chunk)
})
*/
