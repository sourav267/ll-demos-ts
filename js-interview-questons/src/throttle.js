export default function throttle(func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(function () {
      shouldThrottle = false;
    }, wait);

    func.apply(this, args);
  };
}

// Example usage:
function search(query) {
  console.log(`Searching for: ${query}`);
}

const throttledSearch = throttle(search, 2000);

throttledSearch("JavaScript"); // Output: Searching for: JavaScript
throttledSearch("Python"); // Ignored, as it's called within 2 seconds of the previous call

setTimeout(() => {
  throttledSearch("Java"); // Output: Searching for: Java (after 2 seconds)
}, 3000);

