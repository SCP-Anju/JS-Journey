"use strict";
//Higher-order-functions
//1
const itemPriceA = 100;
const itemPriceB = 200;

const taxRateA = 0.1;
const taxRateB = 0.15;

const taxApplied = (price, taxRate) => price * taxRate;

function result(price, taxApplied, taxRate) {
  return taxApplied(price, taxRate) + price;
}

console.log(result(itemPriceA, taxApplied, taxRateA));

//2
const events = ["click", "view", "scroll"];

const users = [
  {
    id: 101,
    name: "Jane Doe",
  },
  {
    id: 102,
    name: "Jennifer Lee",
  },
  { id: 103, name: "Harry Marquez diaz" },
  {
    id: 104,
    name: "Jae Doe",
  },
  {
    id: 105,
    name: "Jenn Lee",
  },
  { id: 106, name: "Denver Diaz" },
];

const historyEvents = [];
const storeN = (user, event) => {
  let log = `${user} triggered a ${event} event`;
  historyEvents.push(log);
  return log;
};

function randomizer(arr) {
  return Math.floor(Math.random() * arr.length);
}
const triggeredEventBy = (users, eventList, fn, random) => {
  const user = users[random(users)].name;
  const event = eventList[random(eventList)];

  return fn(user, event);
};

for (let i = 0; i < 6; i++) {
  triggeredEventBy(users, events, storeN, randomizer);
}

console.log(historyEvents);

//3
const products = [
  { price: 499.99, brand: "Sony", rating: 4.5 },
  { price: 299.0, brand: "Samsung", rating: 4.2 },
  { price: 129.99, brand: "Xiaomi", rating: 4.0 },
  { price: 849.5, brand: "Apple", rating: 4.8 },
  { price: 199.99, brand: "LG", rating: 4.1 },
  { price: 89.99, brand: "Anker", rating: 4.3 },
  { price: 149.99, brand: "JBL", rating: 4.4 },
  { price: 379.0, brand: "OnePlus", rating: 4.6 },
  { price: 59.95, brand: "Realme", rating: 3.9 },
  { price: 229.99, brand: "Motorola", rating: 4.0 },
];

function filterFn(products, keyword) {
  console.log(products.map((obj) => obj[keyword]));
}

filterFn(products, "brand");

//4
function mostFrequent(arr) {
  const obj = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  console.log(obj);

  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
}

console.log(
  mostFrequent(["apple", "banana", "apple", "orange", "banana", "apple"])
);

//5
function firstNonRepeating(arr) {
  const obj = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(obj).reduce((acc, item) => {
    if (obj[item] === 1) acc.push(item);
    return acc;
  }, []);
}
console.log(
  firstNonRepeating(["red", "blue", "green", "blue", "red", "yellow"])
);
console.log(firstNonRepeating(["a", "b", "a", "b", "c"]));
console.log(firstNonRepeating(["x", "x", "x"]));

//Apply and Bind
const luftansia = {
  airline: "Luftansia",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name, seat) {
    this.bookings.push({
      flight: this.iataCode,
      flightNum: this.iataCode + flightNum,
      name,
      seat,
    });
  },
};
luftansia.book("346", "Anju", "A26");

const euroWings = {
  airline: "EuroWings",
  iataCode: "EW",
  bookings: [],
};

//get the book function
const bookFlight = luftansia.book;

//call points to an object
bookFlight.call(euroWings, 32, "Anju", "A12");

//apply method - accepts array of data as a second argument
const flightData = [154, "Jenny", "A32"];
bookFlight.apply(euroWings, flightData);

//same as apply method
//bookFlight.call(euroWings, ...flightData);

//the bind method
const bookLH = bookFlight.bind(luftansia);
const bookEW = bookFlight.bind(euroWings);

bookEW(32, "steven", "M32");
bookLH(34, "steven", "M32");

//default parameter and a bind (partial application)
const bookEW43 = bookFlight.bind(euroWings, 43);
bookEW43("Jerry", "A32");

console.log(luftansia);
console.log(euroWings);

//partial application
const addtax = (rate, value) => value + value * rate;
console.log(addtax(0.1, 200));

const addVAT = addtax.bind(null, 0.23);
console.log(addVAT(300));

//with event listner
luftansia.numPlane = 300;
luftansia.addPlane = function () {
  this.numPlane++;
  console.log(this.numPlane);
};

document
  .querySelector(".buy")
  .addEventListener("click", luftansia.addPlane.bind(luftansia));

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: "What is your Favorite Programming Language?",
  options: { 0: "Javscript", 1: "Python", 2: "Rust", 3: "C++" },
  answer: Array(4).fill(0),

  registerNewAnswer() {
    const input = Number(
      prompt(
        `${this.question}\n${Object.entries(this.options)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")}\n(Write option number)`
      )
    );

    if (typeof input === "number" && Math.abs(input) < this.answer.length) {
      this.answer[input]++;
    }
  },

  displayResult(type = "array") {
    if (type === "array") {
      console.log(this.answer);
    } else if (type === "string") {
      console.log(`Poll results are: ${this.answer.join(" ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResult.call({ answer: [5, 3, 2, 1] });
