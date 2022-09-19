import {enableForm, disableForm, setFilterChange} from './form.js';
import {initValidation} from './validation.js';
import {initMap, updatePins} from './map.js';
import { getData } from './api.js';
import './picture-upload.js';
import {initSlider} from './slider.js';
import {getFilterOffers} from './filters.js';
import {debounce} from './utils.js';
import {setUserFormSubmit} from './form.js';


const MAX_PINS = 10;

disableForm();

const renderPins = (data) => {
  const filteredAds = getFilterOffers(data);
  updatePins(filteredAds.slice(0, MAX_PINS));
};

initMap (() => {
  enableForm();
  initValidation();
  initSlider();
  setUserFormSubmit();
  getData((data) => {
    renderPins(data);
    setFilterChange(debounce(() => {
      renderPins(data);
    }));
  });
});
