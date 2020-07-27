type Section = [number, number];
type SectionArray = Section[]; // 区间数组

// 区间数组合并
function sectionArrayUnion(array: SectionArray) {
  if (array.length < 2) {
    return array;
  }
  const list = array.slice().sort((a, b) => a[0] - b[0]);
  const len = list.length;
  const newArray: SectionArray = [list[0]];
  for (let index = 1; index < len; index++) {
    // 新数组的最后一个元素
    const element1 = newArray[newArray.length - 1];
    const element2 = list[index];
    if (element1[1] > element2[0]) {
      element1[1] = element2[1]
    } else {
      newArray.push(element2)
    }
  }
  return newArray;
}

// 区间是否相交，包括等于
function intersection(arr1: Section, arr2: Section) {
  if (arr1[0] >= arr2[1] || arr1[1] <= arr2[0]) {
    return false;
  }
  return true;
}

/**
 * 求区间 A 在区间 B 中的相对补集
 * 之所以返回的是一个区间数组，则是可能出现
 * @param sectionA 
 * @param sectionB 
 */
function sectionAinB(sectionA: Section, sectionB: Section): SectionArray {
  if (sectionA[0] <= sectionB[0]) {
    // eg. [1, 3], [2, 4] => [[3, 4]]
    if (sectionA[1] < sectionB[1]) {
      return [[sectionA[1], sectionB[1]]]
    }
    // eg. [1, 4], [2, 4] => []
    return []
  }
  // eg. [3, 7], [2, 5] => [[2, 3]]
  if (sectionA[1] >= sectionB[1]) {
    return [[sectionA[0], sectionB[1]]];
  }
  // eg. [3, 4], [2, 5] => [[2, 3], [4, 5]]
  return [[sectionB[0], sectionA[0]], [sectionA[1], sectionB[1]]]
}

/**
 * 求区间数组A在区间数组B中的相对补集
 * @param A 
 * @param B 
 */
function sectionArrayRelativeComplementofAinB(A: SectionArray, B: SectionArray) {
  if (A.length === 0 || B.length === 0) {
    return B;
  }
  let B_index = 0, A_index = 0;
  const newB: SectionArray = [];
  do {
    const B_element = B[B_index];
    const A_element = A[A_index];
    // 这是不相交的情况
    if (B_element[0] >= A_element[1]) {
      A_index++
      continue;
    }
    // console.log('A_index', A_index);
    // console.log('B_index', B_index);

    if (B_element[1] <= A_element[0]) {
      newB.push(B_element)
      B_index++
      continue;
    }
    // 下面是区间相交了
    let temp = sectionAinB(A_element, B_element);
    console.log('temp', temp);
    
    newB.push(...temp)
    B_index++
    
  } while (B_index < B.length && A_index < A.length);
  // console.log('B_index', B_index);
  return newB.concat(B.slice(B_index));
}


function test1() {
  const A: SectionArray = [[1, 4], [8, 9]];
  const B: SectionArray = [[5, 6], [11, 14]];
  const result = sectionArrayRelativeComplementofAinB(A, B);
  console.log('test1 result', result);
}

function test2() {
  const A: SectionArray = [[1, 4], [7, 11]];
  const B: SectionArray = [[3, 6], [10, 14]];
  const result = sectionArrayRelativeComplementofAinB(A, B);
  console.log('test2 result', result);
}

function test3() {
  const A: SectionArray = [[2, 4], [11, 15]];
  const B: SectionArray = [[2, 6], [11, 18]];
  const result = sectionArrayRelativeComplementofAinB(A, B);
  console.log('test3 result', result);
}

function test4() {
  const A: SectionArray = [[3, 4], [13, 15]];
  const B: SectionArray = [[2, 6], [11, 18]];
  const result = sectionArrayRelativeComplementofAinB(A, B);
  console.log('test4 result', result);
}

// test1()
// test2()
// test3()
test4()