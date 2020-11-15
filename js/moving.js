'use strict';
(function () {
  let mainPin = document.querySelector('.map__pin--main');
  const MAIN_PIN_WIDTH = 66;
  const MAIN_PIN_HEIGHT = 66;
  const MAIN_PIN_ARROWHEAD = 20;
  const LEFT_EXTREME_COORD = 0 - MAIN_PIN_WIDTH / 2;
  const RIGHT_EXTREME_COORD = 1200 - MAIN_PIN_WIDTH / 2;
  const TOP_EXTREME_COORD = 130 - MAIN_PIN_HEIGHT - MAIN_PIN_ARROWHEAD;
  const BOTTOM_EXTREME_COORD = 630 - MAIN_PIN_HEIGHT - MAIN_PIN_ARROWHEAD;
  const PrimaryMainPinCoord = {
    x: 570,
    y: 375
  };


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.onMainPinMousedown(evt);

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const finalCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (finalCoords.y < TOP_EXTREME_COORD) {
        finalCoords.y = TOP_EXTREME_COORD;
      } else if (finalCoords.y > BOTTOM_EXTREME_COORD) {
        finalCoords.y = BOTTOM_EXTREME_COORD;
      }

      if (finalCoords.x < LEFT_EXTREME_COORD) {
        finalCoords.x = LEFT_EXTREME_COORD;
      } else if (finalCoords.x > RIGHT_EXTREME_COORD) {
        finalCoords.x = RIGHT_EXTREME_COORD;
      }

      mainPin.style.top = (finalCoords.y) + 'px';
      mainPin.style.left = (finalCoords.x) + 'px';

      window.createAddress();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.returnMainPin = function () {
    mainPin.style.top = (PrimaryMainPinCoord.y) + 'px';
    mainPin.style.left = (PrimaryMainPinCoord.x) + 'px';
  };
}());
