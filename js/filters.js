const DEFAULT_VALUE = 'any';
const MAX_ADS = 10;
const AdsPrice = {
  'low' : {
    MIN: 0,
    MAX: 10000,
  },
  'mid' : {
    MIN: 10000,
    MAX: 50000,
  },
  'high' : {
    MIN: 50000,
    MAX: 1000000
  },
  'any' : {
    MIN: 0,
    MAX: 1000000,
  }
};

const filtersContainer = document.querySelector('.map__filters');
const typeFilterElement = filtersContainer.querySelector('#housing-type');
const priceFilterElement = filtersContainer.querySelector('#housing-price');
const roomsFilterElement = filtersContainer.querySelector('#housing-rooms');
const guestsFilterElement = filtersContainer.querySelector('#housing-guests');

const selectFeaturesCheckbox = () => Array.from(document.querySelectorAll('input[name="features"]:checked')).map((cb) => cb.value);

console.log(selectFeaturesCheckbox());

const checkType = (ad) => typeFilterElement.value ===DEFAULT_VALUE || ad.offer.type === typeFilterElement.value;
const checkPrice = (ad) => {
  if (priceFilterElement.value === DEFAULT_VALUE) {
    return true;
  }
  if (!(priceFilterElement.value in AdsPrice)) {
    return true;
  }
  const currentPriceFilter = AdsPrice[priceFilterElement.value];
  return ad.offer.price >= currentPriceFilter.MIN && ad.offer.price <= currentPriceFilter.MAX;
};
const checkRooms = (ad) =>
  roomsFilterElement.value === DEFAULT_VALUE || ad.offer.rooms === parseInt(roomsFilterElement.value, MAX_ADS);
const checkGuests = (ad) =>
  guestsFilterElement.value === DEFAULT_VALUE || ad.offer.guests === parseInt(guestsFilterElement.value, MAX_ADS);
const checkFeatures = (ad) => {
  const adFeatures = ad.offer.features;
  const selectFeatures = selectFeaturesCheckbox();
  if (selectFeatures.length === 0) {
    return true;
  }
  if (adFeatures){
    return selectFeatures.every((feature) => adFeatures.includes(feature));
  }
  return false;
};

console.log(checkFeatures());

export const getFilterOffers = (ads) => {
  const type = checkType.value;
  const price = checkPrice.value;
  const rooms = checkRooms.value;
  const guests = checkGuests.value;

  return checkType(ads, type) && checkPrice(ads, price) && checkRooms(ads, rooms) && checkGuests(ads, guests) && checkFeatures(ads);
};
