/**
 * Emit the CDN picker manifest the `<CdnPicker />` docs component reads: the shippable component names
 * (the `kind: "component"` records that get a per-component `<name>.css` on the CDN) and whether each
 * references icons (so the picker knows to add `component-icons.css` to the combine URL). The picker's
 * URLs track the latest release, so no versions are needed here. Sourced from the component registry —
 * never hand-maintained.
 *
 * Wired into `docs:assets`, so it regenerates for both `docs:dev` and `docs:build`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { COMPONENTS } from "../../formats/components/src/components/index.ts";

// `kind: "component"` records are the ones `build-entries.ts` emits as per-component `<name>.css` files
// (it filters out the in-sheet utilities like icon/mask/screen-reader-content). Those are exactly the
// files the picker's combine URL can point at.
const components = COMPONENTS.filter((c) => c.kind === "component").map((c) => ({
  name: c.name,
  // Does the component's own CSS read any `--instui-icon-*` glyph token? If so, a combine URL that
  // includes it must also load `component-icons.css` against the lean (icon-free) token sheet.
  needsIcons: /var\(--instui-icon-/.test(c.css({ prefix: "instui" })),
}));

const out = resolve(import.meta.dirname, "../.vitepress/theme/generated/cdn-manifest.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, `${JSON.stringify({ components }, null, 2)}\n`);
const withIcons = components.filter((c) => c.needsIcons).length;
console.log(
  `✓ docs: wrote cdn-manifest.json (${components.length} components, ${withIcons} use icons)`,
);
