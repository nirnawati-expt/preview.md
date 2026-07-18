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
    // 1st option - only able to open short markdown without local data image
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
