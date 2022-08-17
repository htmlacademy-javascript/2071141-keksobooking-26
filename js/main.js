import { getMultipleBookings } from './mocks.js';
import {createPopup} from './popup.js';
import {enableForm, disableForm} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const bookings = getMultipleBookings();
const popup = createPopup(bookings[0]);

mapCanvas.appendChild(popup);

disableForm();
enableForm();
