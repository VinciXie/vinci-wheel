/**
 * 有序数组，二分查找，返回下标
 * @param {number[]} list
 * @param {number} value
 * @returns {number} index
 */

function find1(list, value) {
  let left = 0;
  let right = list.length;
  let midLeng = (left + right) >> 1;
  while (value != list[midLeng]) {
    if (left == midLeng) return -1;
    if (value < list[midLeng]) {
      right = midLeng;
    } else {
      left = midLeng;
    }
    midLeng = (left + right) >> 1;
  }
  return midLeng;
}

function findInRange(list, value, index1, index2) {
  const mid = (index1 + index2) >> 1;
  if (value == list[mid]) return mid;
  if (mid == index1) return -1;
  if (value < list[mid]) {
    return findInRange(list, value, index1, mid);
  }
  return findInRange(list, value, mid, index2);
}

function find2(list, value) {
  if (list.length == 0) return -1;
  return findInRange(list, value, 0, list.length);
}

module.exports.find1 = find1;
module.exports.find2 = find2;
