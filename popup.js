import browser from "webextension-polyfill";
import { ACTION, VIEWER_PAGE_NAME } from "./const";

function getInputLabel() {
  return document.getElementById("file-input-label");
}
function getInputFile() {
  return document.getElementById("file-input");
}

getInputLabel().addEventListener(ACTION.CLICK, function (event) {
  getInputFile().click();
});

getInputFile().addEventListener(ACTION.CHANGE, function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const markdownText = e.target.result;
    const encodedName = encodeURIComponent(file.name);

    try {
      await browser.storage.local.set({
        previewMdtemporaryMarkdown: markdownText,
      });
      browser.tabs.create({
        url: browser.runtime.getURL(`${VIEWER_PAGE_NAME}?name=${encodedName}`),
      });
    } catch (error) {
      console.error("Failure to store to local storage:", error);
    }
  };

  reader.readAsText(file);
});
