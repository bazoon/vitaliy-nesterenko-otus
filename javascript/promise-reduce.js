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

const fn1 = () => {
  console.log("fn1");
  return Promise.resolve(1);
};

const fn2 = () =>
  new Promise(resolve => {
    console.log("fn2");
    setTimeout(() => resolve(2), 1000);
  });

promiseReduce(
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
