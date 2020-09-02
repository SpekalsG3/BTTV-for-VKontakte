(function() {
  var objects = document.getElementsByTagName('html');
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j];

    var valStrH = obj.innerHTML.toString();
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : "";
    });

    if(valNewH != valStrH)
      obj.innerHTML = valNewH;
  }
}());

var bttvForVKPopupNS = {
  currentTab: 1,
  pages: document.getElementsByClassName("bttv_page"),
  tabs: document.getElementById("bttv_nav").children,
  handleTabClick: function() {
    bttvForVKPopupNS.pages[bttvForVKPopupNS.currentTab].style.opacity = 0;
    bttvForVKPopupNS.pages[bttvForVKPopupNS.currentTab].style.zIndex = 1;
    bttvForVKPopupNS.tabs[bttvForVKPopupNS.currentTab].classList.remove("bttv_nav-tab--current");
    for (bttvForVKPopupNS.currentTab = 0; bttvForVKPopupNS.currentTab < bttvForVKPopupNS.tabs.length; bttvForVKPopupNS.currentTab++)
      if (bttvForVKPopupNS.tabs[bttvForVKPopupNS.currentTab] == this)
        break;
    bttvForVKPopupNS.pages[bttvForVKPopupNS.currentTab].style.opacity = 1;
    bttvForVKPopupNS.pages[bttvForVKPopupNS.currentTab].style.zIndex = 2;
    bttvForVKPopupNS.tabs[bttvForVKPopupNS.currentTab].classList.add("bttv_nav-tab--current");
  },
  settings: {}
};
bttvForVKPopupNS.handleSwitch = function() {
  var key = this.name,
      value = this.checked;
  bttvForVKPopupNS.settings[key] = value;
  chrome.storage.sync.set({"bttvForVK": bttvForVKPopupNS.settings}, function() {
    console.log("Saved", key, "to", value);
    chrome.windows.getAll({populate:true},function(windows){
      for (var win of windows) {
        for (var tab of win.tabs) {
          if (tab.url.slice(0,15) === "https://vk.com/")
            chrome.tabs.sendMessage(tab.id, {"bttvForVK": bttvForVKPopupNS.settings, "action": "update", "updated": key});
        }
      }
    });
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   if (tabs[0].url.slice(0,15) === "https://vk.com/")
    //     chrome.tabs.sendMessage(tabs[0].id, {"bttvForVK": bttvForVKPopupNS.settings, "action": "update", "updated": key});
    // });
  });
}

chrome.storage.sync.get("bttvForVK", function(obj) {
  bttvForVKPopupNS.settings = obj["bttvForVK"];
  for (var box of document.getElementsByClassName("bttv_switch")) {
    var input = box.firstElementChild.firstElementChild;
    input.checked = bttvForVKPopupNS.settings[input.name];
    input.addEventListener("change", bttvForVKPopupNS.handleSwitch);
  }
});

for (var tab of document.getElementsByClassName("bttv_nav-tab"))
  tab.addEventListener("click", bttvForVKPopupNS.handleTabClick);

document.getElementById("bttv_close").addEventListener("click", function() {
  window.close();
});