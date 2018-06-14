const path = require('path');
const concat = require('../js/concat-files.js');

let guid = 'e97de739237678fe39b311d8d4fa3bfa6d75d9cfac62c610eaeecfd6bf00bb7b'

let files = [
  './' + guid + 0,
  './' + guid + 1,
  './' + guid + 2,
]


let t1 = new Date().getTime()
concat(files, './gitkraken.exe', function (data) {
  console.log('data', data);
  console.log('time', new Date().getTime() - t1 + 'ms');
})
