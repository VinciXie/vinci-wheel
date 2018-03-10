
// console.dir(Node)

function BinaryTree() {
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null
  }

  this.root = null;

  function insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left == null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right == null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }

    }
  }

  this.insert = function (key) {
    var newNode = new Node(key);
    if (this.root == null) {
      this.root = newNode
    } else {
      insertNode(this.root, newNode)
    }
  }

  /**
   * 前序遍历
   */
  function inOrderTraverseNode(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(this.root, callback)
  }

  /**
   * 中序遍历
   * @param  {[type]}   node     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  function preOrderTeaverse(node, callback) {
    if (node !== null) {
      callback(node.key)
      preOrderTeaverse(node.left, callback)
      preOrderTeaverse(node.right, callback)
    }
  }

  this.preOrderTeaverse = function (callback) {
    preOrderTeaverse(this.root, callback)
  }

  function findMin(node, callback) {
    if (node) {
      if (node.left != null) {
        findMin(node.left, callback)
      } else {
        callback(node.key)
      }
    }
  }

  this.findMin = function (callback) {
    findMin(this.root, callback)
  }


  function findMax(node) {
    if (node) {
      while (node.right != null) {
        node = node.right
      }
      return node.key
    }
  }

  this.findMax = function () {
    return findMax(this.root)
  }

  function find(node, n) {
    if (node === null) {
      return false
    } else {

      if (n == node.key) {
        return true
      } else if ( n < node.key ) {
        return find(node.left, n)
      } else {
        return find(node.right, n)
      }

    }
  }

  this.find = function (n) {
    return find(this.root, n)
  }

}

var tree = new BinaryTree();

var arr = [];
for (var i = 0; i < 7; i++) {
  let a = Math.round( Math.random() * 18)
  arr.push( a );
  tree.insert(a);
};

console.log('arr', arr);
console.log('tree.root', tree.root);
console.log('前序遍历');
tree.inOrderTraverse(function (key) {
  console.log('key', key);
});
console.log('中序遍历');
tree.preOrderTeaverse(function (key) {
  console.log('key', key);
})



console.log('查找最小值');
tree.findMin(function (key) {
  console.log('min key', key);
})


console.log('查找最大值');
let max = tree.findMax()
console.log('max', max);

console.log('查找 8 是否存在', tree.find(8));
// tree.find(8)


const length = 200000
console.log('随机生成 ' + length + ' 个数进行排序');
var arr0 = []
var tree0 = new BinaryTree();
for (var i = 0; i < length; i++) {
  arr0.push(Math.random() * 10000)
}

const time1 = new Date().getTime()
for (var i = 0; i < length; i++) {
  tree0.insert(arr0[i]);
}
arr0 = []
tree0.inOrderTraverse(function (k) {
  arr0.push(k)
})
console.log('arr0.length', arr0.length);

console.log(new Date().getTime() - time1);
