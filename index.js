var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('bttv_for_vk.js');
(document.head || document.documentElement).appendChild(s);