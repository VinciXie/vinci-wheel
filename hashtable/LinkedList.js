

function LinkedListNode(value) {
    this.value = value
    this.next = null
}

class LinkedList {
    constructor() {
        /** @var LinkedListNode */
        this.head = null;

        this._length = 0;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);
        this._length++
        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
            return this;
        }
        // Attach new node to the end of linked list.
        let current = this.head
        while (current.next != null) {
            current = current.next
        }
        current.next = newNode;
        return this;
    }

    find(value) {
        let element = this.head;
        if (element == null) {
            return null
        };
        do {
            if (element.value == value) {
                return element
            };
            element = element.next
        } while (element != null);
        return null;
    }

}

if (module.parent == null) {
    (function test() {
        var list = new LinkedList()

        list.append(5)
        list.append(6)
        console.log('\nhead', list.head);
        console.log('list.find(5)', list.find(5));
        console.log('list.find(6)', list.find(6));
        console.log('list.find(7)', list.find(7));
    })()
}


module.exports = LinkedList
