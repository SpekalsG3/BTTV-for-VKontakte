chrome.runtime.onInstalled.addListener(function(details){
  if (details.reason == "install" || details.reason == "update") { // install
    chrome.storage.sync.set({
      bttvForVK: {
        settings: {
          showGifs: true,
          emoteMenu: true,
          frankerZEmotes: true,
          predictedMenu: true
        }
      }
    });
  }
});