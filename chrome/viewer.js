tailwind.config = {
  darkMode: "class",
  content: [],
};

/* ============================== VARIABLES ============================== */

const params = new URLSearchParams(window.location.search);
const encodedMarkdown = params.get("md");
const encodedFileName = params.get("name");

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

document.getElementById("zoom-in-btn").addEventListener("click", () => {
  if (currentZoom < 200) {
    currentZoom += 10;
    applyZoom();
  }
});

document.getElementById("zoom-out-btn").addEventListener("click", () => {
  if (currentZoom > 70) {
    currentZoom -= 10;
    applyZoom();
  }
});

/* ============================== RENDER ============================== */

function renderMarkdown() {
  var preview = document.getElementById("preview");
  preview.innerHTML = marked.parse(decodeURIComponent(encodedMarkdown));
  preview.querySelectorAll("img").forEach((img) => {
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

// option 1 - short bcs using url encoding
if (encodedMarkdown) {
  renderMarkdown();
  const targetDiv = document.getElementById("preview");
  targetDiv.outerHTML = postprocess(targetDiv.outerHTML);
}

// option 2 - using temp storage
