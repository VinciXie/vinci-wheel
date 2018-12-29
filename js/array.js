
function time(cb) {
  let t1 = Date.now()
  cb()
  console.log('耗时：', Date.now() - t1, 'ms')
}

// 数组的一些方法的复杂度
var arr = []
for (var i = 0; i < 10000000; i++) {
  arr.push(i)
}
console.log('arr.length', arr.length);

// 即使长度 100000000，耗时：0 ms
// time(function () {
//   arr.push(1)
//   console.log('push 操作');
//   console.log('arr.length', arr.length);
// })


time(function () {
  arr.splice(1000, 5)
  console.log('splice 操作');
  // 即使长度 100000000，耗时：0 ms
  console.log('arr.length', arr.length);
})
