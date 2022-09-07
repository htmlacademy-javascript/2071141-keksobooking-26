import {resetMap} from './map.js';
import { sendData } from './api.js';
import { showAlert } from './utils.js';
import { pristine } from './validation.js';

const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = document.querySelector('.ad-form-header');
const adFormFieldSetElements = document.querySelectorAll('.ad-form__element');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const mapFeaturesElement = document.querySelector('.map__features');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const setForm = (isActive) => {
  adFormElement.classList.toggle('ad-form--disabled', !isActive);
  adFormHeaderElement.disabled = !isActive;
  adFormFieldSetElements.forEach((item) => {
    item.disabled = !isActive;
  });
  mapFiltersElement.classList.toggle('map__filters--disabled', !isActive);
  mapFilterElements.forEach((item)=> {
    item.disabled = !isActive;
  });
  mapFeaturesElement.disabled = !isActive;
};

const enableForm = () => {
  setForm(true);
};

const disableForm = () => {
  setForm(false);
};

const resetForm = () => {
  adFormElement.reset();
  mapFilterElements.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю данные...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setUserFormSubmit = (onSuccess) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, enableForm, disableForm};
