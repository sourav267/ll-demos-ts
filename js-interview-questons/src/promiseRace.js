export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
      if(iterable.length === 0) return;

      iterable.forEach(async (item) => {
        try {
          const result = await item;
          resolve(result);
        } catch (err){
          reject(err);
        }
      });
  });
}


// Example usage:
const promise1 = new Promise((resolve) => setTimeout(resolve, 5000, "foo"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, "bar"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, "baz"));

promiseRace([promise1, promise2, promise3]).then((value) => {
  console.log(value); // Output: "bar"
});


// Example usage with rejection:
const promiseA = new Promise((resolve) => setTimeout(resolve, 3000, "foo"));
const promiseB = new Promise((_, reject) => setTimeout(reject, 1000, "error"));
const promiseC = new Promise((resolve) => setTimeout(resolve, 2000, "baz"));

promiseRace([promiseA, promiseB, promiseC])
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err); // Output: "error"
  });