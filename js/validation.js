const Headline = {
  MIN: 30,
  MAX: 100
};

const MAX_PRICE = 100000;

const MinPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const adForm = document.querySelector('.ad-form');
const headlineElement = adForm.querySelector('#title');
const pricePerNight = adForm.querySelector('#price');
const typeOfHousing = adForm.querySelector('#type');
const numberOfRooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const pristine = new Pristine (adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, true);

const resetValidation = () => pristine.reset();

const headlineValidation = (value) => value.length >= Headline.MIN && value.length <= Headline.MAX;
const headlineErrorMessage = () => `Введите от ${Headline.MIN} до ${Headline.MAX} символов`;
pristine.addValidator(headlineElement, headlineValidation, headlineErrorMessage);

const priceValidation = (value) => value <= MAX_PRICE && value >= MinPrice[typeOfHousing.value];
const priceErrorMessage = () => `Введите стоимость не меньше ${MinPrice[typeOfHousing.value]} и не больше ${MAX_PRICE}`;
pristine.addValidator(pricePerNight, priceValidation, priceErrorMessage);

const capacityValidation = () => RoomsCapacity[+numberOfRooms.value].includes(+capacity.value);
const capacityErrorMessage = () => 'Неверное значение'; //Нужно доработать
pristine.addValidator (capacity, capacityValidation, capacityErrorMessage);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


const initValidation = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};


export {initValidation, resetValidation ,pristine};
