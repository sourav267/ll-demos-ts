//Implement a function that takes one or more values and returns a function that 
// cycles through those values each time it is called.

        // function* cycle(...args) {
        //     let index = 0;
        //     while (true) {
        //         yield args[index];
        //         index = (index + 1) % args.length;
        //     }
        // }


export default function cycle(...values) {
  let index = 0;

  return () => {
    const currentValue = values[index];
    index = (index + 1) % values.length;
    return currentValue;
  };
}

// Example usage:
const cycler = cycle('A', 'B', 'C');

console.log(cycler()); // Output: 'A'
console.log(cycler()); // Output: 'B'
console.log(cycler()); // Output: 'C'
console.log(cycler()); // Output: 'A'