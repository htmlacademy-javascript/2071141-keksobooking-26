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

const createPopup = ({author, offer}) => {
  const similarOffer = offerCardTemplate.cloneNode(true);
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
