function sum(a) {
  if (a != undefined) {
  	sum.result = (sum.result || 0) + a;  
    return sum;
  }
  return sum.result;  
}

console.log(sum(0))
console.log(sum(1)(2)(3)());


// Еще варианты

// let result = 0

// function sum(a) {
//   if (a) {
//     result += a;
//     return sum;
//   }
//   return result;  
// }


// const sum = (function () {
//   let result = 0;
//   return function (a) {
//     if (a) {
//       result += a;
//       return sum;
//     }
//     return result;
//   }
// }());


