const sliderElement = document.querySelector('.ad-form__slider');
const priceFieldElement = document.querySelector('#price');
const MAX_PRICE = 100000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 5000,
  step: 100,
  connect: 'lower',
  format: {
    to: function(value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});
//console.log(sliderElement.noUiSlider);

sliderElement.noUiSlider.on('update', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
});

export const resetSlider = () => {
  sliderElement.noUiSlider.set(5000);
};
