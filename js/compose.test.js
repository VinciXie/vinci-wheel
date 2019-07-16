const compose = require('./compose');

test('adds 1 + 2 to equal 3', () => {
  const a = n => n + 5
  const b = n => n * 2
  const c = n => n + 7
  // (0 + 7) * 2 + 5 = 19
  expect(compose(a, b, c)).toBe(19);
});
