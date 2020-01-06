function f(n, ac1 = 1, ac2 = 1) {
  if (n <= 0) throw new Error('"n" must bigger than 0');
  if( n <= 1 ) {return ac2};
  return f(n - 1, ac2, ac1 + ac2)
}

console.log(1, f(1)); // 1
console.log(2, f(2)); // 2
console.log(5, f(5)); // 8
console.log(f(7)); // 21
// console.log(f(8));
// console.log(f(20));
console.log(f(800));
