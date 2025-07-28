export default function debounce(func, wait = 0) {
    let timeoutID = null;
    return function (...args) {
        // Keep a reference to `this` so that
        // func.apply() can access it.
        const context = this;
        clearTimeout(timeoutID);

        timeoutID = setTimeout(function () {
            timeoutID = null; // Not strictly necessary but good to do this.
            func.apply(context, args);
        }, wait);
    };
}

let i = 0;
function increment() {
    i++;
    console.log(i);
}
const debouncedIncrement = debounce(increment, 1000);

// t = 0: Call debouncedIncrement().
debouncedIncrement(); // i = 0

setTimeout(() => {}, 1000);
// t = 50: i is still 0 because 100ms have not passed.
//  Call debouncedIncrement() again.
debouncedIncrement(); // i = 0

// t = 100: i is still 0 because it has only
//  been 50ms since the last debouncedIncrement() at t = 50.

// t = 150: Because 100ms have passed since
//  the last debouncedIncrement() at t = 50,
//  increment was invoked and i is now 1 .
