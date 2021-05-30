/* We are goiong to use the randomuser.me API to generate random user.
We are also going to add random money property for the wealth so we can use some of the high order array methods.
Use fetch and async await.
*/

const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

/* Initializing an array  where we  going to put all of the people.
Array of objects, containing the Names, and the money values.
*/

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add  money

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`, //Using back ticks for template literals.
    money: Math.floor(Math.random() * 1000000), //Generate random number up to a million
  };

  addData(newUser);
}

// Double everyones money.
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// Sort users by richest.
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

// Filter only Millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}
// Calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthElement);
}
// Add new object to data array.

function addData(obj) {
  data.push(obj);

  updateDom();
}

// Update DOM
//We use ES6 updateDom(providedData = data)  to provide default data if nothing is used.
function updateDom(providedData = data) {
  //clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach((person) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners

addUser.addEventListener('click', getRandomUser); // Create user.
double.addEventListener('click', doubleMoney); //Double the money.
sort.addEventListener('click', sortByRichest); //Sort users by richest.
showMillionairesBtn.addEventListener('click', showMillionaires); // Show  Millionaires.
calculateWealthBtn.addEventListener('click', calculateWealth); // Sum up all the money.
