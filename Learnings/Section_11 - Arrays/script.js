"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Array Methods//

const testArray = ["a", "b", "c", "d", "e", "f"];

//Slice - does not mutate the array
console.log(testArray.slice(1, 5));
console.log(testArray.slice(1, -2));

//splice - mutates the array
//extracts the values and removes from the original
const testArray2 = structuredClone(testArray);
const extracted = testArray2.splice(1, 3);
console.log(extracted);
console.log(testArray2);

//reverse - mutates the array
testArray.reverse();
console.log(testArray);

//concat - joins array - does not mutate any involved arrays.
const letters = testArray.concat(extracted);
console.log(letters);

//join - joins an array and converts to string
const str = letters.join("-");
console.log(str);

//at - 'at position'
const arr = [11, 23, 45];
console.log(arr[0]);
console.log(arr.at(0));

//getting last element
console.log(arr[arr.length - 1]);
console.log(arr.splice(-1)[0]);

//with at
console.log(arr.at(-1));

//forEach Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach((element, index, array) => {
  if (element > 0) {
    console.log(`Movement ${index}: You deposited $${element}`);
  } else {
    console.log(`Movement ${index}: You withdraw $${Math.abs(element)}`);
  }
});

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
/////////////////////////////////////////////////
