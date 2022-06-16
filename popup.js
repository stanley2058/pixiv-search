function searchId(id, event = null) {
  console.log(id);
  console.log(event);
  if (!id.trim()) return;
  if (event) {
    if (event.key.toLowerCase() !== "enter") return;
    event.preventDefault();
  }
  search(`https://www.pixiv.net/artworks/${id}`);
}
function serachKeyword(keyword, event = null) {
  console.log(keyword);
  console.log(event);
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

window.addEventListener("load", () => {
  document.querySelector("h1").innerText = chrome.i18n.getMessage("appName");
  document.getElementById("SearchText").innerText =
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

  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();",
    },
    (selection) => {
      if (selection) {
        if (!!parseInt(selection[0])) inputId.value = selection[0];
        inputWord.value = selection[0];
      }
    }
  );
});
