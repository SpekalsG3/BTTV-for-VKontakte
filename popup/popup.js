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
};
bttvForVKPopupNS.handleSwitch = function() {
  bttvForVKPopupNS.settings[this.name] = this.checked;
  chrome.storage.sync.set({"bttvForVK": bttvForVKPopupNS.settings}, function() {
    console.log("Saved", this.name, "to", this.checked);
  });
}

chrome.storage.sync.get("bttvForVK", function(obj) {
  bttvForVKPopupNS.settings = obj["bttvForVK"];
  for (var box of document.getElementsByClassName("bttv_switch")) {
    var input = box.firstElementChild.firstElementChild;
    input.checked = bttvForVKPopupNS.settings[input.name];
    // (function(i) {
    //   chrome.storage.sync.get(i.name, function(obj) {
    //     console.log(i.name, obj);
    //     i.checked = obj[i.name];
    //   });
    // })(input);
    input.addEventListener("change", bttvForVKPopupNS.handleSwitch);
  }
});

for (var tab of document.getElementsByClassName("bttv_nav-tab"))
  tab.addEventListener("click", bttvForVKPopupNS.handleTabClick);

document.getElementById("bttv_close").addEventListener("click", function() {
  window.close();
});