"use strict";
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
