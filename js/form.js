import {resetMap} from './map.js';
import { sendData } from './api.js';
import { resetValidation, checkFormValidation } from './validation.js';
import {resetSlider, setSliderState } from './slider.js';
import { pictureReset } from './picture-upload.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = document.querySelector('.ad-form-header');
const adFormFieldSetElements = document.querySelectorAll('.ad-form__element');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const mapFeaturesElement = document.querySelector('.map__features');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const setForm = (condition) => {
  adFormElement.classList.toggle('ad-form--disabled', !condition);
  adFormHeaderElement.disabled = !condition;
  adFormFieldSetElements.forEach((item) => {
    item.disabled = !condition;
  });
  setSliderState(condition);

};

const setFilter = (condition) => {
  mapFiltersElement.classList.toggle('map__filters--disabled', !condition);
  mapFilterElements.forEach((item)=> {
    item.disabled = !condition;
  });
  mapFeaturesElement.disabled = !condition;
};

const enableForm = () => {
  setForm(true);
  setFilter(true);
};

const disableForm = () => {
  setForm(false);
  setFilter(false);
};

const resetForm = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  resetMap();
  resetValidation();
  resetSlider();
  pictureReset();
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

const setUserFormSubmit = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = checkFormValidation;
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccessMessage();
          resetForm();
          unblockSubmitButton();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const setFilterChange = (cb) => {
  mapFiltersElement.addEventListener('change', (evt) => {
    if (evt.target.closest('.map__filter') || evt.target.closest('.map__features')) {
      cb();
    }
  });
};

export {setUserFormSubmit, enableForm, disableForm, setFilterChange, resetForm};
