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

//exec
