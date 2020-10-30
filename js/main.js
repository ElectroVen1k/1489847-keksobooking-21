'use strict';
(function () {
  const ANNOUNCEMENTS_QUANTITY = 6;
  const PIN_HEIGHT = 66;
  const PIN_WIDTH = 50;
  const templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  const announcementPinsBlock = document.querySelector('.map__pins');

  const getAnnouncementElement = function (announcement) {
    const pinElement = templatePin.cloneNode(true);
    const pinImage = pinElement.querySelector('img');

    pinElement.style.left = announcement.location.x - PIN_WIDTH + 'px';
    pinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
    pinImage.src = announcement.author.avatar;
    pinImage.alt = announcement.offer.title;
    return pinElement;
  };

  window.createPins = function () {
    const fragmentPins = document.createDocumentFragment();

    const getAnnouncementPins = function (quantity) {
      for (let i = 0; i < quantity; i++) {
        const announcement = window.newAnnouncementList[i];
        const announcementPin = getAnnouncementElement(announcement);
        fragmentPins.appendChild(announcementPin);
      }
      return fragmentPins;
    };

    const announcementPins = getAnnouncementPins(ANNOUNCEMENTS_QUANTITY);

    announcementPinsBlock.appendChild(announcementPins);
  };
})();
