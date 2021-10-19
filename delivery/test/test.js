'use ctrict';

// const dateInput = document.querySelector('.date');

// const today = new Date();

// const getDate = new Date(today.setDate(today.getDate() + 3));
// const deliweryDay = `${getDate.getFullYear()}-${
//   getDate.getMonth() + 1
// }-${getDate.getDate()}`;
// dateInput.setAttribute('min', deliweryDay);
const dateInput = document.querySelector('.date');
function getDeliveryDate() {
  const today = new Date();
  dateInput.valueAsDate = today;
  const afterThreeDays = new Date(today.setDate(today.getDate() + 3));
  const deliweryDay = `${afterThreeDays.getFullYear()}-${
    afterThreeDays.getMonth() + 1
  }-${afterThreeDays.getDate()}`;
  console.log(today);
  return deliweryDay;
}

dateInput.setAttribute('min', getDeliveryDate());

const timeInput = document.querySelector('.time');
