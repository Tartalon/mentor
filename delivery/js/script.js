'use strict';

const body = document.querySelector('body');
const form = document.querySelector('form');
const citiesList = document.querySelector('.cities__list');
const citiesInput = document.querySelector('.cities__input');
const dropdownButton = document.querySelector('.dropdown__button');
const citiesListWrapper = document.querySelector('.cities__list-wrapper');
const cargoInputs = document.querySelector('.cargo__inputs');
const cargoWidthInp = document.querySelector('#CargoWidth');
const cargoHeightInp = document.querySelector('#CargoHeight');
const cargoHeightRange = document.querySelector('.height__range');
const cargoWidthRange = document.querySelector('.width__range');
const cargoDrawing = document.querySelector('.cargo__drawing');
const cargoWeight = document.querySelector('.cargo__weight');
const dateInput = document.querySelector('#dateInput');
const timeInput = document.querySelector('#timeInput');
const finalCost = document.querySelector('.finalCost span');
const confirmButton = document.querySelector('.confirm-button');
const phoneMask = document.getElementById('PhoneInput');
const modal = document.querySelector('.modal');
const clearButon = document.querySelector('.reset-button');

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

dateInput.setAttribute('min', getDeliveryDate());

dropdownButton.addEventListener('click', function () {
	citiesListWrapper.classList.toggle('hidden');
});

form.addEventListener('click', function (e) {
	if (e.target != citiesList && e.target != dropdownButton) {
		citiesListWrapper.classList.add('hidden');
	}
});

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

	if (target.value === '') target.value = 0.1;

	switch (target) {
		case cargoWidthRange:
			cargoWidthInp.value = cargoWidthRange.value;
			break;
		case cargoHeightRange:
			cargoHeightInp.value = cargoHeightRange.value;
			break;
		case cargoWidthInp:
			cargoHeightRange.value = cargoWidthInp.value;
			break;
		case cargoHeightInp:
			cargoHeightRange.value = cargoHeightInp.value;
			break;
	}

	const weight = Math.round(
		(cargoHeightRange.value * cargoWidthRange.value) / 0.02
	);
	cargoWeight.textContent = weight + ' kg';

	const height = cargoHeightInp.value * 70 + 20;
	const width = cargoWidthInp.value * 70 + 20;
	cargoDrawing.style.minWidth = `${width}px`;
	cargoDrawing.style.minHeight = `${height}px`;

	priceWithoutExtraCharge =
		weight * prices.pricePerWeigh + prices.transportationPrice;
	totalPrice = getAdditionalPrice(
		cargoWidthInp.value,
		cargoHeightInp.value,
		weight
	);
	finalCost.textContent =
		(priceWithoutExtraCharge + totalPrice).toLocaleString('ru') + ' UAH';
});

// confirmButton.addEventListener('click', writeDownTheAnswers);

confirmButton.addEventListener('click', function () {
	citiesInputValidation();
	nameInputValidation();
	surnameInputValidation();
	phoneInputValidation();
	dateInputValidation();
	timeInputValidation();
	writeDownTheAnswers();

	if (!answers.comments) {
		const comments = document.querySelector('.comment__input');
		answers.comments = comments.placeholder;
	}
	const values = Object.values(answers);
	console.log(values);

	if (values.includes('')) {
		return;
	} else {
		body.classList.add('modal-open');
		createModal();
		modal.style.visibility = 'visible';
	}
});

modal.addEventListener('click', function (e) {
	const cancel = document.querySelector('.modal__cancel');
	const submit = document.querySelector('.modal__submit');

	if (e.target === modal || e.target === cancel) {
		modal.style.visibility = 'hidden';
		body.classList.remove('modal-open');
	}
	if (e.target === submit) {
		const datasForSend = createJsonStringify(answers);
		modal.style.visibility = 'hidden';
		body.classList.remove('modal-open');
	}
});

clearButon.addEventListener('click', function (e) {
	cargoDrawing.style.minWidth = '';
	cargoDrawing.style.minHeight = '';
	cargoWeight.textContent = '1 kg';
	dateInput.valueAsDate = new Date();
	finalCost.textContent = '37 UAH';
});

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

