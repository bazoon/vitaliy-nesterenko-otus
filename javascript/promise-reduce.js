// Рекурсивный вариант
function promiseReduce(asyncFunctions, reduce, initialValue) {
  const promise = asyncFunctions.shift()();
  return promise.then(result => {
    const nextValue = reduce(result, initialValue);
    if (asyncFunctions.length > 0) {
      return promiseReduce(asyncFunctions, reduce, nextValue);
    }
    return nextValue;
  });
}

// Второй вариант через await
async function promiseReduce2(asyncFunctions, reduce, initialValue) {
  let newResult = initialValue;
  for (let i = 0; i < asyncFunctions.length; i++) {
    let fn = asyncFunctions[i];
    let result = await fn();
    newResult = reduce(result, newResult);
  }
  return newResult;
}

async function promiseReduce3(asyncFunctions, reduce, initialValue) {
  return asyncFunctions.reduce(async function(acc, fn) {
    const nextValue = await fn();
    const accumulator = await acc;
    return Promise.resolve(reduce(accumulator, nextValue));
  }, Promise.resolve(initialValue));
}

async function promiseReduce4(asyncFunctions, reduce, initialValue) {
  let newResult = Promise.resolve(initialValue);
  asyncFunctions.forEach(function(fn) {
    newResult = newResult.then(async initial => {
      return reduce(initial, await fn());
    });
  });

  return newResult;
}

const fn1 = () => {
  console.log("fn1");
  return Promise.resolve(1);
};

const fn2 = () =>
  new Promise(resolve => {
    console.log("fn2");
    setTimeout(() => resolve(2), 1000);
  });

promiseReduce4(
  [fn1, fn2],
  (acc, e) => {
    console.log("reduce");
    return acc + e;
  },
  0
)
  .then(r => {
    console.log(r);
  })
  .catch(e => {
    // console.log(e)
  });
