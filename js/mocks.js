import { getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement } from './utils.js';

const Price = {
  MIN: 500,
  MAX: 2000
};

const Rooms = {
  MIN: 1,
  MAX: 5
};

const Guests = {
  MIN: 1,
  MAX: 5
};

const Location ={
  LAT_MAX: 35.65000,
  LAT_MIN: 35.70000,
  LNG_MAX: 139.70000,
  LNG_MIN: 139.80000,
  DIGITS: 5
};

const OFFERS = 10;

const TITLES = ['title1', 'title2', 'title3', 'title4', 'title4'];

const TYPE = ['palase', 'flat', 'house', 'bungalow', 'hotel'];

const CHECK = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getBooking = (index) => {
  const lat = getRandomPositiveFloat (Location.LAT_MIN, Location.LAT_MIN, Location.DIGITS);
  const lng = getRandomPositiveFloat (Location.LNG_MAX, Location.LNG_MIN, Location.DIGITS);
  return {
    author : {
      avatar : `img/avatars/user${index}.png`,
    },

    offer : {
      title: getRandomArrayElement(TITLES),
      adress: `${lat}, ${lng}`,
      price: getRandomPositiveInteger (Price.MIN, Price.MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(Rooms.MIN, Rooms.MAX),
      guests: getRandomPositiveInteger(Guests.MIN, Guests.MAX),
      checkin: getRandomArrayElement(CHECK),
      checkout: getRandomArrayElement(CHECK),
      features: getRandomArrayElement(FEATURES), //несколько значений
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },

    location: {
      lat, lng },
  };
};

const getMultipleBookings = () => new Array(OFFERS).fill('').map((_, index) => getBooking(index + 1));

console.log(getBooking(1));

console.log(getMultipleBookings());

export {getMultipleBookings};
