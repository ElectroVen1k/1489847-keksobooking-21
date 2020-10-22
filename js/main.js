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
  if (typeof evt === 'object' && evt.button === 0) {
    enablePage();
    createAddress();
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
const roomQuantityInput = newAnnouncementForm.querySelector('#room_number');
const guestQuantityInput = newAnnouncementForm.querySelector('#capacity');

const priceForTypeHousingMap = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

const validPrice = function () {
  const typeHouse = typeHousingInput.value;
  nightPriceInput.setAttribute('min', priceForTypeHousingMap[typeHouse]);
  nightPriceInput.setAttribute('placeholder', priceForTypeHousingMap[typeHouse]);
};

const validTimeOut = function () {
  timeOutInput.value = timeInInput.value;
};

const validTimeIn = function () {
  timeInInput.value = timeOutInput.value;
};

const roomToGuestQuantityMap = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const roomCustomValidityMap = {
  1: 'Только для 1 гостя',
  2: 'Максимум для 2 гостей',
  3: 'Максимум для 3 гостей',
  100: 'Такой выбор не для гостей'
};

const validGuestQuantity = function () {
  const guestQuantityList = guestQuantityInput.children;
  for (let item of guestQuantityList) {
    const itemValue = Number(item.value);
    const isGuestFitInRoom = roomToGuestQuantityMap[roomQuantityInput.value].indexOf(itemValue) !== -1;
    item.style.display = isGuestFitInRoom ? 'block' : 'none';
  }
};

const guestCustomValidity = function () {
  const guestCount = Number(guestQuantityInput.value);
  const isGuestFitInRoom = roomToGuestQuantityMap[roomQuantityInput.value].indexOf(guestCount) === -1;
  if (isGuestFitInRoom) {
    guestQuantityInput.setCustomValidity(roomCustomValidityMap[roomQuantityInput.value]);
  } else {
    guestQuantityInput.setCustomValidity('');
  }
};

const newAnnouncementFormValiadtion = function () {
  guestQuantityInput.addEventListener('change', guestCustomValidity);
  roomQuantityInput.addEventListener('change', guestCustomValidity);
  roomQuantityInput.addEventListener('change', validGuestQuantity);
  timeOutInput.addEventListener('change', validTimeIn);
  timeInInput.addEventListener('change', validTimeOut);
  typeHousingInput.addEventListener('change', validPrice);
};
