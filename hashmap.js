class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Funzione hash
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];

    // Se la chiave esiste già, aggiorna il valore
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // Se non esiste, aggiungi nuova coppia
    bucket.push([key, value]);
    this.size++;

    // Controlla se serve resize
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];
    for (let [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkIndex(index);

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      for (let [k] of bucket) {
        keys.push(k);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.buckets) {
      for (let [, v] of bucket) {
        values.push(v);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      for (let [k, v] of bucket) {
        entries.push([k, v]);
      }
    }
    return entries;
  }

  // Raddoppia la capacità e reinserisce tutte le chiavi
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [k, v] of bucket) {
        this.set(k, v);
      }
    }
  }
}

// ==============================
// Implementazione HashSet (extra)
// ==============================
class HashSet {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.map = new HashMap(initialCapacity, loadFactor);
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  length() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }
}

// TEST
console.log("=== TEST HASHMAP ===");
const test = new HashMap(16, 0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Length before resize:", test.length()); // 12
console.log("Capacity before resize:", test.capacity); // 16

// Sovrascrittura
test.set('apple', 'dark red');
console.log("Overwritten apple:", test.get('apple')); // dark red
console.log("Length still:", test.length()); // 12

// Trigger resize
test.set('moon', 'silver');
console.log("Capacity after resize:", test.capacity); // 32
console.log("Length after resize:", test.length()); // 13

// Altri metodi
console.log("Has lion?", test.has('lion')); // true
console.log("Remove dog:", test.remove('dog')); // true
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

console.log("\n=== TEST HASHSET ===");
const set = new HashSet();
set.add("a");
set.add("b");
set.add("c");
console.log("Set keys:", set.keys()); // ["a","b","c"]
console.log("Has b?", set.has("b")); // true
console.log("Remove b:", set.remove("b")); // true
console.log("Has b now?", set.has("b")); // false
console.log("Length:", set.length()); // 2
