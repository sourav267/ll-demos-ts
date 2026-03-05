// function greet(greeting, punctuation) {
//   return greeting + ", " + this.name + punctuation;
// }

// const person = { name: "Rahul" };

// console.log(greet.apply(person, ["Hello", "!"]));



const obj = { 0: "a", 1: "b", 2: "c", length: 5 };

const result = Array.prototype.slice.apply(obj);

console.log(result); // ["a", "b"]
