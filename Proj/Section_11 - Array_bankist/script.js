"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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
  currentUser: null,
  summary: null,
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

//showMovements
const showMovements = (currentUser, sort = false) => {
  containerMovements.innerHTML = "";
  let movement = sort
    ? currentUser.movements.slice().sort((a, b) => a - b)
    : currentUser.movements;

  console.log(movement);
  movement.forEach((e, index) => {
    const type = e > 0 ? "deposit" : "withdrawal";

    const perItem = document.createElement("div");
    perItem.classList.add("movements__row");

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("movements__type", `movements__type--${type}`);
    typeDiv.textContent = `${index + 1} ${type}`;

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("movements__value");
    valueDiv.textContent = `${e}`;

    perItem.appendChild(typeDiv);
    perItem.appendChild(valueDiv);

    containerMovements.prepend(perItem);
  });
};

//display UI
const displayValues = (summary) => {
  labelBalance.textContent = summary.balance;
  labelSumIn.textContent = summary.income;
  labelSumOut.textContent = summary.withdrawals;
  labelSumInterest.textContent = summary.interest;
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

  //calculate current balances
  states.summary = calcSummary(currentUser);
  showMovements(currentUser);
  displayValues(states.summary);
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
  const loanAmount = Number(inputLoanAmount.value);

  if (!loanAmount || loanAmount <= 0) {
    alert("Invalid Amount!");
    return;
  }

  if (!currentUser.movements.some((value) => value >= loanAmount * 0.1)) {
    alert("The requested amount is not accepted!");
    return;
  }

  currentUser.movements.push(loanAmount);

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
