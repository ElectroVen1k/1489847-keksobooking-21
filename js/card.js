'use strict';
(function () {
  const filterAnnouncemets = document.querySelector('.map__filters-container');
  const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  const CARD_PHOTO_HEIGHT = 40;
  const CARD_PHOTO_WIDTH = 45;

  const typeHouseMap = {
    'bungalow': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  const featuresClassMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner',
  };

  const cardFeatures = function (container, announcement) {
    const countFeatures = announcement.offer.features.length;
    container.innerHTML = '';

    for (let i = 0; i < countFeatures; i++) {
      let feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(featuresClassMap[announcement.offer.features[i]]);

      container.appendChild(feature);
    }
  };

  const cardPhotos = function (container, announcement) {
    const countPhotos = announcement.offer.photos.length;
    container.innerHTML = '';

    for (let i = 0; i < countPhotos; i++) {
      let photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = announcement.offer.photos[i];
      photo.width = CARD_PHOTO_WIDTH;
      photo.height = CARD_PHOTO_HEIGHT;

      container.appendChild(photo);
    }
  };

  const createCard = function (announcement) {
    const card = cardTemplate.cloneNode(true);
    const featuresContainer = card.querySelector('.popup__features');
    const photosContainer = card.querySelector('.popup__photos');
    const closeCardButton = card.querySelector('.popup__close');

    card.querySelector('.popup__avatar').src = announcement.author.avatar;
    card.querySelector('.popup__title').textContent = announcement.offer.title;
    card.querySelector('.popup__text--address').textContent = announcement.offer.address + '.';
    card.querySelector('.popup__text--price').textContent = announcement.offer.price + 'P / ночь.';
    card.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout + '.';
    card.querySelector('.popup__type').textContent = typeHouseMap[announcement.offer.type];
    card.querySelector('.popup__description').textContent = announcement.offer.description;
    cardFeatures(featuresContainer, announcement);
    cardPhotos(photosContainer, announcement);
    closeCardButton.addEventListener('click', window.removeCard);

    return card;
  };

  const renderCurrentCard = function (announcement) {
    const currentCard = createCard(announcement);

    window.removeCard();
    filterAnnouncemets.before(currentCard);
    document.addEventListener('keydown', onEscPress);
  };

  window.removeCard = function () {
    const currentCard = document.querySelector('.map__card');
    const currentPin = document.querySelector('.map__pin--active');

    if (currentCard) {
      currentCard.remove();
      document.removeEventListener('keydown', onEscPress);
    }

    if (currentPin) {
      currentPin.classList.add('map__pin');
      currentPin.classList.remove('map__pin--active');
    }

  };

  const onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      window.removeCard();
    }
  };

  window.cardHandler = function (target, announcement) {
    const renderCard = function () {
      renderCurrentCard(announcement);
      target.classList.remove('map__pin');
      target.classList.add('map__pin--active');
    };

    target.addEventListener('click', renderCard);
  };
}());
