import {enableForm, disableForm} from './form.js';
import {initValidation} from './validation.js';
import {initMap, updatePins} from './map.js';
import { getData } from './api.js';

disableForm();

initMap (() => {
  enableForm();
  getData((data) => {
    updatePins(data.slice(0, 10));
    initValidation();
  });
});

