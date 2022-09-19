import { validateElement } from './validation.js';

const  Price = {
  MIN: 0,
  MAX: 100000,
};

const Slider = {
  START: 1000,
  STEP: 100,
};

const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('[name="price"]');

export const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Price.MIN,
      max: Price.MAX,
    },
    start: Slider.START,
    step: Slider.STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return value;
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
    validateElement(priceField);
  });
};

export const resetSlider = () => {
  sliderElement.noUiSlider.set(Slider.START);
};

export const setSliderState = (enabled) => {
  if (enabled) {
    sliderElement.removeAttribute('disabled');
  } else {
    sliderElement.setAttribute('disabled', true);
  }
};

const updateSliderValue = (value) => {
  if (!sliderElement.noUiSlider) {
    return;
  }

  sliderElement.noUiSlider.set(value ? value : Price.MIN);

  if (priceField.value !== value) {
    priceField.value = value;
    validateElement(priceField);
  }};

priceField.addEventListener('change', () => {
  updateSliderValue(priceField.value);
});

