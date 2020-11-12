'use strict';
(function () {
  const newAnnouncementForm = document.querySelector('.ad-form');
  const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  const messageContainerElement = document.querySelector('main');

  const successHandler = function (announcementList) {
    window.newAnnouncementList = [];
    for (let i = 0; i < announcementList.length; i++) {
      window.newAnnouncementList[i] = announcementList[i];
    }
  };

  const successUpload = function () {
    const message = successTemplate.cloneNode(true);
    messageContainerElement.prepend(message);

    document.addEventListener('click', function () {
      message.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        message.remove();
      }
    });

    window.resetPage();
  };

  const errorUpload = function () {
    const message = errorTemplate.cloneNode(true);
    const closeErrorMessageButton = document.querySelector('.error__button');
    messageContainerElement.prepend(message);

    document.addEventListener('click', function () {
      message.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        message.remove();
      }
    });

    closeErrorMessageButton.addEventListener('click', function () {
      message.remove();
    });
  };

  newAnnouncementForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(newAnnouncementForm), successUpload, errorUpload);
    evt.preventDefault();
  });

  window.load(successHandler, window.loadError);
})();
