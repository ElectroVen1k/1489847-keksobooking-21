'use strict';
(function () {
  const filterAnnouncementForm = document.querySelector('.map__filters');
  const typeSelectElement = filterAnnouncementForm.querySelector('#housing-type');
  const priceSelectElement = filterAnnouncementForm.querySelector('#housing-price');
  const roomsSelectElement = filterAnnouncementForm.querySelector('#housing-rooms');
  const guestsSelectElement = filterAnnouncementForm.querySelector('#housing-guests');
  const featuresInputs = filterAnnouncementForm.querySelectorAll('[type=checkbox]');
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

  const getNeededFeatures = function () {
    const neededFeaturesList = [];
    for (let feature of featuresInputs) {
      if (feature.checked) {
        neededFeaturesList.push(feature);
      }
    }
    return neededFeaturesList;
  };

  const createAppropriateAnnouncemetMap = function (announcement) {
    const neededFeaturesList = getNeededFeatures();
    let appropriateAnnouncemetMap = [];
    for (let i = 0; i < neededFeaturesList.length; i++) {
      if (announcement.offer.features.indexOf(neededFeaturesList[i].value) !== -1) {
        appropriateAnnouncemetMap[i] = true;
      } else {
        appropriateAnnouncemetMap[i] = false;
      }
    }
    return appropriateAnnouncemetMap;
  };

  const createFilteredList = function () {
    const filteredTypeList = window.newAnnouncementList.filter(function (announcement) {
      return announcement.offer.type === typeSelectElement.value ||
      typeSelectElement.value === 'any';
    });

    const filteredPriceList = filteredTypeList.filter(function (announcement) {
      if (priceSelectElement.value === 'low') {
        return announcement.offer.price < LOW_PRICE;
      } else if (priceSelectElement.value === 'middle') {
        return announcement.offer.price > LOW_PRICE && announcement.offer.price < HIGH_PRICE;
      } else if (priceSelectElement.value === 'high') {
        return announcement.offer.price > HIGH_PRICE;
      } else {
        return priceSelectElement.value === 'any';
      }
    });

    const filteredRoomsList = filteredPriceList.filter(function (announcement) {
      return Number(announcement.offer.rooms) === Number(roomsSelectElement.value) ||
      roomsSelectElement.value === 'any';
    });

    const filteredGuestsList = filteredRoomsList.filter(function (announcement) {
      return Number(announcement.offer.guests) === Number(guestsSelectElement.value) ||
      guestsSelectElement.value === 'any';
    });

    const filteredFeaturesList = filteredGuestsList.filter(function (announcement) {
      const appropriateAnnouncemetMap = createAppropriateAnnouncemetMap(announcement);
      return appropriateAnnouncemetMap.indexOf(false) === -1;
    });

    return filteredFeaturesList;
  };

  const renderFilteredList = function () {
    window.createPins(createFilteredList());
  };

  const filterOut = function () {
    window.debouce(renderFilteredList);
    window.removeCard();
  };

  filterAnnouncementForm.addEventListener('change', filterOut);
})();
