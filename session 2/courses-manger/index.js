#!/usr/bin/env node

/**
 *** Links Packages ***
  - commander [https://www.npmjs.com/package/commander]
  - inquirer  [https://www.npmjs.com/package/inquirer]
 */




// console.log(process.argv);
/*
  # command # [after console.log(process.argv);]
  node app.js add js

== output ==
[
  'C:\\Program Files\\nodejs\\node.exe',
  'E:\\programming\\Courses\\Back End\\Node\\Learn Node.JS\\session 2\\courses-manger\\app.js',
  'add',
  'js'
]
*/

// if(process.argv[2] === "add") {
//   console.log("Done Add cource =>", process.argv[3], " to courses table")
// }



// !! NOTE : add ["type": "module",] to package.json file to use ecma script modules import

import fs from 'node:fs';
import { Command } from 'commander';
const program = new Command();
import inquirer from 'inquirer';


const FILE_PATH = './courses.json'
const QUESTIONS = [
  {
    type: 'input',
    name: 'title',
    message: 'please Enter courses title',
  },
  {
    type: 'number',
    name: 'price',
    message: 'please Enter courses price',
  }
]


// inquirer
//   .prompt(
//     [
//       {
//         type: 'input',
//         name: 'programming',
//         message: 'What is your favorite programming language',
//       }
//     ]
//   )
//   .then((answers) => {
//     console.log(answers)
//   })


program
  .name('Cources-manger')
  .description('CLI to make courses')
  .version('0.0.0');

program.command('add')
.alias('a')
.description('Add a course')
// .argument('<title>', "Add course Title")
// .option('--price <price>', "Add course Price")
// .action((param, option) => {
//   console.log("param =>", param)
//   console.log("option =>", option)
// })
.action(() => {
  inquirer
  .prompt(QUESTIONS)
  .then((answers) => {
    // console.log(answers)
    if(fs.existsSync(FILE_PATH)) {
      fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if(err) {
          console.log("Error", err)
          process.exit();
        } 
        console.log("Data in file", data)
        const dataAsJson = JSON.parse(data)
        dataAsJson.push(answers);
        fs.writeFile(FILE_PATH, JSON.stringify(dataAsJson), 'utf8', () => {
          console.log('Add Course Done')
        })
      })
    } else {
      fs.writeFile(FILE_PATH, JSON.stringify([answers]), 'utf8', () => {
        console.log('Add First Course Done')
      })
    }
  })
})

program.command('list')
.alias('l')
.description('List all courses')
.action(() => {
  fs.readFile(FILE_PATH, 'utf8', (err, content) => {
    if(err) {
      console.error("Error Here =>", err)
      process.exit();
    }
    console.table(JSON.parse(content))
  })
})

program.parse();