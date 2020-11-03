'use strict';
(function () {
  const filterAnnouncementForm = document.querySelector('.map__filters');
  const typeSelectElement = filterAnnouncementForm.querySelector('#housing-type');
  // const priceSelectElement = filterAnnouncementForm.querySelector('#housing-price');
  // const roomsSelectElement = filterAnnouncementForm.querySelector('#housing-rooms');
  // const guestsSelectElement = filterAnnouncementForm.querySelector('#housing-guests');

  const filterOut = function () {
    const filteredList = window.newAnnouncementList.filter(function (announcement) {
      return announcement.offer.type === typeSelectElement.value;
    });

    window.createPins(filteredList);
  };

  filterAnnouncementForm.addEventListener('change', filterOut);
})();
