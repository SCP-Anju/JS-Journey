"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// LECTURES
/*
console.log((2.7).toFixed(1));

//numeric separator
const number = 19_00;
console.log(number);

//working with BigINt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
//representation of BigInt
console.log(9213127307730173929217391932n);
console.log(BigInt(128319263916321939222));

//creating dates
const now = new Date();
console.log(now);

//unix date
const unix = new Date(0);
console.log(unix);
const days = 3;
const calcMil = (day) => day * 24 * 60 * 60 * 1000;
console.log(calcMil(days));
*/

//working with dates
const sampleDate = new Date(2040, 0, 9, 15, 43, 16);
console.log(sampleDate.getFullYear());
//get monthindex
console.log(sampleDate.getMonth());
//get date (day)
console.log(sampleDate.getDate());
//get day of the week (ex. Sunday)
console.log(sampleDate.getDay());
console.log(sampleDate.getHours());
console.log(sampleDate.getMinutes());
console.log(sampleDate.getSeconds());
console.log(sampleDate.getTime());

//get timeStamp immmediately
console.log(Date.now());
//method sets
console.log(sampleDate.setFullYear(2055));
console.log(sampleDate);

//calculations in dates
console.log(sampleDate.getTime());
