'use strict';
(function () {
  window.loadError = function (message) {
    const error = document.createElement('div');
    error.style = 'z-index: 2; text-align: center; background-color: rgba(0, 0, 0, 0.7)';
    error.style.position = 'fixed';
    error.style.width = '800px';
    error.style.left = 'calc(50% - 400px)';
    error.style.top = '50px';
    error.style.fontSize = '42px';
    error.style.color = 'white';
    error.innerHTML = 'При загрузке объявлений что-то пошло не так. <br>' + message + '.<br> Попрубуйте ещё раз.';
    error.style.borderRadius = '10px';
    document.body.insertAdjacentElement('afterbegin', error);
  };
})();
