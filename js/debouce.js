'use strict';
(function () {
  window.debouce = function (cb) {
    const DEBOUNCE_TIME = 500;

    if (window.lastTimeout) {
      window.clearTimeout(window.lastTimeout);
    }

    window.lastTimeout = setTimeout(cb, DEBOUNCE_TIME);
  };
})();
