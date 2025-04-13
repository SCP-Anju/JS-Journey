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
      flightNum,
      name,
      seat,
    });
  },
};
luftansia.book("LH346", "Anju", "A26");
console.log(luftansia);
