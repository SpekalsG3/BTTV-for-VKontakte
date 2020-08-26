(function () {
  if ( typeof window.CustomEvent === "function" ) return false;
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
if (document.readyState !== 'complete') {
  window.addEventListener("load", function() {
    chrome.storage.sync.get("bttvForVK", function(obj) {
      obj.action = "load";
      window.dispatchEvent(new CustomEvent("bttvForVKSettingsChange", {
        detail: obj
      }));
    });
  });
} else
  console.error("Window is already loaded. Couldn't handle window.onload event.");

chrome.runtime.onMessage.addListener(function(request) {
  if (typeof request.bttvForVK === "object") {
    window.dispatchEvent(new CustomEvent("bttvForVKSettingsChange", {
      detail: request
    }));
  }
});

var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/bttv_for_vk.js');
(document.head || document.documentElement).appendChild(s);