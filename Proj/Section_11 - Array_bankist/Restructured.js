"use strict";

/* === Global Variables === */

let [inactivityTimer, logoutTimer] = [null, null];
let totalSeconds = 10;

/* === Accounts Data === */
const accounts = [
  {
    owner: "Jonas Schmedtmann",
    interestRate: 1.2,
    pin: 1111,

    transact: [
      { mov: 200, date: "2019-11-18T21:31:17.178Z" },
      { mov: 455.23, date: "2019-12-23T07:42:02.383Z" },
      { mov: -306.5, date: "2020-01-28T09:15:04.904Z" },
      { mov: 25000, date: "2020-04-01T10:17:24.185Z" },
      { mov: -642.21, date: "2020-05-08T14:11:59.604Z" },
      { mov: -133.9, date: "2020-05-27T17:01:17.194Z" },
      { mov: 79.97, date: "2020-07-11T23:36:17.929Z" },
      { mov: 1300, date: "2025-05-26T10:51:36.790Z" },
    ],
    currency: "PHP",
    locale: "en-PH",
  },
  {
    owner: "Jessica Davis",
    interestRate: 1.5,
    pin: 2222,

    transact: [
      { mov: 5000, date: "2019-11-01T13:15:33.035Z" },
      { mov: 3400, date: "2019-11-30T09:48:16.867Z" },
      { mov: -150, date: "2019-12-25T06:04:23.907Z" },
      { mov: -790, date: "2020-01-25T14:18:46.235Z" },
      { mov: -3210, date: "2020-02-05T16:33:06.386Z" },
      { mov: -1000, date: "2020-04-10T14:43:26.374Z" },
      { mov: 8500, date: "2020-06-25T18:49:59.371Z" },
      { mov: -30, date: "2020-07-26T12:01:20.894Z" },
    ],
    currency: "USD",
    locale: "en-US",
  },
];

/* === DOM ELEMENTS === */
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

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

/* === UTILITY FUNCTION === */
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const displayTimer = () => {
  if (totalSeconds <= 0) {
    clearInterval(logoutTimer);
    containerApp.style.opacity = 0;
    return;
  }
  labelTimer.textContent = `Inactivity Detected: Logging out in ${formatTime(
    totalSeconds
  )}`;

  totalSeconds--;
};

const startInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  clearInterval(logoutTimer);
  totalSeconds = 10;

  inactivityTimer = setTimeout(() => {
    labelTimer.style.opacity = 1;
    logoutTimer = setInterval(displayTimer, 1000);
  }, 10 * 1000);
};

const resetTimersOnActivity = () => {
  labelTimer.textContent = "";
  labelTimer.style.opacity = 0;
  startInactivityTimer();
};

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

//calculate summary of the account
const calcSummary = (user) => {
  const { transact, interestRate } = user;
  const movements = transact.map((transact) => transact.mov);
  const balance = movements.reduce((acc, value) => acc + value, 0);
  const withdrawal = movements
    .filter((mov) => mov < 0)
    .reduce((acc, value) => acc + Math.abs(value), 0);
  const income = movements
    .filter((mov) => mov > 0)
    .reduce((acc, value) => acc + value, 0);
  const interest = movements
    .filter((e) => e > 0)
    .map((e) => (e * interestRate) / 100)
    .filter((e) => {
      return e >= 1;
    })
    .reduce((acc, values) => acc + values, 0);

  return { balance, withdrawal, income, interest };
};

//format currency
const formatCurrency = (unit, value, locale) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: unit,
  }).format(value);

//format date movements
const formatDateMov = (date, locale) => {
  const difference = Math.abs(date - appState.date);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 7) return `${days} days ago`;

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};

//display UI
const displayValues = (currency, summary, locale) => {
  console.log(summary);
  labelBalance.textContent = formatCurrency(
    currency,
    summary.balance.toFixed(2),
    locale
  );
  labelSumIn.textContent = formatCurrency(
    currency,
    summary.income.toFixed(2),
    locale
  );
  labelSumOut.textContent = formatCurrency(
    currency,
    summary.withdrawal.toFixed(2),
    locale
  );
  labelSumInterest.textContent = formatCurrency(
    currency,
    summary.interest.toFixed(2),
    locale
  );
};

/* === MAIN LOGIC === */

//App state
const appState = {
  user: null,
  date: null,
  summary: null,
  sorted: false,
};

