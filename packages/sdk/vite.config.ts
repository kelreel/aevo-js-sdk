import { resolve } from "path";
import { defineConfig, LibraryOptions } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => {
  return {
    plugins: [dts({ insertTypesEntry: true })],
    build: {
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "aevo-js-sdk",
        fileName: "index",
        formats: ["cjs", "umd", "es"],
      } as LibraryOptions,
      emptyOutDir: true,
    },
  };
});
