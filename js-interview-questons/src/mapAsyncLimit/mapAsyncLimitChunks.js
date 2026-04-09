// export default function mapAsyncLimitChuncks(iterable, cbFn, size) {

//     if(iterable.length === 0) return Promise.resolve([]);

//     const currentChunks = iterable.slice(0, size);
//     const remainingChunks = iterable.slice(size);

//     return Promise.all(currentChunks.map(cbFn)).then((results) => {
//         return mapAsyncLimitChuncks(remainingChunks,cbFn, size).then((remainingResults) => {
//             return [...results, ...remainingResults];
//         });
//     });
// }


export default async function mapAsyncLimitChuncks(iterable, cbFn, size) {
    const results = [];

    for (let i = 0; i < iterable.length; i += size) {
        const currentChunks = iterable.slice(i, i + size);
        const chunkResults = await Promise.all(currentChunks.map(cbFn));
        results.push(...chunkResults);
    }
    return results;
}

// Example usage:
const asyncTask = (num) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(num * 2);
    }, 5000);
});

const numbers = [1, 2, 3, 4, 5];
mapAsyncLimitChuncks(numbers, asyncTask, 2).then((results) => {
    console.log(results); // Output: [2, 4, 6, 8, 10]
}).catch((error) => {
    console.error(error);
});