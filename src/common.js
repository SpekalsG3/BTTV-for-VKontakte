chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install") { // install
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