//Task 1: Implement promiseAll Function
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedPromises = 0;

        if (promises.length === 0) {
            resolve(results);
        }

        promises.forEach((promise, index) => {
            promise.then(value => {
                results[index] = value;
                completedPromises++;

                if (completedPromises === promises.length) {
                    resolve(results);
                }
            }).catch(reason => {
                reject(reason);
            });
        });
    });
}

const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

promiseAll(promises)
    .then(results => {
        console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch(error => {
        console.error("At least one promise rejected:", error);
    });


//Task2 Implement promiseAllSettled Function
function promiseAllSettled(promises) {
    const settledPromises = [];

    const handlePromise = (promise) => {
        return promise
            .then(value => ({ status: 'fulfilled', value }))
            .catch(reason => ({ status: 'rejected', reason }));
    };

    const processPromises = async () => {
        for (const promise of promises) {
            const settledPromise = await handlePromise(promise);
            settledPromises.push(settledPromise);
        }
        return settledPromises;
    };

    return processPromises();
}

const promisesTask2 = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
];

promiseAllSettled(promisesTask2)
    .then(results => {
        console.log("All promises settled:", results);
    });


//Task3 Implement Chaining of Promises as a Separate Function
function chainPromises(functionsArray) {
    return functionsArray.reduce((chain, func) => {
        return chain.then(func);
    }, Promise.resolve());
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
    .then(result => {
        console.log("Chained promise result:", result);
    })
    .catch(error => {
        console.error("Chained promise error:", error);
    });


//Task 4: Implement promisify Function
function promisify(callbackStyleFunction) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            callbackStyleFunction(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Example usage:
function callbackStyleFunction(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback("Invalid value", null);
        }
    }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
    .then(result => {
        console.log("Promised function result:", result); // Expected: 6
    })
    .catch(error => {
        console.error("Promised function error:", error);
    });