// const fetchWithTimeout = (url,duration) => {
//     return new Promise((resolve,reject) => {
//         const controller = new AbortController();
//         const signal = controller.signal;
//         let timerId = null;

//         fetch (url, { signal }).then((resp) =>
//             {
//                 resp.json().then((data) => {
//                     clearTimeout(timerId);
//                     resolve(data);
//                 }).catch((err) => {
//                     clearTimeout(timerId);
//                     reject(err);
//                 });
//             }).catch((err) => {
//             clearTimeout(timerId);
//             reject(err);
//         });

//         timerId = setTimeout(() => {
//             console.log('Aborted due to timeout');
//             controller.abort();
//         }, duration);
//     });
// }


const fetchWithTimeout = async (url, duration) => {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), duration);

    try {
        const response = await fetch(url, { signal: controller.signal });
        
        // Handle non-200 HTTP status codes
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        return await response.json();
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Aborted due to timeout');
        }
        throw err; // Re-throw so the caller can handle it
    } finally {
        clearTimeout(timerId); // This runs NO MATTER WHAT (success or fail)
    }
};


// async function fetchWithTimeout(resource, options = {}) {
//   const { timeout = 8000 } = options; // Default timeout of 8 seconds
  
//   // 1. Create the controller
//   const controller = new AbortController();
  
//   // 2. Set up the timer to abort
//   const id = setTimeout(() => controller.abort(), timeout);

//   try {
//     const response = await fetch(resource, {
//       ...options,
//       signal: controller.signal // 3. Pass the signal to fetch
//     });
    
//     return response;
//   } catch (error) {
//     if (error.name === 'AbortError') {
//       throw new Error('Request timed out');
//     }
//     throw error;
//   } finally {
//     clearTimeout(id); // 4. Clean up the timer
//   }
// }


const fwt = fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1',100);
fwt.then((data) => {
    console.log('Data received:', data);
}).catch((err) => {
    console.error('Error:', err);
});