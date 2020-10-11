'use strict';

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

announcementMapElement.classList.remove('map--faded');

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
