'use strict';
(function () {
  const newAnnouncementForm = document.querySelector('.ad-form');
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

  window.newAnnouncementFormValiadtion = function () {
    guestQuantityInput.addEventListener('change', guestCustomValidity);
    roomQuantityInput.addEventListener('change', guestCustomValidity);
    roomQuantityInput.addEventListener('change', validGuestQuantity);
    timeOutInput.addEventListener('change', validTimeIn);
    timeInInput.addEventListener('change', validTimeOut);
    typeHousingInput.addEventListener('change', validPrice);
  };
})();
