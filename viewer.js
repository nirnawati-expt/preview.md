import { marked } from 'marked';
import browser from "webextension-polyfill";
import { ACTION,TEMP_STORAGE_NAME, CSS_THEME_CLASS } from './const';

/* ============================== DOM VARIABLES ============================== */

function getHtmlTag() {
  return document.documentElement;
}

function getThemeBtn() {
  return document.getElementById("theme-btn");
}

function getDyslexicBtn() {
  return document.getElementById("dyslexic-btn")
}

function getPreviewSection() {
  return document.getElementById("preview");
}
function getZoomOutBtn() {
  return document.getElementById("zoom-out-btn");
}
function getZoomInBtn() {
  return document.getElementById("zoom-in-btn");
}

/* ============================== TOGGLE ============================== */

getThemeBtn().addEventListener(ACTION.CLICK, () => {
  if (getHtmlTag().classList.contains(CSS_THEME_CLASS.DARK)) {
    getHtmlTag().classList.remove(CSS_THEME_CLASS.DARK);
    getThemeBtn().innerText = "☀️";
    getThemeBtn().ariaLabel = "current-mode-light";
  } else {
    getHtmlTag().classList.add(CSS_THEME_CLASS.DARK);
    getThemeBtn().innerText = "\uD83C\uDF19";
    getThemeBtn().ariaLabel = "current-mode-dark";
  }
});

getDyslexicBtn().addEventListener(ACTION.CLICK, () => {
  if (document.body.classList.contains(CSS_THEME_CLASS.DYSLEXIC_MODE)) {
    document.body.classList.remove(CSS_THEME_CLASS.DYSLEXIC_MODE);
    getDyslexicBtn().innerText = "Easy Read OFF";
    getDyslexicBtn().classList.add("bg-orange-800");
    getDyslexicBtn().classList.add("hover:bg-orange-900");
    getDyslexicBtn().classList.remove("bg-orange-600");
    getDyslexicBtn().classList.remove("hover:bg-orange-700");
  } else {
    document.body.classList.add(CSS_THEME_CLASS.DYSLEXIC_MODE);
    getDyslexicBtn().innerText = "Easy Read ON";
    getDyslexicBtn().classList.add("bg-orange-600");
    getDyslexicBtn().classList.add("hover:bg-orange-700");
    getDyslexicBtn().classList.remove("bg-orange-800");
    getDyslexicBtn().classList.remove("hover:bg-orange-900");
  }
});

/* ============================== ZOOM ============================== */

var currentZoom = 100;

function applyZoom() {
  var preview = getPreviewSection();
  if (document.body.classList.contains(CSS_THEME_CLASS.DYSLEXIC_MODE)) {
    preview.style.fontSize = `${1.25 * (currentZoom / 100)}rem`;
    preview.style.lineHeight = `${1.75 * (currentZoom / 100)}rem`;
    preview.style.lineBreak = `${2.25 * (currentZoom / 100)}rem`;
  } else {
    preview.style.fontSize = `${1 * (currentZoom / 100)}rem`;
    preview.style.lineHeight = `${1.5 * (currentZoom / 100)}rem`;
    preview.style.lineBreak = `${2 * (currentZoom / 100)}rem`;
  }
}

getZoomInBtn().addEventListener(ACTION.CLICK, () => {
  if (currentZoom < 200) {
    currentZoom += 10;
    applyZoom();
  }
});

getZoomOutBtn().addEventListener(ACTION.CLICK, () => {
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

  var preview = getPreviewSection();

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

  const targetDiv = getPreviewSection();
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

document.addEventListener(ACTION.LOAD_CONTENT, async () => {
  const result = await browser.storage.local.get([TEMP_STORAGE_NAME]);
  const markdownText = await result[TEMP_STORAGE_NAME];
  if (markdownText) {
    await renderMarkdown(markdownText);
    browser.storage.local.remove([TEMP_STORAGE_NAME]);
  } else {
    getDyslexicBtn().hidden = true;
    currentZoom += 15;
    applyZoom();
    console.error("No Data, close tabs, re open via chrome extension");
  }
});
