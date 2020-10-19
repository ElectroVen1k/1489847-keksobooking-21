'use strict';
// Генерация объявлений
const announcementMapElement = document.querySelector('.map');
const ANNOUNCEMENT_MAP_WIDTH = 1200;
const ANNOUNCEMENTS_QUANTITY = 8;
const PIN_Y_START = 130;
const PIN_Y_END = 630;
const PIN_HEIGHT = 66;
const PIN_WIDTH = 50;
const templatePin = document.querySelector('#pin')
.content
.querySelector('.map__pin');
const announcementPinsBlock = document.querySelector('.map__pins');

const ANNOUNCEMENT_FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const ANNOUNCEMENT_PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const announcementParametrs = {
  author: {
    avatar: ''
  },
  offer: {
    title: 'Здесь будет заголовок объявления',
    address: '',
    price: '',
    type: '',
    rooms: '',
    guests: '',
    checkin: '',
    checkout: '',
    features: '',
    descriprion: '',
    photos: ''
  },
  location: {
    x: '',
    y: '',
  }
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let avatarsId = 1;

const getAvatar = function (Id) {
  let avatar = '';
  if (avatarsId < 10) {
    avatar = 'img/avatars/user0' + Id + '.png';
  } else {
    avatar = 'img/avatars/user' + Id + '.png';
  }
  avatarsId = avatarsId + 1;
  return avatar;
};

const createMixedList = function (originList) {
  const mixedList = [].concat(originList);
  const randomLength = getRandom(1, originList.length);

  for (let i = 0; i < randomLength; i++) {
    let j = getRandom(0, mixedList.length);
    if (j === mixedList.length) {
      j = j - 1;
    }
    mixedList.splice(j, 1);
  }
  return mixedList;
};

const getAnnouncement = function () {
  const announcement = Object.assign({}, announcementParametrs);
  announcement.author.avatar = getAvatar(avatarsId);
  announcement.location.x = getRandom(1, ANNOUNCEMENT_MAP_WIDTH);
  announcement.location.y = getRandom(PIN_Y_START, PIN_Y_END);
  announcement.offer.address = announcement.location.x + ', ' + announcement.location.y;
  announcement.offer.features = createMixedList(ANNOUNCEMENT_FEATURES_LIST);
  announcement.offer.photos = createMixedList(ANNOUNCEMENT_PHOTOS_LIST);
  return announcement;
};

const getAnnouncementElement = function (announcement) {
  const pinElement = templatePin.cloneNode(true);
  const pinImage = pinElement.querySelector('img');

  pinElement.style.left = announcement.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
  pinImage.src = announcement.author.avatar;
  pinImage.alt = announcement.offer.title;
  return pinElement;
};

const createPins = function () {
  const fragmentPins = document.createDocumentFragment();

  const getAnnouncementPins = function (quantity) {
    for (let i = 0; i < quantity; i++) {
      const announcement = getAnnouncement();
      const announcementPin = getAnnouncementElement(announcement);
      fragmentPins.appendChild(announcementPin);
    }
    return fragmentPins;
  };

  const announcementPins = getAnnouncementPins(ANNOUNCEMENTS_QUANTITY);

  announcementPinsBlock.appendChild(announcementPins);
};

// Активация страницы

const mainPin = document.querySelector('.map__pin');
const newAnnouncementForm = document.querySelector('.ad-form');
const filterAnnouncementForm = document.querySelector('.map__filters');
const addressInput = newAnnouncementForm.querySelector('#address');
const MAIN_PIN_WIDTH = 66;
const MAIN_PIN_HEIGHT = 66;
const MAIN_PIN_ARROWHEAD = 20;


const createfieldsetsList = function () {
  const firstFormList = newAnnouncementForm.children;
  const secondFormList = filterAnnouncementForm.children;
  const elementList = [];

  for (let item of firstFormList) {
    elementList.push(item);
  }

  for (let item of secondFormList) {
    elementList.push(item);
  }
  return elementList;
};

const elementList = createfieldsetsList();

const disableActiveElement = function () {
  for (let element of elementList) {
    element.setAttribute('disabled', 'disabled');
  }
};

const enableActiveElement = function () {
  for (let element of elementList) {
    element.removeAttribute('disabled');
  }
  addressInput.setAttribute('readonly', 'readonly');
};

const enablePage = function () {
  enableActiveElement();
  announcementMapElement.classList.remove('map--faded');
  createPins();
  newAnnouncementFormValiadtion();
  mainPin.removeEventListener('mousedown', onMainPinMousedown);
  mainPin.removeEventListener('keydown', onMainPinPressEnter);
};

const onMainPinMousedown = function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        enablePage();
        createAddress();
    }
  }
};

const onMainPinPressEnter = function (evt) {
  if (evt.key === 'Enter') {
    enablePage();
  }
};

