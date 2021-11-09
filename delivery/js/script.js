'use strict';

const citiesList = document.querySelector('.cities__list');
const citiesInput = document.querySelector('.cities__input');
const dropdownButton = document.querySelector('.dropdown__button');
const citiesListWrapper = document.querySelector('.cities__list-wrapper');
const cargoInputs = document.querySelector('.cargo__inputs');
const cargoWidthInp = document.querySelector('#CargoWidth');
const cargoHightInp = document.querySelector('#CargoHight');
const cargoHightRange = document.querySelector('.hight__range');
const cargoWidthRange = document.querySelector('.width__range');
const cargoDrawing = document.querySelector('.cargo__drawing');
const cargoWeight = document.querySelector('.cargo__weight');
const dateInput = document.querySelector('#dateInput');
const timeInput = document.querySelector('#timeInput');
const finalCost = document.querySelector('.finalCost span');
const confirmButton = document.querySelector('.confirm-button');

const prices = {
  transportationPrice: 35,
  pricePerWeigh: 2,
  extraCostPerWidth: 300,
  extraCostPerHeight: 400,
  extraCostPerWeight: 1300,
};

let answers = {};

let citiesArr = [];

const url =
  'https://gist.githubusercontent.com/alex-oleshkevich/1509c308fabab9e104b5190dab99a77b/raw/b20bd8026deec00205a57d395c0ae1f75cc387bb/ua-cities.json';

(async function getData() {
  try {
    clearInput(citiesInput);
    const response = await fetch(url);
    const data = await response.json();
    const regions = data[0].regions;
    regions.forEach(reg => {
      const cities = [...reg.cities];
      cities.forEach(city => {
        citiesArr.push(city.name);
      });
    });
    createLi(citiesArr);
  } catch (err) {
    console.log(err);
  }
})();

dropdownButton.addEventListener('click', function () {
  citiesListWrapper.classList.toggle('hidden');
});

dateInput.setAttribute('min', getDeliveryDate());

citiesInput.addEventListener('input', function (e) {
  citiesListWrapper.classList.remove('hidden');

  let filteredCities = citiesArr.filter(
    city => city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
  );
  createLi(filteredCities);
});

citiesList.addEventListener('click', choossesCity);

cargoInputs.addEventListener('input', function (e) {
  const target = e.target;

  let priceWithoutExtraCharge = 0;
  let totalPrice = 0;

  if (target === cargoWidthRange || target === cargoHightRange) {
    cargoWidthInp.value = cargoWidthRange.value;
    cargoHightInp.value = cargoHightRange.value;
  } else if (target === cargoWidthInp || target === cargoHightInp) {
    cargoWidthRange.value = cargoWidthInp.value;
    cargoHightRange.value = cargoHightInp.value;
  }

  const weight = Math.round(
    (cargoHightRange.value * cargoWidthRange.value) / 0.02
  );
  cargoWeight.textContent = weight + ' Kg';

  const height = cargoHightInp.value * 100 + 20;
  const width = cargoWidthInp.value * 100 + 20;
  cargoDrawing.style.minWidth = `${width}px`;
  cargoDrawing.style.minHeight = `${height}px`;

  priceWithoutExtraCharge =
    weight * prices.pricePerWeigh + prices.transportationPrice;
  totalPrice = getAdditionalPrice(
    cargoWidthInp.value,
    cargoHightInp.value,
    weight
  );
  finalCost.textContent = priceWithoutExtraCharge + totalPrice + ' UAH';
});

confirmButton.addEventListener('click', writeDownTheAnswers);
confirmButton.addEventListener('click', createModal);
confirmButton.addEventListener('click', citiesInputValidation);
confirmButton.addEventListener('click', nameInputValidation);
confirmButton.addEventListener('click', sernameInputValidation);

function createLi(arr) {
  let sortedArr = arr.sort();
  if (citiesList.children) {
    let liArray = Array.from(citiesList.children);
    liArray.forEach(element => element.remove());
  }
  for (const city of sortedArr) {
    const li = document.createElement('li');
    li.classList.add('cities__item');
    li.textContent = city;
    citiesList.append(li);
  }
}

function getCitiesList(arr) {
  arr.forEach(element => {
    let li = document.createElement('li');
    li.classList.add('cities__item');
    li.textContent = element.name;

    citiesList.append(li);
  });
}

