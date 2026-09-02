import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";

// `@pantoken/i18n` ships to the browser (see CLAUDE.md) — the built bundle must never reference
// a `node:*` builtin, even transitively through a dependency like `messageformat`. Requires
// `vp pack` (or a full `vp run -r build`, as CI always does) to have run first; skips locally with
// a clear reason rather than a confusing ENOENT if dist/ hasn't been built yet.
test("the built dist/index.mjs has no node:* imports", () => {
  const distPath = join(import.meta.dirname, "..", "dist", "index.mjs");
  if (!existsSync(distPath)) {
    console.warn(`Skipping: ${distPath} not built yet — run \`vp pack\` first.`);
    return;
  }
  const bundle = readFileSync(distPath, "utf8");
  expect(bundle).not.toMatch(/node:[a-z/]+/u);
});
