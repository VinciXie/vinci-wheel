const fs = require('fs');

function concat(files, targetFile, cb) {
  // let filePath = info.filePath
  // let fd = fs.openSync(filePath, 'w')
  // let writeStream = fs.createWriteStream(targetFile)
  // fs.appendFileSync(targetFile, data[, options])
  let i = 0;
  function append() {
    let file = files[i]
    let data = fs.readFileSync(file)
    // fs.write(fd, string[, position[, encoding]], callback)
    fs.appendFile(targetFile, data, (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
      fs.unlinkSync(file)
      i++
      if (i >= files.length) {
        console.log('i', i);
        return cb('success');
      } else {
        append()
      }
    });
  }

  append()

}

module.exports = concat;
