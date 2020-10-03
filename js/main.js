'use strict';

const announcementMap = document.querySelector('.map');
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

announcementMap.classList.remove('map--faded');

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
  return Math.floor(Math.random() * (max - min)) + min;
};

let avatarsQuantity = ANNOUNCEMENTS_QUANTITY;

const getAvatar = function () {
  const avatar = 'img/avatars/user0' + avatarsQuantity + '.png';
  avatarsQuantity = avatarsQuantity - 1;
  return avatar;
};

const getFeatures = function () {
  let features = [];
  let featuresList = Object.assign([], ANNOUNCEMENT_FEATURES_LIST);

  for (let i = 0; i < getRandom(1, ANNOUNCEMENT_FEATURES_LIST.length); i++) {
    let j = getRandom(0, featuresList.length);

    features.push(featuresList[j]);
    featuresList.splice(j, 1);
  }
  return features;
};

const getPhotos = function () {
  let photos = [];
  let photosList = Object.assign([], ANNOUNCEMENT_PHOTOS_LIST);

  for (let i = 0; i < getRandom(1, ANNOUNCEMENT_PHOTOS_LIST.length); i++) {
    let j = getRandom(0, photosList.length);

    photos.push(photosList[j]);
    photosList.splice(j, 1);
  }
  return photos;
};

const getAnnouncement = function () {
  const announcement = Object.assign({}, announcementParametrs);
  announcement.author.avatar = getAvatar();
  announcement.location.x = getRandom(1, ANNOUNCEMENT_MAP_WIDTH);
  announcement.location.y = getRandom(PIN_Y_START, PIN_Y_END);
  announcement.offer.address = announcement.location.x + ', ' + announcement.location.y;
  announcement.offer.features = getFeatures();
  announcement.offer.photos = getPhotos();
  return announcement;
};

const getAnnouncementElement = function (announcement) {
  const pinElement = templatePin.cloneNode(true);
  pinElement.style.left = announcement.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = announcement.author.avatar;
  pinElement.querySelector('img').alt = announcement.offer.title;
  return pinElement;
};

const fragmentPins = document.createDocumentFragment();

const getAnnouncementPins = function (quantity) {
  for (let i = 0; i < quantity; i++) {
    const announcement = getAnnouncement();
    const announcementPin = getAnnouncementElement(announcement);
    fragmentPins.appendChild(announcementPin);
  }
  return fragmentPins;
};

const announcementsPin = getAnnouncementPins(ANNOUNCEMENTS_QUANTITY);

announcementPinsBlock.appendChild(announcementsPin);
