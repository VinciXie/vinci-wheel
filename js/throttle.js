// 节流
function throttle(func, interval = 3000) {
  let can = true;
  return function () {
    if (can) {
      can = false;
      setTimeout(function () {
        can = true;
      }, interval);
      return func.apply(this, arguments);
    }
  };
}
