const mergesort = require('./mergesort');

test('mergesort arr', () => {
  const arr = [12,14,5,7,8,4,13,6,9,23,14]
  expect(mergesort(arr)).toEqual([4, 5, 6, 7, 8, 9, 12, 13, 14, 14, 23])
});