function createModal() {
	const modalBox = document.querySelector('.modal__box');
	modalBox.innerHTML = '';

	modalBox.insertAdjacentHTML(
		'afterbegin',
		`
    <p class="recipient__city">Recipient city: <span class="modal-span"> ${answers.city}</span></p>
    <p class="recipient__name">Full name: <span class="modal-span">${answers.name} ${answers.surname}</span></p>
    <p class="recipient__phone">Phone: <span class="modal-span">${answers.phone}</span></p>
    <p class="comments">Comments: <span class="modal-span">${answers.comments}</span></p>
    <div class="cargo__info-box">
      <span class="cargo__width cargo__span">Cargo width: <span class="modal-span">${answers.width}m</span></span>
      <span class="cargo__height cargo__span">Cargo height: <span class="modal-span">${answers.height}m</span></span>
      <span class="cargo__weight cargo__span">Cargo weight: <span class="modal-span">${answers.weight}kg</span></span>
    </div>
    <p class="delivery-date">Delivery date is: <span class="modal-span">${dateInput.value}</span></p>
    <p class="delivery-time">Delivery time is: <span class="modal-span">${timeInput.value}</span></p>
    <div class="modal__buttons">
      <button type="submit" form='DeliveryForm' class="modal__submit button">Submit</button>
      <button class="modal__cancel button">Cancel</button>
    </div>
  `
	);
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
	if (!dateInput.value) {
		dateInput.valueAsDate = today;
	}
	const afterThreeDays = new Date(today.setDate(today.getDate() + 3));
	let day = afterThreeDays.getDate();

	if (afterThreeDays.getDate() < 10) {
		day = `0${afterThreeDays.getDate()}`;
	}
	const deliweryDay = `${afterThreeDays.getFullYear()}-${
		afterThreeDays.getMonth() + 1
	}-${day}`;
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
	const surnameInput = document.querySelector('#SurnameInput');
	const phoneInput = document.querySelector('#PhoneInput');
	const commentsInput = document.querySelector('.comment__input');
	const hour = +timeInput.value.split(':')[0];
	const parseInputDate = Date.parse(dateInput.value);
	const parseDeliveryDate = Date.parse(getDeliveryDate());

	answers.city = citiesInput.value;
	answers.name = nameInput.value;
	answers.surname = surnameInput.value;
	answers.phone = phoneInput.value;
	answers.comments = commentsInput.value;
	answers.width = +cargoWidthInp.value;
	answers.height = +cargoHeightInp.value;
	answers.weight = parseInt(cargoWeight.textContent);
	answers.date = parseInputDate >= parseDeliveryDate ? dateInput.value : '';
	answers.time = hour >= 9 && hour <= 18 ? timeInput.value : '';
	answers.price = parseInt(finalCost.textContent);
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
		undoError(citiesInput, err);
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

function surnameInputValidation() {
	const surnameInput = document.querySelector('#SurnameInput');
	const err = document.querySelector('.surname__error');
	if (!surnameInput.value) {
		showInputErr(surnameInput, err);
	} else {
		undoError(surnameInput, err);
	}
}

function phoneInputValidation() {
	const err = document.querySelector('.phone__error');
	if (phoneMask.value.length !== 17) {
		showInputErr(phoneMask, err);
	} else {
		undoError(phoneMask, err);
	}
}

function dateInputValidation() {
	const err = document.querySelector('.date__error');

	if (+getDeliveryDate().split('-')[2] > +dateInput.value.split('-')[2]) {
		showInputErr(dateInput, err);
		err.textContent = dateInput.validationMessage;
		return;
	} else {
		undoError(dateInput, err);
	}
}

function timeInputValidation() {
	const err = document.querySelector('.time__error');
	const inputHour = +timeInput.value.split(':')[0];

	if (inputHour < 9 || inputHour > 18) {
		showInputErr(timeInput, err);
	} else {
		undoError(timeInput, err);
	}
}

function showInputErr(input, err) {
	input.style.borderColor = 'red';
	err.style.display = 'inline-block';
	input.focus();
}

function undoError(input, err) {
	input.style.outline = '';
	err.style.display = '';
}

function createJsonStringify(obj) {
	return JSON.stringify(obj);
}

const maskOptions = {
	mask: '+{38}(000)000-00-00',
};
const mask = IMask(phoneMask, maskOptions);