//show the balance movements
const showMovements = (user, locale = navigator.language || "en-US") => {
  containerMovements.innerHTML = "";

  let transactions = appState.sorted
    ? user.transact.toSorted((a, b) => a.mov - b.mov)
    : user.transact;

  transactions.forEach((transact, index) => {
    const date = new Date(transact.date);
    const type = transact.mov > 0 ? "deposit" : "withdrawal";

    const perItem = document.createElement("div");
    perItem.classList.add("movements__row");

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("movements__type", `movements__type--${type}`);
    typeDiv.textContent = `${index + 1} ${type}`;

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("movements__date");

    dateDiv.textContent = formatDateMov(date, locale);

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("movements__value");
    valueDiv.textContent = formatCurrency(user.currency, transact.mov, locale);

    perItem.appendChild(typeDiv);
    perItem.appendChild(dateDiv);
    perItem.appendChild(valueDiv);

    containerMovements.prepend(perItem);
  });
};

function showAccountDetails(user) {
  containerApp.style.opacity = 1;
  const locale = user.locale || navigator.language || "en-US";

  labelWelcome.textContent = `Welcome Back, ${user.owner.split(" ")[0]}`;

  inputLoginPin.value = inputLoginUsername.value = "";

  appState.date = new Date();
  const textLoginDate = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(appState.date);

  labelDate.textContent = textLoginDate;

  //calculate current balances
  appState.summary = calcSummary(user);
  showMovements(user, locale);
  displayValues(user.currency, appState.summary, locale);

  ["mousemove", "click", "keydown", "touchstart"].forEach((event) => {
    window.addEventListener(event, resetTimersOnActivity);
  });
}

//transfer money
const transfer = (e) => {
  e.preventDefault();
  const transferDate = new Date();
  const fromUser = appState.user;
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

  if (amount < 0 || amount > appState.summary.balance) {
    alert("Invalid Amount or insufficient Balance!");
    return;
  }

  fromUser.transact.push({
    mov: -amount,
    date: transferDate.toISOString(),
  });
  receiver.transact.push({
    mov: amount,
    date: transferDate.toISOString(),
  });

  //calculate summary
  appState.summary = calcSummary(fromUser);
  showMovements(fromUser, fromUser.locale);
  displayValues(fromUser.currency, appState.summary, fromUser.locale);

  inputTransferTo.value = inputTransferAmount.value = "";
};

//request loan
const request = (e) => {
  e.preventDefault();
  const user = appState.user;
  const loanAmount = Math.floor(Number(inputLoanAmount.value));
  const getLoanDate = new Date();

  let transaction = Object.values(user.transact).map(
    (transact) => transact.mov
  );

  if (!loanAmount || loanAmount <= 0) {
    alert("Invalid Amount!");
    return;
  }
  console.log(transaction);

  if (!transaction.some((value) => value >= loanAmount * 0.1)) {
    alert("The requested amount is not accepted!");
    return;
  }

  user.transact.push({
    mov: loanAmount,
    date: getLoanDate.toISOString(),
  });

  appState.summary = calcSummary(user);

  showMovements(user, user.locale);
  displayValues(user.currency, appState.summary, user.locale);

  inputLoanAmount.value = "";
};

const accountClose = (e) => {
  e.preventDefault();

  let username = inputCloseUsername.value.trim();
  let userPin = Number(inputClosePin.value);

  if (!username || !userPin) {
    alert("Please enter a username & pin!");
    return;
  }

  if (username !== appState.user.username || appState.user.pin !== userPin) {
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

//login
const logIn = (e) => {
  e.preventDefault();

  if (!inputLoginUsername.value.trim() || !inputLoginPin.value) {
    alert("Please enter a username & pin!");
    return;
  }

  appState.user = accounts.find(
    (account) =>
      account.username === inputLoginUsername.value.trim() &&
      account.pin === Number(inputLoginPin.value)
  );

  if (!appState.user) {
    alert("Invalid Credentials!");
    return;
  }
  showAccountDetails(appState.user);
};

/* === EVENT HANDLERS === */
btnLogin.addEventListener("click", logIn);
btnSort.addEventListener("click", () => {
  appState.sorted = !appState.sorted;
  showMovements(appState.user, appState.user.locale);
  console.log(appState.sorted);
});
btnTransfer.addEventListener("click", transfer);
btnLoan.addEventListener("click", request);
btnClose.addEventListener("click", accountClose);

/* === INIT === */
createUsername(accounts);
