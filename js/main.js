import { getMultipleBookings } from './mocks.js';
import {createPopup} from './popup.js';
import {enableForm, disableForm} from './form.js';
import {initValidation} from './validation.js';
// import './validation.js';

const mapCanvas = document.querySelector('#map-canvas');

const bookings = getMultipleBookings();
const popup = createPopup(bookings[0]);

mapCanvas.appendChild(popup);

disableForm();
enableForm();

initValidation();
