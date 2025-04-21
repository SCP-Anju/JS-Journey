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

const checkDogs = function (julia_Data, kate_Data) {
  const copyJulia = julia_Data.slice(1, -2);
  const combined = copyJulia.concat(kate_Data);

  combined.forEach((dog, index) => {
    let classification;
    dog < 3 ? (classification = "puppy") : (classification = "adult");
    console.log(`The dog number ${index + 1} is ${classification}`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const calcAveHumanYears = (ages) => {
  const humanAge = ages.map((age) => (age < 3 ? age * 2 : 16 + age * 4));
  const filtered = humanAge.filter((age) => age > 18);
  return filtered.reduce((acc, age, index, arr) => acc + age / arr.length, 0);
};

console.log(calcAveHumanYears([5, 2, 4, 1, 15, 8, 3]));

//some and every
const bool = movements.some((value) => value > 3000);
const bool2 = movements.every((value) => value > 0);
console.log(bool, bool2);

//flat and flatMap
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const num = [1, 2, 3, [2, 3, 4, [4, 6, 7, 8]], 7, [4, 5]];
console.log(num.flat(2));

//calculate all the balance
const allBalance = accounts.map((account) => account.movements).flat();
console.log(allBalance.reduce((acc, value) => acc + value, 0));

const allBalanceflatMap = accounts.flatMap((account) => account.movements);
console.log(allBalanceflatMap);
console.log(allBalanceflatMap.reduce((acc, value) => acc + value, 0));

// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
*/

/////////////////////////////////////////////////

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

//#1
const huskyWeight = breeds.find(
  (breed) => breed.breed === "Husky"
).averageWeight;

//2
const dogBothActivities = breeds.filter(
  (breed) =>
    breed.activities.includes("running") && breed.activities.includes("fetch")
)[0].breed;
console.log(dogBothActivities);

//3
const allActivities = breeds.flatMap((breed) => breed.activities);
console.log(allActivities);

//4
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

//5
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter((breed) => breed.activities.includes("swimming"))
      .flatMap((breed) => breed.activities)
      .filter((activity) => activity !== "swimming")
  ),
];
console.log(swimmingAdjacent);

//6
const averageWeight = breeds.every((breed) => breed.averageWeight > 10);
console.log(averageWeight);

//7
const activeBreed = breeds.some((breed) => breed.activities.length > 2);
console.log(activeBreed);

//8
const averageWeightBreed = breeds
  .filter((breed) => breed.activities.includes("fetch"))
  .reduce((acc, breed) =>
    breed.averageWeight > acc.averageWeight ? breed : acc
  );
console.log(averageWeightBreed.averageWeight);

//array groupings

const groupMovements = Object.groupBy(movements, (mov) =>
  mov < 0 ? "widthrawals" : "deposits"
);
console.log(groupMovements);

//array fillings

console.log([1, 2, 3, 4, 5]);
console.log(new Array([1, 2, 3, 4, 5]));

//empty array specified length
const x = new Array(6);
console.log(x);

//fill the array with value of 1
x.fill(1);
console.log(x);

//value - start - end
x.fill(2, 2, 5);
console.log(x);

//array from
const arrayValues = Array.from({ length: 10 }, (current, index) => index + 1);

console.log(arrayValues);

//Non-destructve alternatives: toReversed, toSorted, toSplice
//array.with(index, value);
