tailwind.config = {
  darkMode: "class",
  content: [],
};

/* ============================== DOM VARIABLES ============================== */

var themeBtn = document.getElementById("theme-btn");
var dyslexicBtn = document.getElementById("dyslexic-btn");
var htmlTag = document.documentElement;

/* ============================== TOGGLE ============================== */

themeBtn.addEventListener("click", () => {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    themeBtn.innerText = "☀️";
    themeBtn.ariaLabel = "current-mode-light";
  } else {
    htmlTag.classList.add("dark");
    themeBtn.innerText = "\uD83C\uDF19";
    themeBtn.ariaLabel = "current-mode-dark";
  }
});

dyslexicBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dyslexic-mode")) {
    document.body.classList.remove("dyslexic-mode");
    dyslexicBtn.innerText = "Easy Read OFF";
    dyslexicBtn.classList.add("bg-orange-800");
    dyslexicBtn.classList.add("hover:bg-orange-900");
    dyslexicBtn.classList.remove("bg-orange-600");
    dyslexicBtn.classList.remove("hover:bg-orange-700");
  } else {
    document.body.classList.add("dyslexic-mode");
    dyslexicBtn.innerText = "Easy Read ON";
    dyslexicBtn.classList.add("bg-orange-600");
    dyslexicBtn.classList.add("hover:bg-orange-700");
    dyslexicBtn.classList.remove("bg-orange-800");
    dyslexicBtn.classList.remove("hover:bg-orange-900");
  }
});

/* ============================== ZOOM ============================== */

var currentZoom = 100;
var zoomOutBtn = document.getElementById("zoom-out-btn");
var zoomInBtn = document.getElementById("zoom-in-btn");

function applyZoom() {
  var preview = document.getElementById("preview");
  if (document.body.classList.contains("dyslexic-mode")) {
    preview.style.fontSize = `${1.25 * (currentZoom / 100)}rem`;
    preview.style.lineHeight = `${1.75 * (currentZoom / 100)}rem`;
    preview.style.lineBreak = `${2.25 * (currentZoom / 100)}rem`;
  } else {
    preview.style.fontSize = `${1 * (currentZoom / 100)}rem`;
    preview.style.lineHeight = `${1.5 * (currentZoom / 100)}rem`;
    preview.style.lineBreak = `${2 * (currentZoom / 100)}rem`;
  }
}

zoomInBtn.addEventListener("click", () => {
  if (currentZoom < 200) {
    currentZoom += 10;
    applyZoom();
  }
});

zoomOutBtn.addEventListener("click", () => {
  if (currentZoom > 70) {
    currentZoom -= 10;
    applyZoom();
  }
});

/* ============================== RENDER ============================== */

const params = new URLSearchParams(window.location.search);
const encodedMarkdown = params.get("md");
const encodedFileName = params.get("name");

function renderMarkdown(text) {

  var preview = document.getElementById("preview");

  preview.innerHTML = marked.parse(text);

  preview.querySelectorAll("img").forEach((img) => {
    if (
      // todo: separate this if checking with it's own filter method so it is more like funcIsProhibitedSrc(img.src)
      // and maybe to check if it is an absolute path, better use regex
      (img.src.startsWith("chrome-extension://") ||
        img.src.startsWith("moz-extension://") ||
        img.src.startsWith("file:///") ||
        img.src.startsWith("C:") ||
        img.src.startsWith("D:") ||
        img.src.startsWith("E:") ||
        img.src.startsWith("F:") ||
        img.src.startsWith("G:") ||
        img.src.startsWith("H:")
      ) &&
      (!img.src.startsWith("http://") || !img.src.startsWith("https://"))
    ) {
      const warningText = document.createElement("p");
      warningText.style.border = "1px dashed var(--color-accent)";
      warningText.style.cursor = "help";
      warningText.style.color = "var(--color-accent)";
      warningText.style.textAlign = "center";
      warningText.classList.add("text-xs");

      warningText.innerText =
        "Unable to load " +
        new URL(img.src).pathname.replace(/^\/{1}/g, "") +
        " due to browser security rules.";

      warningText.title =
        "Image not showing? Browser security blocks direct access to local files (both by relative path or absolute path). Only web URLs can be loaded.";
      img.parentNode.insertBefore(warningText, img.nextSibling);
    }

    if (!img.getAttribute("width") && !img.getAttribute("height")) {
      img.addEventListener(
        "load",
        function () {
          img.setAttribute("width", img.naturalWidth);
          img.setAttribute("height", img.naturalHeight);
        },
        { once: true },
      );
    }
  });

  preview.querySelectorAll("a").forEach((a) => {
    if (
      (a.href.startsWith("chrome-extension://") ||
        a.href.startsWith("moz-extension://")) &&
      (!a.href.startsWith("http://") || !a.href.startsWith("https://"))
    ) {
      a.setAttribute(
        "title",
        "Browser security blocks direct access to local files. Please open this file manually. src:" +
          new URL(a.href).pathname,
      );
      a.style.cursor = "help";
      a.removeAttribute("href");
    } else if (!a.target) {
      a.target = "_blank";
    }
  });

  const targetDiv = document.getElementById("preview");
  targetDiv.outerHTML = postprocess(targetDiv.outerHTML);
}

function postprocess(html) {
  let processedHtml = html
    .replace(/==([^=]+)==/g, "<mark>$1</mark>")
    .replace(/\^([^^]+)\^/g, "<sup>$1</sup>")
    .replace(/<del>([\s\S]*?)<\/del>/g, "<sub>$1</sub>");
  return processedHtml;
}

if (encodedFileName) {
  document.title = "📄 preview.md: " + decodeURIComponent(encodedFileName);
}

if (encodedMarkdown) {
  renderMarkdown(decodeURIComponent(encodedMarkdown));
}

document.addEventListener("DOMContentLoaded", async () => {
  const result = await chrome.storage.local.get(["previewMdtemporaryMarkdown"]);
  const markdownText = await result["previewMdtemporaryMarkdown"];
  if (markdownText) {
    await renderMarkdown(markdownText);
    chrome.storage.local.remove(["previewMdtemporaryMarkdown"]);
  } else {
    dyslexicBtn.hidden = true;
    currentZoom += 15;
    applyZoom();
    console.error("No Data, close tabs, re open via chrome extension");
  }
});
