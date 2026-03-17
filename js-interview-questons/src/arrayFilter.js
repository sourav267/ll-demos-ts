Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const results = [];

  for (let i = 0; i< len;i++){
    const cValue = this[i];
    if (
      // Ignore index if value is not defined for index (e.g. in sparse arrays).
      Object.hasOwn(this, i) &&
      callbackFn.call(thisArg, cValue, i, this)
    ) {
      results.push(cValue);
    }
  }
  return results;
};

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.myFilter(x => x % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]