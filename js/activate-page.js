'use strict';
(function () {
  const announcementMapElement = document.querySelector('.map');
  const mainPin = document.querySelector('.map__pin--main');
  const newAnnouncementForm = document.querySelector('.ad-form');
  const filterAnnouncementForm = document.querySelector('.map__filters');
  const addressInput = newAnnouncementForm.querySelector('#address');
  const resetPageButton = document.querySelector('.ad-form__reset');
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
    newAnnouncementForm.classList.remove('ad-form--disabled');
    window.createPins(window.newAnnouncementList);
    window.newAnnouncementFormValiadtion();
    mainPin.removeEventListener('keydown', onMainPinPressEnter);
    resetPageButton.addEventListener('click', window.resetPage);
  };

  window.onMainPinMousedown = function (evt) {
    if (typeof evt === 'object' && evt.button === 0) {
      enablePage();
      window.createAddress();
    }
  };

  const onMainPinPressEnter = function (evt) {
    if (evt.key === 'Enter') {
      enablePage();
    }
  };

  disableActiveElement();
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

  window.createAddress = function () {
    const coordinates = getСoordinatesPin();
    const xCoordite = coordinates.x + MAIN_PIN_WIDTH / 2;
    const yCoordite = coordinates.y + MAIN_PIN_HEIGHT + MAIN_PIN_ARROWHEAD;
    addressInput.value = xCoordite + ', ' + yCoordite;
  };

  window.resetPage = function () {
    newAnnouncementForm.reset();
    filterAnnouncementForm.reset();
    announcementMapElement.classList.add('map--faded');
    newAnnouncementForm.classList.add('ad-form--disabled');
    disableActiveElement();
    createPrimaryAddress();
    window.removeCard();
    window.removeOldPins();
    window.returnMainPin();
  };
})();
