// Example in built-in Modules 
// const os = require('node:os');

// console.log(os.homedir());
// console.log(os.platform());

// const fileSystem = require('node:fs');
// const { builtinModules } = require('node:module');

// let fileContent = fileSystem.readFileSync('./test.txt', 'utf8');
// console.log(`file Content :-\n${fileContent}`);

// ========================================= //

// Example in Local(user-defined) Modules

const localModule = require('./logger');

// localModule("'test function logger if it work'"); // IF YOU FIND ONE EXPORT NOT OBJECT OF EXPORTS => module.exports = log;
localModule.hamada("'test function {log} logger if it work'");
localModule.log2("'test function {log2} logger if it work'");
localModule.hello("hossam");
