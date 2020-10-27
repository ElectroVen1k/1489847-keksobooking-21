'use strict';
(function () {
  window.utils = {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    createMixedList: function (originList) {
      const mixedList = [].concat(originList);
      const randomLength = window.utils.getRandom(1, originList.length);

      for (let i = 0; i < randomLength; i++) {
        let j = window.utils.getRandom(0, mixedList.length);
        if (j === mixedList.length) {
          j = j - 1;
        }
        mixedList.splice(j, 1);
      }
      return mixedList;
    }
  };
})();
