/**
 * 快速排序
 * @param  {Array} arr [description]
 * @return {Array}     [description]
 */

function quicksort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('请传入一个数组')
  }
  if (arr.length < 2) {
    return arr
  }

  // 取第一个值作为基准
  var k = arr[0]
  var left = []
  var right = []

  // 从第 2 个值开始遍历
  // 比基准值小则放在左
  // 否则放在右
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < k) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  // concat 方法可以接受 value 或者数组，并返回一个新数组
  return quicksort(left).concat(k, quicksort(right))
}

if (typeof module === 'object') {
  module.exports = quicksort;
}