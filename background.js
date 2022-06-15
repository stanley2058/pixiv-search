async function onClickHandler(info, tab) {
  const baseUrl = "https://www.pixiv.net/";
  const url =
    info.menuItemId === "PixivID"
      ? `${baseUrl}artworks/:keyword:`
      : `${baseUrl}tags/:keyword:/artworks?s_mode=s_tag`;

  let result;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => getSelection().toString(),
    });
    chrome.tabs.create({
      active: true,
      url: url.replace(":keyword:", result),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(() => {
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
