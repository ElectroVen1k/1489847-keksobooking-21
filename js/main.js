'use strict';
(function () {
  const MAX_ANNOUNCEMENTS_QUANTITY = 5;
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

    window.cardHandler(pinElement, announcement);

    return pinElement;

  };

  window.createPins = function (list) {
    const fragmentPins = document.createDocumentFragment();

    const getAnnouncementPins = function () {
      const quantity = list.length < MAX_ANNOUNCEMENTS_QUANTITY
        ? list.length
        : MAX_ANNOUNCEMENTS_QUANTITY;

      for (let i = 0; i < quantity; i++) {
        const announcement = list[i];
        const announcementPin = getAnnouncementElement(announcement);
        fragmentPins.appendChild(announcementPin);
      }
      return fragmentPins;
    };

    const announcementPins = getAnnouncementPins();

    announcementPinsBlock.innerHTML = '';
    announcementPinsBlock.appendChild(announcementPins);
  };
})();
