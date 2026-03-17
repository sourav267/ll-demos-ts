function generateSum(limit){
    if (limit <= 0) {
        return 0;
    }
    const helper = (...args) => {
        if (args.length >= limit) {
            let allowedArgs = args.slice(0,limit);
            return allowedArgs.reduce((acc,val) => acc + val, 0);
        } else {
            let temp = (...newArgs) => helper(...args, ...newArgs);
            return temp;
        }
    }
    return helper;
}

const sum = generateSum(3);