export default function mapAsyncLimitSequential(iterable,cbFn, size){
    return new Promise((resolve, reject) => {
        const results = [];

        function processItem(index) {
            if(index === iterable.length) {
                resolve(results);
                return;
            }

            return cbFn(iterable[index]).then((res) => {
                results.push(res);
                processItem(index + 1);
            }).catch(reject);
        }

        return processItem(0);
    }
    );  
}

// Example usage:
const asyncTask = (num) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(num * 2);
    }, 1000);
});

const numbers = [1, 2, 3, 4, 5];
mapAsyncLimitSequential(numbers, asyncTask, 2).then((results) => {
    console.log(results); // Output: [2, 4, 6, 8, 10]
}).catch((error) => {
    console.error(error);
});