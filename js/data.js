'use strict';
(function () {
  const successHandler = function (announcementList) {
    window.newAnnouncementList = [];
    for (let i = 0; i < announcementList.length; i++) {
      window.newAnnouncementList[i] = announcementList[i];
    }
  };

  window.load(successHandler, window.loadError);
})();
