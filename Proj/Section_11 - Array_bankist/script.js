"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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
    "2025-05-22T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-PH", // de-DE
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

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

//butttons
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//creating a username
const createUsername = (accounts) => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createUsername(accounts);

//current state
let states = {
  currentUser: account1,
  summary: null,
  date: null,
  getMethod: function (inputDate) {
    const date = new Date(inputDate);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  },
};

let sorted = false;

//calculateCurrentBalance
const calcSummary = (currentUser) => {
  const { movements, interestRate } = currentUser;
  const balance = movements.reduce((acc, value) => acc + value, 0);
  const withdrawals = movements
    .filter((e) => e < 0)
    .reduce((acc, value) => acc + Math.abs(value), 0);
  const income = movements
    .filter((e) => e > 0)
    .reduce((acc, value) => acc + value, 0);

  const interest = movements
    .filter((e) => e > 0)
    .map((e) => (e * interestRate) / 100)
    .filter((e) => {
      return e >= 1;
    })
    .reduce((acc, values) => acc + values, 0);

  return { balance, withdrawals, income, interest };
};

const daysPassed = (startDate, endDate) => {
  const start = new Date(startDate.year, startDate.month - 1, startDate.day);
  const end = new Date(endDate.year, endDate.month - 1, endDate.day);

  const MS_PERDAY = 1000 * 60 * 60 * 24;
  const days = Math.abs((end - start) / MS_PERDAY);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 7) return `${days} days ago`;

  return `${endDate.month - 1}/${endDate.day}/${endDate.year}`;
};

//showMovements
const showMovements = (currentUser, sort = false) => {
  containerMovements.innerHTML = "";

  const combinedMovDates = currentUser.movements.map((mov, index) => {
    return {
      mov,
      date: currentUser.movementsDates[index],
    };
  });

  console.log(combinedMovDates);

  let movement = sort
    ? combinedMovDates.toSorted((a, b) => a.mov - b.mov)
    : combinedMovDates;

  movement.forEach((e, index) => {
    const type = e.mov > 0 ? "deposit" : "withdrawal";
    //const text_days = daysPassed(states.date, states.calcDate(e.date));

    const perItem = document.createElement("div");
    perItem.classList.add("movements__row");

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("movements__type", `movements__type--${type}`);
    typeDiv.textContent = `${index + 1} ${type}`;

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("movements__date");
    dateDiv.textContent = "";

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("movements__value");
    valueDiv.textContent = `${e.mov.toFixed(2)}`;

    perItem.appendChild(typeDiv);
    perItem.appendChild(dateDiv);
    perItem.appendChild(valueDiv);

    containerMovements.prepend(perItem);
  });
};

//display UI
const displayValues = (summary, text) => {
  labelDate.textContent = text;
  labelBalance.textContent = summary.balance.toFixed(2);
  labelSumIn.textContent = summary.income.toFixed(2);
  labelSumOut.textContent = summary.withdrawals.toFixed(2);
  labelSumInterest.textContent = summary.interest.toFixed(2);
};

//transfer to another account
const transfer = (e) => {
  e.preventDefault();
  //receiver username
  const fromUser = states.currentUser;
  const amount = Number(inputTransferAmount.value);

  const receiver = accounts.find(
    (account) =>
      account.username === inputTransferTo.value.trim() &&
      account.username !== fromUser.username
  );

  if (!receiver || !amount || isNaN(amount)) {
    alert("Please enter a valid username & amount!");
    return;
  }

  if (!receiver) {
    alert("Receiver not found or cannot transfer to yourself.");
    return;
  }

  if (amount < 0 || amount > states.summary.balance) {
    alert("Invalid Amount or insufficient Balance!");
    return;
  }

  fromUser.movements.push(-amount);
  receiver.movements.push(amount);

  showMovements(fromUser);
  states.summary = calcSummary(fromUser);
  displayValues(states.summary);

  inputTransferTo.value = inputTransferAmount.value = "";
};

//show account details
function showAccountDetails(currentUser) {
  containerApp.style.opacity = 1;
  labelWelcome.textContent = `Welcome Back, ${
    states.currentUser.owner.split(" ")[0]
  }`;
  inputLoginPin.value = inputLoginUsername.value = "";

  states.date = new Date();
  const textLoginDate = new Intl.DateTimeFormat(currentUser.locale, {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(states.date);

  //calculate current balances
  states.summary = calcSummary(currentUser);
  showMovements(currentUser);
  displayValues(states.summary, textLoginDate);
}

//account close
const accountClose = (e) => {
  e.preventDefault();

  let username = inputCloseUsername.value.trim();
  let userPin = Number(inputClosePin.value);

  if (!username || !userPin) {
    alert("Please enter a username & pin!");
    return;
  }

  if (
    username !== states.currentUser.username ||
    states.currentUser.pin !== userPin
  ) {
    alert("Invalid Credentials");
    return;
  }

  const currentUserIndex = accounts.findIndex(
    (account) => account.username === username
  );

  let deleted = accounts.splice(currentUserIndex, 1)[0];
  alert(`Account: ${deleted.owner} Successfully Deleted!`);

  //reset UI
  containerApp.style.opacity = 0;
  labelWelcome.textContent = "Log in to get started";
  inputLoginPin.value = inputLoginUsername.value = "";
};

//request loan
const loan = (e) => {
  e.preventDefault();
  const currentUser = states.currentUser;
  const loanAmount = Math.floor(Number(inputLoanAmount.value));
  const getLoanDate = new Date();

  if (!loanAmount || loanAmount <= 0) {
    alert("Invalid Amount!");
    return;
  }

  if (!currentUser.movements.some((value) => value >= loanAmount * 0.1)) {
    alert("The requested amount is not accepted!");
    return;
  }

  currentUser.movements.push(loanAmount);
  currentUser.movementsDates.push(getLoanDate.toISOString());

  //calculate current balances
  states.summary = calcSummary(currentUser);
  showMovements(currentUser);
  displayValues(states.summary);

  inputLoanAmount.value = "";
};

//Login
const logIn = (e) => {
  e.preventDefault();

  if (!inputLoginUsername.value.trim() || !inputLoginPin.value) {
    alert("Please enter a username & pin!");
    return;
  }
  states.currentUser = accounts.find(
    (account) =>
      account.username === inputLoginUsername.value.trim() &&
      account.pin === Number(inputLoginPin.value)
  );

  if (!states.currentUser) {
    alert("Invalid Credentials!");
    return;
  }
  console.log(states.currentUser);
  showAccountDetails(states.currentUser);
};

btnLogin.addEventListener("click", logIn);
btnTransfer.addEventListener("click", transfer);
btnClose.addEventListener("click", accountClose);
btnLoan.addEventListener("click", loan);
btnSort.addEventListener("click", () => {
  sorted = !sorted;
  showMovements(states.currentUser, sorted);
});

showAccountDetails(states.currentUser);