disableActiveElement();
mainPin.addEventListener('mousedown', onMainPinMousedown);
mainPin.addEventListener('keydown', onMainPinPressEnter);

const getСoordinatesPin = function () {
  return {
    x: parseInt(mainPin.style.left, 10),
    y: parseInt(mainPin.style.top, 10)
  };
};

const createPrimaryAddress = function () {
  const coordinates = getСoordinatesPin();
  const xCoordite = coordinates.x + MAIN_PIN_WIDTH / 2;
  const yCoordite = coordinates.y + MAIN_PIN_HEIGHT;
  addressInput.value = xCoordite + ', ' + yCoordite;
};

createPrimaryAddress();

const createAddress = function () {
  const coordinates = getСoordinatesPin();
  const xCoordite = coordinates.x + MAIN_PIN_WIDTH / 2;
  const yCoordite = coordinates.y + MAIN_PIN_HEIGHT + MAIN_PIN_ARROWHEAD;
  addressInput.value = xCoordite + ', ' + yCoordite;
};

// Валидация

const typeHousingInput = newAnnouncementForm.querySelector('#type');
const nightPriceInput = newAnnouncementForm.querySelector('#price');
const timeInInput = newAnnouncementForm.querySelector('#timein');
const timeOutInput = newAnnouncementForm.querySelector('#timeout');
const roomQuantity = newAnnouncementForm.querySelector('#room_number');
const guestQuantity = newAnnouncementForm.querySelector('#capacity');

const validPrice = function () {
  if (typeHousingInput.value === 'bungalow') {
    nightPriceInput.setAttribute('min', '0');
    nightPriceInput.setAttribute('placeholder', '0');
  } else if (typeHousingInput.value === 'flat') {
    nightPriceInput.setAttribute('min', '1000');
    nightPriceInput.setAttribute('placeholder', '1000');
  } else if (typeHousingInput.value === 'house') {
    nightPriceInput.setAttribute('min', '5000');
    nightPriceInput.setAttribute('placeholder', '5000');
  } else if (typeHousingInput.value === 'palace') {
    nightPriceInput.setAttribute('min', '10000');
    nightPriceInput.setAttribute('placeholder', '10000');
  }
};

const validTimeOut = function () {
  if (timeInInput.value === '12:00') {
    timeOutInput.value = '12:00';
  } else if (timeInInput.value === '13:00') {
    timeOutInput.value = '13:00';
  } else if (timeInInput.value === '14:00') {
    timeOutInput.value = '14:00';
  }
};
const validTimeIn = function () {
  if (timeOutInput.value === '12:00') {
    timeInInput.value = '12:00';
  } else if (timeOutInput.value === '13:00') {
    timeInInput.value = '13:00';
  } else if (timeOutInput.value === '14:00') {
    timeInInput.value = '14:00';
  }
};

const validGuestQuantity = function () {
  const guestQuantityList = guestQuantity.children;

  if (roomQuantity.value === '1') {
    for (let item of guestQuantityList) {
      if (item.value !== '1') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  }

  if (roomQuantity.value === '2') {
    for (let item of guestQuantityList) {
      if (item.value !== '2' && item.value !== '1') {
        item.style.display = 'none';

      } else {
        item.style.display = 'block';
      }
    }
  }

  if (roomQuantity.value === '3') {
    for (let item of guestQuantityList) {
      if (item.value !== '3' && item.value !== '2' && item.value !== '1') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  }

  if (roomQuantity.value === '100') {
    for (let item of guestQuantityList) {
      if (item.value !== '0') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  }
};

const guestCustomValidity = function () {
  if (roomQuantity.value === '1' && guestQuantity.value !== '1') {
    guestQuantity.setCustomValidity('Только для 1 гостя');
  } else if (roomQuantity.value === '2' && guestQuantity.value !== '1' && guestQuantity.value !== '2') {
    guestQuantity.setCustomValidity('Максимум для 2 гостей');
  } else if (roomQuantity.value === '3' && guestQuantity.value === '0') {
    guestQuantity.setCustomValidity('Максимум для 3 гостей');
  } else if (roomQuantity.value === '100' && guestQuantity.value !== '0') {
    guestQuantity.setCustomValidity('Такой выбор не для гостей');
  } else {
    guestQuantity.setCustomValidity('');
  }
};

const newAnnouncementFormValiadtion = function () {
  guestQuantity.addEventListener('change', guestCustomValidity);
  roomQuantity.addEventListener('change', guestCustomValidity);
  roomQuantity.addEventListener('change', validGuestQuantity);
  timeOutInput.addEventListener('change', validTimeIn);
  timeInInput.addEventListener('change', validTimeOut);
  typeHousingInput.addEventListener('change', validPrice);
};
