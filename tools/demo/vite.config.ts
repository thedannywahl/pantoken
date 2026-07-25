import { extendBase } from "../../vite.config.base.ts";

export default extendBase({
  run: { tasks: { build: { command: ["vp pack", "vp build -c vite.runner.config.ts"] } } },
  pack: {
    // Exports are hand-managed so the static assets (runner.html, demo.css) survive.
    exports: false,
  },
});
