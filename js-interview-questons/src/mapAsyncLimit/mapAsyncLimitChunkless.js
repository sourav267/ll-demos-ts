// export default function mapAsyncLimitChunkless(iterable, cbFn, size){
//     return new Promise((resolve, reject) => {
//         const results = [];
//         let nextIndex = 0;
//         let resolved = 0;

//         if(iterable.length === 0){
//             resolve(results);
//             return;
//         }

//         function processItem(index){
//             nextIndex++;
//             cbFn(iterable[index]).then((result) => {
//                 results[index] = result;
//                 resolved++;

//                 if(resolved === iterable.length){
//                     resolve(results);
//                     return;
//                 }

//                 if(nextIndex < iterable.length){
//                     processItem(nextIndex);
//                 }
//             }).catch(reject);
//         }

//         for(let i = 0; i < Math.min(size, iterable.length); i++){
//             processItem(i);
//         }
//     });
// }



export default function mapAsyncLimitChunkless(iterable, cbFn, size) {
    return new Promise((resolve, reject) => {
        const results = [];
        let nextIndex = 0;
        let resolved = 0;

        if (iterable.length === 0) {
            resolve(results);
            return;
        }

        async function processItem(index) {
            nextIndex++;
            try {
                const result = await cbFn(iterable[index]);
                results[index] = result;
                resolved++;

                if (resolved === iterable.length) {
                    resolve(results);
                    return;
                }

                if (nextIndex < iterable.length) {
                    processItem(nextIndex);
                }
            } catch (error) {
                reject(error);
            }
        }

        for (let i = 0; i < Math.min(size, iterable.length); i++) {
            processItem(i);
        }
    });
}


// Example usage:
const asyncTask = (num) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(num * 2);
    }, 5000);
});

const numbers = [1, 2, 3, 4, 5];
mapAsyncLimitChunkless(numbers, asyncTask, 2).then((results) => {
    console.log(results); // Output: [2, 4, 6, 8, 10]
}).catch((error) => {
    console.error(error);
});