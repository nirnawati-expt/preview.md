# preview.md - Markdown Viewer on your Browser

A free and minimalist browser extension to read local Markdown files instantly. 100% Client-Side. Your Data Never Leaves Your Browser. Currently available for Chrome & Mozilla.

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
- **Local Images:** Images embedded using local file paths (e.g., `![Image](file:///path/to/image.png)` or local relative paths) will not render, as browsers block extensions from loading local assets.

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

### From Mozilla Firefox Browser Addons

Currently working on it. Stay tune for next update.

### From Source (Developer Mode)

#### Chrome
1. Clone or download this repository.
2. Install all the dependencies in package-lock.json by running `npm install`
3. Build the extension by `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the extension folder.

#### Mozilla
1. Clone or download this repository.
2. Install all the dependencies in package-lock.json by running `npm install`
3. Build the extension by `npm install`
4. Open Mozilla and navigate to `about:debugging#/runtime/this-firefox`.
5. **Load Temporary Add-on** and select the extension folder.
6. For Debugging mode, **always "Disable popup auto-hide"** so that the popup does not close automatically when the file picker window appears. The extension will not function correctly because the window focus gets interrupted, causing Firefox's garbage collector to immediately terminate the JavaScript process before the extension's command can be fully sent.
7. To disable popup auto hide, press "Inspect" button on the `preview.md` extension on page `about:debugging#/runtime/this-firefox`, once the dev tool window shown, press the triple dot symbol inside the dev tool window, then select "Disable Popup Auto-Hide"

## Usage

1. Click the extension icon in the toolbar.
2. Click **View Now** and select your `.md` file.
3. The formatted document will open instantly in a new tab.

## Tech Stack

This project is built with modern web technologies and tools for browser extension development:

* **Core & Logic:** [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Bundler & Build Tool:** [Vite](https://vite.dev/)
* **Extension Polyfill:** [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) for cross-browser compatibility
* **Markdown Parser:** [Marked](https://marked.js.org/) for rendering Markdown content

## Testing the Extension

A sample Markdown file is included in this repository for testing.

1. Download or locate `markdown-cheat-sheet.md` [here](markdown-cheat-sheet.md).
2. Open the extension, click **View Now**, and select that file to test the layout, tables, task lists, and Easy Mode functionality instantly.

## License

[MIT License](LICENSE)
