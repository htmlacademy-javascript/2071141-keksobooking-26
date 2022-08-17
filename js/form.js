const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = document.querySelector('.ad-form-header');
const adFormFieldSetElements = document.querySelectorAll('.ad-form__element');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('.map__filter');
const mapFeaturesElement = document.querySelector('.map__features');

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

export const enableForm = () => {
  setForm(true);
};

export const disableForm = () => {
  setForm(false);
};
