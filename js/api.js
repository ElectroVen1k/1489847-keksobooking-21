'use strict';
(function () {
  const LOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 5000;

  window.load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }

    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
