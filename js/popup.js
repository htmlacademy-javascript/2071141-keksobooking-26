const offerTypes = {
  flat: 'Квартра',
  bungalow: 'Бунгало',
  house: 'Дом',
  palase: 'Дворец',
  hotel: 'Отель',
};

const offerCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const createPopup = ({author, offer}) => {
  const similarOffer = offerCardTemplate.cloneNode(true);
  const featuresList = similarOffer.querySelector('.popup__features');
  const photosContainer = similarOffer.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');
  const descriptionElement = similarOffer.querySelector('.popup__description');

  if (offer.features) {
    offer.features.forEach((feature) => {
      const el = document.createElement('li');
      el.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresList.append(el);
    });
  }

  if (!offer.description) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = offer.description;
  }

  if (offer.photos) {
    offer.photos.forEach((src) => {
      const cardPhoto = photoItem.cloneNode(true);
      cardPhoto.src = src;
      photosContainer.append(cardPhoto);
    });
  }

  photosContainer.innerHTML = '';
  similarOffer.querySelector('.popup__avatar').src = author.avatar;
  similarOffer.querySelector('.popup__title').textContent = offer.title;
  similarOffer.querySelector('.popup__text--address').textContent = offer.address;
  similarOffer.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  similarOffer.querySelector('.popup__type').textContent = offerTypes[offer.type];
  similarOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  similarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return similarOffer;
};
