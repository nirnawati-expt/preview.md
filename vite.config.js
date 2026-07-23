import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const browser = mode === "mozilla" ? "_mozilla" : "_chrome"; // for future development if need to separate between browsers
  const outDir = "dist";
  const manifest = "manifest.json";

  return {
    root: './src',
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "../" + manifest,
            dest: outDir,
          },
        ],
      }),
    ],
    build: {
      outDir: "../" + outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          popup: resolve(__dirname, 'src/popup.html'),
          viewer: resolve(__dirname, 'src/viewer.html'),
        }
      },
    },
  };
});
