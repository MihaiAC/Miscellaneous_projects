class HashMap {
  constructor() {
    this.capacity = 2;
    this.len = 0;
    this.arr = new Array(this.capacity);
    this.load_factor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let key_hash = this.hash(key);
    if (this.arr[key_hash] !== undefined) {
      let bucket = this.arr[key_hash];
      let found = false;

      for (let index = 0; index < bucket.length; index++) {
        if (bucket[index][0] === key) {
          bucket[index] = [key, value];
          found = true;
          break;
        }
      }

      // Pass by reference, hopefully?
      if (!found) {
        bucket.push([key, value]);
        this.len += 1;
        this.rebalance();
      }
    } else {
      this.arr[key_hash] = [[key, value]];
      this.len += 1;
      this.rebalance();
    }
  }

  get(key) {
    let key_hash = this.hash(key);

    if (this.arr[key_hash] === undefined) {
      return null;
    }

    let bucket = this.arr[key_hash];
    for (let index = 0; index < bucket.length; index++) {
      if (bucket[index][0] === key) {
        return bucket[index][1];
      }
    }

    return null;
  }

  has(key) {
    let key_hash = this.hash(key);

    if (this.arr[key_hash] === undefined) {
      return false;
    }

    let bucket = this.arr[key_hash];
    for (let index = 0; index < bucket.length; index++) {
      if (bucket[index][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    let key_hash = this.hash(key);

    if (this.arr[key_hash] === undefined) {
      return false;
    }

    let bucket = this.arr[key_hash];
    let found = false;
    for (let index = 0; index < bucket.length; index++) {
      if (bucket[index][0] === key) {
        bucket.splice(index, 1);
        this.len -= 1;
        return true;
      }
    }

    return false;
  }

  rebalance() {
    if (this.len / this.capacity > this.load_factor) {
      let currEntries = this.entries();

      this.capacity *= 2;
      this.arr = new Array(this.capacity);
      this.len = 0;

      for (let index = 0; index < currEntries.length; index++) {
        this.set(currEntries[index][0], currEntries[index][1]);
      }
    }
  }

  length() {
    return this.len;
  }

  clear() {
    this.capacity = 1;
    this.len = 0;
    this.arr = new Array(this.capacity);
  }

  keys() {
    let keys = [];
    for (let index = 0; index < this.arr.length; index++) {
      if (this.arr[index] === undefined) {
        continue;
      }

      let bucket = this.arr[index];
      for (let jj = 0; jj < bucket.length; jj++) {
        keys.push(bucket[jj][0]);
      }
    }

    return keys;
  }

  values() {
    let values = [];
    for (let index = 0; index < this.arr.length; index++) {
      if (this.arr[index] === undefined) {
        continue;
      }

      let bucket = this.arr[index];
      for (let jj = 0; jj < bucket.length; jj++) {
        values.push(bucket[jj][1]);
      }
    }

    return values;
  }

  entries() {
    let entries = [];
    for (let index = 0; index < this.arr.length; index++) {
      if (this.arr[index] === undefined) {
        continue;
      }

      let bucket = this.arr[index];
      for (let jj = 0; jj < bucket.length; jj++) {
        entries.push(bucket[jj]);
      }
    }

    return entries;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.keys());
console.log(test.values());

console.log(test.length());
test.set("lion", "black");
console.log(test.length());

console.log(test.capacity);

test.remove("lion");
console.log(test.has("lion"));
console.log(test.length());
