(function () {
  "use strict";
  var wasOpen = [];
  window.addEventListener("beforeprint", function () {
    var all = document.querySelectorAll("details");
    wasOpen = Array.prototype.map.call(all, function (d) { return d.open; });
    Array.prototype.forEach.call(all, function (d) { d.open = true; });
  });
  window.addEventListener("afterprint", function () {
    Array.prototype.forEach.call(document.querySelectorAll("details"), function (d, i) {
      d.open = wasOpen[i];
    });
  });
})();
