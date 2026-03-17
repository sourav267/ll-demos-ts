export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    if(iterable.length === 0) reject(new AggregateError([]));

    let pending = iterable.length;
    const errors = new Array(iterable.length);

    iterable.forEach(async (item, index) => {
      try{
        const value = await item;
        resolve(value);
      } catch (err){
        errors[index] = err;
        pending--;
        if(pending === 0){
          reject( new AggregateError(errors));
        }
      }
    });
  });
}


// Example usage:
const promise1 = new Promise((_, reject) => setTimeout(reject, 1000, "error1"));
const promise2 = new Promise((_, reject) => setTimeout(reject, 2000, "error2"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 3000, "success"));

promiseAny([promise1, promise2, promise3])
  .then((value) => {
    console.log(value); // Output: "success"
  })
  .catch((err) => {
    console.error(err); // Output: AggregateError: [Error: error1, Error: error2]
  });

// Example usage with all rejections:
const promiseA = new Promise((_, reject) => setTimeout(reject, 1000, "errorA"));
const promiseB = new Promise((_, reject) => setTimeout(reject, 2000, "errorB"));
const promiseC = new Promise((_, reject) => setTimeout(reject, 3000, "errorC"));

promiseAny([promiseA, promiseB, promiseC])
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err); // Output: AggregateError: [Error: errorA, Error: errorB, Error: errorC]
  });