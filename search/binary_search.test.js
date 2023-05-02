const { find1, find2 } = require("./binary_search.js");

const arr = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 23, 45, 78];
test("binary search 1-1", () => {
  const target = 6;
  expect(find1(arr, target)).toEqual(4);
});

test("binary search 1-2", () => {
  const target = 16;
  expect(find1(arr, target)).toEqual(-1);
});

test("binary search 2-1", () => {
  const target = 6;
  expect(find2(arr, target)).toEqual(4);
});

test("binary search 2-2", () => {
  const target = 16;
  expect(find2(arr, target)).toEqual(-1);
});
