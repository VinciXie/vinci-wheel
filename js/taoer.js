// 1. 找到数组中对应元素的所有下标
function arrFindAllIndex(arr, ele) {
  var indexs = []
  arr.forEach((element, index) => {
    if (element == ele) {
      indexs.push(index)
    }
  })
  return indexs
}

var colors = [-1, "blue", -1, -1, "blue"];
arrFindAllIndex(colors, 'blue')
