const offerTypes = {
  flat: 'Квартра',
  bungalow: 'Бунгало',
  house: 'Дом',
  palase: 'Дворец',
  hotel: 'Отель',
};

const renderFeatures = (block, features) => {
  block.forEach((featureListItem) => {
    const isNecessary = features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));

    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const renderPhotos = (block, item, photos) => {
  photos.forEach((picture) => {
    const photoTemplate = item.cloneNode(true);
    photoTemplate.src = picture;
    block.appendChild(photoTemplate);
  });
};

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createPopup = ({author, offer}) => {
  const similarOffer = offerCardTemplate.cloneNode(true);
  const featuresContainer = similarOffer.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = similarOffer.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const description = similarOffer.querySelector('.popup__description');

  if (offer.features.length > 1) {
    renderFeatures(featuresList, offer.features);
  } else {
    featuresList.classList.add('hidden');
  }

  if (offer.photos) {
    renderPhotos(photosContainer, photoItem, offer.photos);
  } else {
    photosContainer.classList.add('hidden');
  }

  photoItem.remove();

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add('hidden');
  }

  similarOffer.querySelector('.popup__avatar').src = author.avatar;
  similarOffer.querySelector('.popup__title').textContent = offer.title;
  similarOffer.querySelector('.popup__text--address').textContent = offer.address;
  similarOffer.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  similarOffer.querySelector('.popup__type').textContent = offerTypes[offer.type];
  similarOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return similarOffer;
};

export {createPopup};
