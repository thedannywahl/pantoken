import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp run generate", "vp pack"] } } },
  pack: {
    entry: { index: "src/index.ts" },
    // theme.css/theme.js are shipped verbatim (CDN @import URLs aren't local files a bundler can
    // resolve, and theme.js is meant to be hand-edited after upload) — copy, don't bundle them.
    copy: [
      { from: "generated/theme.css", to: "dist" },
      { from: "generated/theme.js", to: "dist" },
    ],
    // Exports are hand-managed so the static `./theme.css`/`./theme.js` exports survive.
    exports: false,
  },
});
