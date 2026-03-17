let LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};

LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
};

LRUCache.prototype.put = function (key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
};

LRUCache.prototype.delete = function (key) {
    this.cache.delete(key);
};

LRUCache.prototype.displayCache = function () {
    console.log("Current Cache State:");
    return [...this.cache.entries()];
}
// Example usage:
const lruCache = new LRUCache(2);
lruCache.put(1, 1);
lruCache.put(2, 2);
lruCache.put(3, 3); // Output: 1
console.log(lruCache.displayCache()); // Output: [[2, 2], [1, 1]]
console.log(lruCache.get(1)); // Output: 1
lruCache.put(3, 3); // Evicts key 2
console.log(lruCache.get(2)); // Output: -1 (not found)
lruCache.put(4, 4); // Evicts key 3
console.log(lruCache.get(3)); // Output: -1 (not found)
console.log(lruCache.get(4)); // Output: 4
console.log(lruCache.displayCache()); // Output: [[4, 4], [1, 1]]
