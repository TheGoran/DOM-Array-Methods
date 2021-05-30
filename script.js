/* We are goiong to use the randomuser.me API to generate random user.
We are also going to add random money property for the wealth so we can use some of the high order array methods.
Use fetch and async await.
*/

const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

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
