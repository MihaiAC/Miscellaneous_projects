class ListNode {
  constructor() {
    this.value = null;
    this.next = null;
  }

  toString() {
    return "( " + this.value.toString() + " )";
  }
}

export class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  #initialise(value) {
    this.head = new ListNode();
    this.head.value = value;
    this.tail = this.head;
  }

  append(value) {
    if (this.head !== null) {
      let newNode = new ListNode();
      newNode.value = value;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.#initialise(value);
    }

    this.size += 1;
  }

  prepend(value) {
    if (this.head !== null) {
      let newNode = new ListNode();
      newNode.value = value;
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.#initialise(value);
    }

    this.size += 1;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size) {
      return null;
    }

    let currNode = this.head;
    let currIndex = 0;

    while (currIndex < index) {
      currNode = currNode.next;
      currIndex += 1;
    }

    return currNode;
  }

  pop() {
    if (this.size > 0) {
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        let secondToLast = this.at(this.size - 2);
        this.tail = secondToLast;
        secondToLast.next = null;
      }
    }
  }

  contains(value) {
    if (this.size === 0) {
      return false;
    }

    let currNode = this.head;
    while (currNode !== null) {
      if (currNode.value === value) {
        return true;
      }
      currNode = currNode.next;
    }

    return false;
  }

  find(value) {
    if (this.size === 0) {
      return -1;
    }

    let currNode = this.head;
    let index = 0;
    while (currNode !== null) {
      if (currNode.value === value) {
        return index;
      }

      index += 1;
      currNode = currNode.next;
    }

    return -1;
  }

  toString() {
    if (this.size === 0) {
      return "null";
    }

    let res = [];
    let currNode = this.head;

    while (currNode !== null) {
      res.push(currNode.toString());
      currNode = currNode.next;
    }

    res.push("null");
    return res.join(" -> ");
  }
}

// const list = new LinkedList();

// list.append("cat");
// list.append("parrot");
// list.prepend("dog");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");

// console.log(list.toString());
// console.log(list.size);
// console.log(list.head.toString());
// console.log(list.tail.toString());
// console.log(list.at(4));
// console.log(list.find("snake"));
