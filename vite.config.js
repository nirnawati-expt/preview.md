import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
  const isMozilla = mode === "mozilla";
  const outDir = isMozilla ? "dist_mozilla" : "dist_chrome";
  const manifestFile = isMozilla
    ? "manifest.mozilla.json"
    : "manifest.chrome.json";
  const zipName = isMozilla ? "previewmd_mozilla.zip" : "previewmd_chrome.zip";

  return {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: manifestFile,
            dest: ".",
            rename: "manifest.json",
          },
        ],
      }),
    ],
    build: {
      outDir: outDir,
      rollupOptions: {
        input: {
          popup: "popup.html",
          viewer: "viewer.html",
        },
      },
    },
  };
});
