// @ts-ignore
const c = /** @type {Chrome} */ (chrome);

function onClickHandler(info) {
  const text = info.selectionText;
  const url =
    info.menuItemId === "PixivID"
      ? `https://www.pixiv.net/artworks/${text}`
      : `https://www.pixiv.net/tags/${text}/artworks?s_mode=s_tag`;
  c.tabs.create({ active: true, url });
}
c.contextMenus.onClicked.addListener(onClickHandler);

c.contextMenus.create(
  {
    type: "normal",
    title: c.i18n.getMessage("contentMenuText") + " Pixiv ID: [ %s ]",
    id: "PixivID",
    contexts: ["selection"],
  },
  () => {}
);

c.contextMenus.create(
  {
    type: "normal",
    title: c.i18n.getMessage("contentMenuText") + " Pixiv: %s",
    id: "PixivName",
    contexts: ["selection"],
  },
  () => {}
);
