# preview.md - Offline Markdown Viewer

A free and minimalist browser extension to read local Markdown files instantly, completely offline. Currently available for Chrome.

## Features

### Main Features

- **Instant Preview:** Open and render `.md` files without leaving the browser.
- **100% Offline:** Works entirely locally with no server connections, trackers, or data collection.
- **Clean Design:** Minimalist user interface.
- **Easy Mode:** Toggle a narrow reading layout to minimize eye movement and improve focus.
- **Light and Dark Mode**
- **Zoom In and Out Text**

### Current Limitations

- **Heading Links:** Anchor links for document section navigation are not yet generated.
- **Footers:** Layout does not render document footer blocks.
- **Large File Crash:** The extension currently uses URL encoding to pass Markdown data to new tabs, causing failures with large files due to browser URL length limits. `(Planned fix: Migrate to Blob URLs or chrome.storage)`.
- **Local File Links:** Clicking links to other local files (e.g., `file:///` paths) inside the Markdown document will not open due to browser security restrictions on extensions.
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

## Testing the Extension

A sample Markdown file is included in this repository for testing.

1. Download or locate `markdown-cheat-sheet.md` [here](markdown-cheat-sheet.md)
2. Open the extension, click **View Now**, and select that file to test the layout, tables, task lists, and Easy Mode functionality instantly.

## License

[MIT License](LICENSE)
