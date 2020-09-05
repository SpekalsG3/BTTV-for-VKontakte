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
      obj.bttvForVK.localization = {
        popupWidth: chrome.i18n.getMessage("popupWidth"),
        navAbout: chrome.i18n.getMessage("navAbout"),
        navSettings: chrome.i18n.getMessage("navSettings"),
        navPrivacy: chrome.i18n.getMessage("navPrivacy"),
        navDonation: chrome.i18n.getMessage("navDonation"),
        aboutBttvLink: chrome.i18n.getMessage("aboutBttvLink"),
        aboutText: chrome.i18n.getMessage("aboutText"),
        aboutGithubLink: chrome.i18n.getMessage("aboutGithubLink"),
        settingsGifsName: chrome.i18n.getMessage("settingsGifsName"),
        settingsGifsDesc: chrome.i18n.getMessage("settingsGifsDesc"),
        settingsMenuName: chrome.i18n.getMessage("settingsMenuName"),
        settingsMenuDesc: chrome.i18n.getMessage("settingsMenuDesc"),
        settingsFrankerzName: chrome.i18n.getMessage("settingsFrankerzName"),
        settingsFrankerzDesc: chrome.i18n.getMessage("settingsFrankerzDesc"),
        settingsPredictedName: chrome.i18n.getMessage("settingsPredictedName"),
        settingsPredictedDesc: chrome.i18n.getMessage("settingsPredictedDesc"),
        privacyPolicy: chrome.i18n.getMessage("privacyPolicy"),
        donationText1: chrome.i18n.getMessage("donationText1"),
        donationText2: chrome.i18n.getMessage("donationText2"),
        bugReport: chrome.i18n.getMessage("bugReport")
      }
      obj.bttvForVK.urls = {
        mascot: chrome.runtime.getURL("icons/mascot.png"),
        settingsLogo: chrome.runtime.getURL("icons/settings_logo.png")
      }
      obj.bttvForVKAction = "load"
      window.dispatchEvent(new CustomEvent("bttvForVKSettingsChange", {
        detail: obj
      }));
    });
  });
} else
  console.error("Window is already loaded. Couldn't handle window.onload event.");

window.addEventListener("bttvForVKSettingsChange", function(e) {
  chrome.storage.sync.set({
    bttvForVK: {
      settings: e.detail.bttvForVK.settings
    }
  });
});

var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/bttv_for_vk.js');
(document.head || document.documentElement).appendChild(s);