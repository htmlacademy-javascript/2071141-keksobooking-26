const Price = {
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
};

const filtersContainer = document.querySelector('.map__filters');
const typeFilterElement = filtersContainer.querySelector('#housing-type');
const priceFilterElement = filtersContainer.querySelector('#housing-price');
const roomsFilterElement = filtersContainer.querySelector('#housing-rooms');
const guestsFilterElement = filtersContainer.querySelector('#housing-guests');
const housingFeaturesElement = filtersContainer.querySelector('#housing-features');

const compareAds = (adA, adB) => {
  const rankA = adA.offer.features ? adA.offer.features.length : 0;
  const rankB = adB.offer.features ? adB.offer.features.length : 0;

  return rankB - rankA;
};

const checkType = (ad) => typeFilterElement.value ==='any' || ad.offer.type === typeFilterElement.value;

const checkPrice = (ad) => {
  if (priceFilterElement.value === 'any') {
    return true;
  }

  if (!(priceFilterElement.value in Price)) {
    return true;
  }

  const currentPriceFilter = Price[priceFilterElement.value];
  return ad.offer.price >= currentPriceFilter.MIN && ad.offer.price <= currentPriceFilter.MAX;
};
const checkRooms = (ad) => roomsFilterElement.value === 'any' || ad.offer.rooms === parseInt(roomsFilterElement.value, 10);
const checkGuests = (ad) => guestsFilterElement.value === 'any' || ad.offer.guests === parseInt(guestsFilterElement.value, 10);
const checkFeatures = (ad, activeFeatureFilters) => {
  if (!activeFeatureFilters.length) {
    return true;
  }

  if (!ad.offer.features || !ad.offer.features.length) {
    return false;
  }

  return activeFeatureFilters.every((featureFilter) => ad.offer.features.includes(featureFilter));
};

export const filterOffers = (ads) => {
  const activeFeatureFilters = Array.from(housingFeaturesElement)
    .filter((feature) => feature.checked)
    .map((feature) => feature.value);
  const result = ads
    .filter((ad) => checkType(ad)
      && checkPrice(ad)
      && checkRooms(ad)
      && checkGuests(ad)
      && checkFeatures(ad, activeFeatureFilters)
    );

  return result.sort(compareAds);
};
