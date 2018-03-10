
function merge_two_arr(arr1, arr2) {
  var result = []
  var time = arr1.length + arr2.length
  for (var i = 0; i < time; i++) {
    if (arr1[0] < arr2[0]) {
      result.push( arr1.shift() )
    } else {
      result.push( arr2.shift() )
    }
    // 循环的过程中只要有一个数组的长度为 0
    // 就可以退出循环了
    // 连接剩下的那个数组
    // 直接 return 就好
    if (arr1.length == 0) {
      return result.concat(arr2)
    } else if (arr2.length == 0) {
      return result.concat(arr1)
    }
  }
}

function mergesort(arr) {

  var length = arr.length
  if (length < 2) {
    return arr
  }

  var halflen = Math.ceil(length / 2)
  var left = arr.slice(0, halflen)
  var right = arr.slice(halflen)

  return merge_two_arr(mergesort(left), mergesort(right))

}


const arr = [12,14,5,7,8,4,13,6,9,23,14]
console.log('arr', arr);
console.log('mergesort(arr)', mergesort(arr));

const length = 200000
console.log('随机生成 ' + length + ' 个数进行排序');
var arr0 = []
for (var i = 0; i < length; i++) {
  arr0.push( Math.random() * 10000 )
}
console.log('arr0.length', arr0.length);


const time1 = new Date().getTime()
mergesort(arr0)
console.log(new Date().getTime() - time1);