function choossesCity(event) {
  let target = event.target;
  citiesInput.value = target.textContent;
  citiesListWrapper.classList.add('hidden');
}

function clearInput(input) {
  input.textContent = '';
  input.value = '';
}

function filterCities(arr) {
  let inputValue = citiesInput.value;
  let filteredCities = arr.filter(
    city => city.slice(0, inputValue.length) == inputValue
  );
  createLi(filteredCities);
}

function getDeliveryDate() {
  const today = new Date();
  dateInput.valueAsDate = today;
  const afterThreeDays = new Date(today.setDate(today.getDate() + 3));
  const deliweryDay = `${afterThreeDays.getFullYear()}-${
    afterThreeDays.getMonth() + 1
  }-${afterThreeDays.getDate()}`;
  return deliweryDay;
}

function getAdditionalPrice(width, height, weight) {
  const maxWeight = 500;
  let additionalPrice = 0;
  const pricePerWidt =
    width > 1 ? Math.round((width - 1) * prices.extraCostPerWidth) : 0;
  const pricePerHeight =
    height > 1 ? Math.round((height - 1) * prices.extraCostPerHeight) : 0;
  const pricePerWeight = weight > maxWeight / 2 ? prices.extraCostPerWeight : 0;
  additionalPrice = pricePerWidt + pricePerHeight + pricePerWeight;
  return additionalPrice;
}

function writeDownTheAnswers() {
  const nameInput = document.querySelector('#NameInput');
  const sernameInput = document.querySelector('#SernameInput');
  const phoneInput = document.querySelector('#PhoneInput');
  const commentsInput = document.querySelector('.comment__input');

  answers.city = citiesInput.value;
  answers.name = nameInput.value;
  answers.sername = sernameInput.value;
  answers.phone = phoneInput.value;
  answers.comments = commentsInput.value;
  answers.width = +cargoWidthInp.value;
  answers.hight = +cargoHightInp.value;
  answers.weight = parseInt(cargoWeight.textContent);
  answers.price = parseInt(finalCost.textContent);
}

function createModal() {
  const modal = document.querySelector('.modal__box');

  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <p class="recipient__city">Recipient city: ${answers.city}</p>
    <p class="recipient__name">Full name: ${answers.name} ${answers.sername}</p>
    <p class="recipient__phone">Recipient phone number: ${answers.phone}</p>
    <p class="comments">Comments: </p>
    <div class="cargo__info-box">
      <span class="cargo__width">Cargo width: </span>
      <span class="cargo__height">Cargo height: </span>
      <span class="cargo__weight">Cargo weight: </span>
    </div>
    <p class="delivery-date">Delivery date is: </p>
    <button type="submit" class="modal__submit">Submit</button>
    <button class="modal__cancel">Cancel</button>
  `
  );
}

function citiesInputValidation() {
  const err = document.querySelector('.cities__error');
  const cities = Array.from(citiesList.children).map(el => el.textContent);

  if (!citiesInput.value) {
    showInputErr(citiesInput, err);
  } else if (!cities.includes(citiesInput.value)) {
    showInputErr(citiesInput, err);
    err.textContent = 'This city is not on the list';
  } else {
    undoError(nameInput, err);
    err.textContent = '';
  }
}

function nameInputValidation() {
  const nameInput = document.querySelector('#NameInput');
  const err = document.querySelector('.name__error');
  if (!nameInput.value) {
    showInputErr(nameInput, err);
  } else {
    undoError(nameInput, err);
  }
}

function sernameInputValidation() {
  const sernameInput = document.querySelector('#SernameInput');
  const err = document.querySelector('.sername__error');
  if (!sernameInput.value) {
    showInputErr(sernameInput, err);
  } else {
    undoError(sernameInput, err);
  }
}

function showInputErr(input, err) {
  input.style.outline = '2px solid red';
  err.style.display = 'inline-block';
  input.focus();
}

function undoError(input, err) {
  input.style.outline = '';
  err.style.display = '';
}

const phoneMask = document.getElementById('PhoneInput');
const maskOptions = {
  mask: '+{38}(000)000-00-00',
};
const mask = IMask(phoneMask, maskOptions);

// Каждый дополнительный метр ширины груза: +1000 рублей к стоимости доставки - Каждый дополнительный метр высоты груза: +1200 рублей к стоимости доставки - Если вес больше половинного значения максимально допустимого (например, вы указали максимальный вес 500кг, а пользователь ввел >250): +3500 к стоимости доставки
