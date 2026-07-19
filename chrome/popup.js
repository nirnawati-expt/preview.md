document
  .getElementById("file-input-label")
  .addEventListener("click", function (event) {
    document.getElementById("file-input").click();
  });

document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const markdownText = e.target.result;
      const encodedName = encodeURIComponent(file.name);

      try {
        await chrome.storage.local.set({
          previewMdtemporaryMarkdown: markdownText,
        });
        chrome.tabs.create({
          url: chrome.runtime.getURL(`viewer.html?name=${encodedName}`),
        });
      } catch (error) {
        console.error("Failure to store to local storage:", error);
      }
    };

    reader.readAsText(file);
  });
