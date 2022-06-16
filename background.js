function onClickHandler(info, tab) {
  const url =
    info.menuItemId === "PixivID"
      ? "https://www.pixiv.net/artworks/:keyword:"
      : "https://www.pixiv.net/tags/:keyword:/artworks?s_mode=s_tag";

  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();",
    },
    (selection) =>
      chrome.tabs.create({
        active: true,
        url: url.replace(":keyword:", selection[0]),
      })
  );
}
chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create(
    {
      type: "normal",
      title: chrome.i18n.getMessage("contentMenuText") + " Pixiv ID: [ %s ]",
      id: "PixivID",
      contexts: ["selection"],
    },
    function () {}
  );

  chrome.contextMenus.create(
    {
      type: "normal",
      title: chrome.i18n.getMessage("contentMenuText") + " Pixiv: %s",
      id: "PixivName",
      contexts: ["selection"],
    },
    function () {}
  );
});
