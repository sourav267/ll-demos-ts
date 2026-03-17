export default function flatten(value) {
    let arr = [];
    value.forEach((item) => {
        if (Array.isArray(item)) {
            arr.push(...flatten(item));
        } else {
            arr.push(item);
        }
    })
    return arr;
}


// Example usage:
const nestedArray = [1, [2, [3, 4], 5], 6];
const flattenedArray = flatten(nestedArray);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]