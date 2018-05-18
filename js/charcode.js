
// 十进制的 int 转 十六进制 的 string
function int10ToStr16(i10) {
  var s16 = i10.toString(16)
  // console.log('s16', s16);
  if (s16.length == 1) {
    s16 = '0' + s16
  }
  return s16
}

// 把一个字符串
// 变成 16进制 字符串
function stringToString16(s) {
  if (typeof s !== 'string') {return console.error('不是字符串');}
  return Array.prototype.map.call(s, s1 => int10ToStr16(s1.charCodeAt(0))).join('')

  // 如果要看清过程，则注释掉上面的一行代码
  var arr1 = Array.prototype.map.call(s, s1 => s1.charCodeAt(0))
  console.log('arr1', arr1);
  var arr2 = arr1.map(int10ToStr16)
  return arr2.join('')
}
