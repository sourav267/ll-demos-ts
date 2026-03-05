// Array.prototype.myMap = function (callbackFn, thisArg) {
//     const len = this.length; 
//     const array = new Array(len); 
//     for (let k = 0; k < len; k++) {
//         // Ignore index if value is not defined for index (e.g. in sparse arrays). 
//         if (Object.hasOwn(this, k)) { 
//             array[k] = callbackFn.call(thisArg, this[k], k, this); 
//         }
//     } 
//     return array;
// };

// // Example usage:
// const numbers = [1, 2, 3, 4];
// const doubled = numbers.myMap(x => x * 2);
// console.log(doubled); // Output: [2, 4, 6, 8]


// function greet() {
//   console.log(this.name);
// }

// const person = { name: "Alex" };

// greet.call(person); // Output: "Alex"


function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}

const person = { name: "Alex" };

greet.call(person, "Hello", "!");
// Hello Alex!