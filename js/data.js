'use strict';
(function () {
  const ANNOUNCEMENT_MAP_WIDTH = 1200;
  const PIN_Y_START = 130;
  const PIN_Y_END = 630;
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

  window.getAnnouncement = function () {
    const announcement = Object.assign({}, announcementParametrs);
    announcement.author.avatar = getAvatar(avatarsId);
    announcement.location.x = window.utils.getRandom(1, ANNOUNCEMENT_MAP_WIDTH);
    announcement.location.y = window.utils.getRandom(PIN_Y_START, PIN_Y_END);
    announcement.offer.address = announcement.location.x + ', ' + announcement.location.y;
    announcement.offer.features = window.utils.createMixedList(ANNOUNCEMENT_FEATURES_LIST);
    announcement.offer.photos = window.utils.createMixedList(ANNOUNCEMENT_PHOTOS_LIST);
    return announcement;
  };

})();
