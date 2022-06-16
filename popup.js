/**
 * @typedef {Object} I18N
 * @property {(attr: string) => string | undefined} getMessage
 *
 * @typedef {Object} Tabs
 * @property {(opt: {active: boolean, url: string}) => any} create
 * @property {(opt: {code: string}, callback: (result: any) => void) => void} executeScript
 *
 * @typedef {Object} Chrome
 * @property {I18N} i18n
 * @property {Tabs} tabs
 * @property {Object} contextMenus
 * @property {Object} runtime
 */

// @ts-ignore
const c = /** @type {Chrome} */ (chrome);

const getSelectionCode = `
(() => {
  const getText = (e) => {
    if(e.tagName === "TEXTAREA" ||
      (e.tagName === "INPUT" && e.type === "text")) {
      return e.value.substring(e.selectionStart, e.selectionEnd);
    }
    return "";
  }
  return window.getSelection().toString() || getText(document.activeElement);
})();
`;

class PixivSearch {
  constructor() {
    /** @type {HTMLInputElement | null} */
    this.idInp = /** @type {HTMLInputElement | null} */ (
      document.getElementById("inp-id")
    );
    /** @type {HTMLInputElement | null} */
    this.nameInp = /** @type {HTMLInputElement | null} */ (
      document.getElementById("inp-name")
    );
    /** @type {HTMLButtonElement | null} */
    this.btnId = /** @type {HTMLButtonElement | null} */ (
      document.getElementById("btn-id")
    );
    /** @type {HTMLButtonElement | null} */
    this.btnName = /** @type {HTMLButtonElement | null} */ (
      document.getElementById("btn-name")
    );

    this.addEventListener();
    this.loadTranslation();
    this.getSelection();
  }

  addEventListener() {
    this.idInp?.addEventListener("keyup", this.searchId);
    this.btnId?.addEventListener("click", () => this.searchId());

    this.nameInp?.addEventListener("keyup", this.searchKeyword);
    this.btnName?.addEventListener("click", () => this.searchKeyword());
  }

  search(
    /** @type {String} */ url,
    /** @type {KeyboardEvent | undefined} */ e
  ) {
    if (e) {
      if (e.key.toLowerCase() !== "enter") return;
      e.preventDefault();
    }
    c.tabs.create({ active: true, url });
  }
  searchId(/** @type {KeyboardEvent | undefined} */ e) {
    const id = this.getTextFromInput(this.idInp);
    this.search(`https://www.pixiv.net/artworks/${id}`, e);
  }
  searchKeyword(/** @type {KeyboardEvent | undefined} */ e) {
    const keyword = this.getTextFromInput(this.nameInp);
    this.search(
      `https://www.pixiv.net/tags/${keyword}/artworks?s_mode=s_tag`,
      e
    );
  }

  loadTranslation() {
    const appName = c.i18n.getMessage("appName");
    const search = c.i18n.getMessage("search");
    const searchBtn = c.i18n.getMessage("btnSearch");

    const title = document.querySelector("h1");
    const searchTitle = document.getElementById("search-label");

    if (title && appName) title.innerText = appName;
    if (searchTitle && search) searchTitle.innerText = search;
    if (this.btnId && searchBtn) this.btnId.innerText = searchBtn;
    if (this.btnName && searchBtn) this.btnName.innerText = searchBtn;
  }

  getTextFromInput(/** @type {HTMLInputElement | null} */ input) {
    if (!input || !input.value || !input.value.trim()) return "";
    return input.value.trim();
  }

  getSelection() {
    c.tabs.executeScript({ code: getSelectionCode }, (selection) => {
      if (selection) {
        if (Number.isInteger(parseInt(selection[0]))) {
          this.idInp && (this.idInp.value = selection[0]);
        }
        this.nameInp && (this.nameInp.value = selection[0]);
      }
    });
  }
}

new PixivSearch();
