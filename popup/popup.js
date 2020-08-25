var bttvForVKPopupNS = {
  currentTab: 1,
  pages: document.getElementsByClassName("bttv_page"),
  tabs: document.getElementById("bttv_nav").children,
  handleSwitch: function() {
    var key = this.name;
    var value = this.checked;
    console.log(key, value);
    chrome.storage.sync.set({key: value});
  },
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
  }
}

for (var box of document.getElementsByClassName("bttv_switch")) {
  var input = box.firstElementChild.firstElementChild;
  (function(i) {
    chrome.storage.sync.get([i.name], function(value) {
      i.checked = value;
    });
  })(input);
  input.addEventListener("change", bttvForVKPopupNS.handleSwitch);
}

for (var tab of document.getElementsByClassName("bttv_nav-tab"))
  tab.addEventListener("click", bttvForVKPopupNS.handleTabClick);

document.getElementById("bttv_close").addEventListener("click", function() {
  window.close();
});