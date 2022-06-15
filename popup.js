function searchId(id, event = null) {
  if (!id.trim()) return;
  if (event) {
    if (event.key.toLowerCase() !== "enter") return;
    event.preventDefault();
  }
  search(`https://www.pixiv.net/artworks/${id}`);
}
function serachKeyword(keyword, event = null) {
  if (!keyword.trim()) return;
  if (event) {
    if (event.key.toLowerCase() !== "enter") return;
    event.preventDefault();
  }
  search(`https://www.pixiv.net/tags/${keyword}/artworks?s_mode=s_tag`);
}
function search(url) {
  chrome.tabs.create({ active: true, url });
}

window.addEventListener("load", async () => {
  document.querySelector("h1").innerHTML = chrome.i18n.getMessage("appName");
  document.getElementById("SearchText").innerHTML =
    chrome.i18n.getMessage("Search");
  document.getElementById("btnID").innerText = document.getElementById(
    "btnName"
  ).innerText = chrome.i18n.getMessage("btnSearch");

  const inputId = document.getElementById("ID_search");
  const inputWord = document.getElementById("name_search");

  document
    .getElementById("btnID")
    .addEventListener("click", () => searchId(inputId.value));
  document
    .getElementById("ID_search")
    .addEventListener("keyup", (e) => searchId(inputId.value, e));
  document
    .getElementById("btnName")
    .addEventListener("click", () => serachKeyword(inputWord.value));
  document
    .getElementById("name_search")
    .addEventListener("keyup", (e) => serachKeyword(inputWord.value, e));

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let result;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => getSelection().toString(),
    });
    if (!!parseInt(result)) inputId.value = result;
    inputWord.value = result;
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
});
