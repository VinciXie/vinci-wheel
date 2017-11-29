
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

  function inOrderTraverseNode(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node)
      inOrderTraverseNode(node.right, callback)
    }
  }

  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(this.root, callback)
  }

}

var tree = new BinaryTree()

var arr = []
for (var i = 0; i < 8; i++) {
  let a = Math.round( Math.random() * 20 )
  arr.push( a )
  tree.insert(a)
}
console.log('arr', arr);
console.log('tree.root', tree.root);
tree.inOrderTraverse(function (node) {
  console.log('key', node.key);
})
