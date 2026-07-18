document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const markdownText = e.target.result;

      const encodedData = encodeURIComponent(markdownText);
      const encodedName = encodeURIComponent(file.name);

      chrome.tabs.create({
        url: chrome.runtime.getURL(
          `viewer.html?name=${encodedName}&md=${encodedData}`,
        ),
      });
    };
    reader.readAsText(file);
  });
