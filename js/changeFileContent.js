const fs = require('fs');
const glob = require('glob');

const copyright = '...'

function changeFile(file_path) {
  // 以读写模式打开文件
  fs.open(file_path, 'r+', function (err, fd) {
    if (err) throw err
    // console.log('fd', fd);
    let content = fs.readFileSync(fd)

    const position = 0
    // 注意，这里如果不加 position 参数
    // 内容就会追加到原文件内容的后面
    fs.write(fd, copyright + content, position, (err, written, string) => {
      if (err) throw err;
      // console.log('written, string');
      // console.log(written, string);
    })

    // 最后需要手动关闭文件描述符
    fs.close(fd, (err) => {
      if (err) throw err;
    })
  })
}

// options is optional
var options = {
  ignore: /node_modules/,
}
// 使用 glob 取得该目录下所有 js 文件
glob("./components/**/*.js", null, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  console.log('files length', files.length);
  // console.log('files ', files);

  for (let file_path of files) {
    changeFile(file_path)
  }

})
