import {enableForm, disableForm, setFilterChange} from './form.js';
import {initValidation} from './validation.js';
import {initBooking, updatePins} from './map.js';
import { getData } from './api.js';
import './picture-upload.js';
import { initSlider } from './slider.js'
import {filterOffers} from './filters.js';
import {debounce} from './utils.js';
import {setUserFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const MAX_PINS = 10;

disableForm();


initBooking (() => {
  enableForm();
  initValidation();
  initSlider();
  setUserFormSubmit(
    showSuccessMessage, showErrorMessage
  );
  getData((data) => {
    const renderPins = () => {
      const filteredAds = filterOffers(data);
      updatePins(filteredAds.slice(0, MAX_PINS));
    };

    renderPins();
    setFilterChange(debounce(() => {
      renderPins();
    }));
  });
});

