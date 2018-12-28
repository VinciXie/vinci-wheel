const LinkedList = require('./LinkedList')

const defaultHashTableSize = 32;

class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    // this.buckets = new Array(hashTableSize).fill(new LinkedList()) // 会将同一个 object 填充进去
    this.buckets = new Array(hashTableSize).fill(null).map(() => new LinkedList())
  }

  /**
   * Converts key string to hash number.
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    let hash = Array.prototype.reduce.call(key, function (previousValue, currentValue, currentIndex) {
      return previousValue + currentValue.charCodeAt(0) * Math.pow(7, currentIndex)
    }, 0)
    return hash % this.buckets.length
  }

  set(key, value) {
    if (key == undefined) throw new Error('Please provide at least one param')
    let index = this.hash(key)
    console.log('index', index);
    let element = this.buckets[index]
    // console.log('element', element);
    element.append(value)
  }
}

if (module.parent == null) {
  (function test() {
    let table = new HashTable(10)
    table.set('aa', 13)
    console.log('\nbuckets', table.buckets);
  })()
}
