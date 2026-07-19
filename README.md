# preview.md - Markdown Viewer on your Browser

A free and minimalist browser extension to read local Markdown files instantly. 100% Client-Side. Your Data Never Leaves Your Browser. Currently available for Chrome.

## Features

### Key Features

- **Instant Preview:** Open and render `.md` files without leaving the browser.
- **100% Client-Side:** Works entirely locally with no server connections, trackers, or data collection.
- **Clean Design:** Minimalist user interface.
- **Easy Mode:** Toggle a narrow reading layout to minimize eye movement and improve focus.
- **Light and Dark Mode**
- **Zoom In and Out Text**

### Browser Security Restrictions

Due to **built-in browser security restrictions** (Browser Security Sandbox), this extension has the following limitations enforced to protect your local file system:

- **Local Files:** The extension cannot directly open files via direct local URLs (e.g., file:///path/to/file.md), any link using local file paths or local relative path will not render.
- **Local Images:** Images embedded using local file paths (e.g., ![Image](file:///path/to/image.png) or local relative paths) will not render, as browsers block extensions from loading local assets.

**How to Work Around This:**

- **Opening Files:** Use the "Open File" button within the extension to open a new document.
- **Displaying Images:** Use web-based image URLs (hosted online) or embed your images as Base64 strings directly inside your Markdown file.

### Feature Limitations

- **Heading Links:** Anchor links for document section navigation are not yet generated.
- **Footers:** Layout does not render document footer blocks.
- **GitHub-Flavored Markdown (GFM):** This extension parses standard Markdown syntax. It does not fully support GitHub-Flavored Markdown (GFM) extensions such as custom autolinks, custom block quote, etc.

If you want to help implement these features or fix bugs, feel free to fork the repository and submit a pull request.

## Installation

### From Chrome Web Store

Currently working on it. Stay tune for next update.

### From Source (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the extension folder.

## Usage

1. Click the extension icon in the toolbar.
2. Click **View Now** and select your `.md` file.
3. The formatted document will open instantly in a new tab.

## Tech Stack

This project is built using the following core technologies:

- **[Marked.js](https://marked.js.org/)**: A fast and lightweight Markdown compiler for parsing Markdown content entirely client-side.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid and responsive UI styling.
- **Pure JavaScript / HTML5** - 100% client-side execution ensures your data is processed locally and never leaves your browser.

## Testing the Extension

A sample Markdown file is included in this repository for testing.

1. Download or locate `markdown-cheat-sheet.md` [here](markdown-cheat-sheet.md).
2. Open the extension, click **View Now**, and select that file to test the layout, tables, task lists, and Easy Mode functionality instantly.

## License

[MIT License](LICENSE)
