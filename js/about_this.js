(function() {
  'use strict';
  // 闭包
  function ab() {
    var a = 0;
    return function () {
      console.log(a++);
    }
  }

  var a = ab()
  var b = ab()
  a() // 0
  a() // 1
  b() // 0
}());

// 严格模式下
(function() {
  'use strict';
  // 闭包
  var name = 'name'
  var a = {
    name: 'a',
    prop: {
      name: 'prop',
      getName: function () {
        console.log(this.name);
      }
    }
  }

  var b = a.prop.getName
  a.prop.getName() // prop
  b() // Uncaught TypeError: Cannot read property 'name' of undefined

}());
