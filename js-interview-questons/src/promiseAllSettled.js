export default function promiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const results = new Array(iterable.length);
    let pending = iterable.length;

    if(pending === 0){
      resolve(results);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value =  await item;
        results[index] = {
          status : 'fulfilled',
          value
      }
      } catch (err) {
        results[index] = {
          status : 'rejected',
          reason: err
        }
      }

      pending -= 1;
      if(pending === 0) resolve(results);
    });
  });
}


// Example usage:
const promise1 = Promise.resolve(3);
const promise2 = new Promise((_, reject) => setTimeout(reject, 2000, "error"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 5000, "foo"));

promiseAllSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
  // Output:
  // [
  //   { status: 'fulfilled', value: 3 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 'foo' }
  // ]
});

// Example usage with empty iterable:
promiseAllSettled([]).then((results) => {
  console.log(results); // Output: []
});