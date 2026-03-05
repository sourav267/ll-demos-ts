Array.prototype.myReduce = function (callbackFn, initialValue) {
    const noInitValue  = initialValue === undefined;
    const len = this.length;
    
    if (noInitValue && len === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    let acc = noInitValue ? this[0] : initialValue;
    let startIndex = noInitValue ? 1 : 0;

    for (let k = startIndex; k < len; k++) {
        if (Object.hasOwn(this, k)) {
            acc = callbackFn(acc, this[k], k, this);
        }
    }
    return acc;
}

// Example usage:
const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, val) => acc + val, 0);
console.log(sum); // Output: 10

const product = numbers.myReduce((acc, val) => acc * val);
console.log(product); // Output: 24