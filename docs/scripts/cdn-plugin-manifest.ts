/**
 * Emit the CDN picker plugin manifest the `<ComponentsPicker />` and `<IconPicker />` docs
 * components read: custom-components items (Components tab), single-file "other plugins" (Components
 * tab), and the nested logos product → variant hierarchy (Icons tab). Sourced from the plugin
 * packages' own generated output — never hand-maintained. Wired into `docs:assets`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  cardRules,
  agentShellRules,
  bannerRules,
} from "../../plugins/pantoken/custom-components/src/components/index.ts";
import { icons as vendoredCustomIcons } from "../../plugins/pantoken/custom-icons/src/index.ts";
import { logos, products } from "../../plugins/pantoken/logos/src/index.ts";

const outDir = resolve(import.meta.dirname, "../.vitepress/theme/generated");
mkdirSync(outDir, { recursive: true });

// ── Custom components ────────────────────────────────────────────────────────
// Mirrors the `[name, rules]` tuple `scripts/build-entries.ts` uses to emit per-component sheets.
const customComponents = [
  ["card", cardRules],
  ["agent-shell", agentShellRules],
  ["banner", bannerRules],
].map(([name]) => ({ name }));

// ── Custom icons ──────────────────────────────────────────────────────────────
// Vendored icons in the same --instui-icon-<name> namespace as the InstUI icon set — one checkbox
// each, listed on the Icons tab below Simple Icons.
const customIcons = vendoredCustomIcons.map((i) => ({ name: i.name }));

// ── Other plugins ─────────────────────────────────────────────────────────────
// Single-file CSS plugins that aren't rolled into Base/Utilities and aren't components, icons, or
// logos — one checkbox each. Excludes @pantoken/plugin-colors, @pantoken/plugin-deprecations,
// @pantoken/plugin-stacking, and @pantoken/plugin-transition, which ship no browser-consumable CSS
// file (stacking/transition's CSS now lives in @pantoken/components' own utilities; those plugins
// are tokens-only).
const otherPlugins = [
  {
    key: "primitives",
    pkg: "@pantoken/plugin-primitives",
    file: "primitives.css",
    label: "Primitives",
  },
  { key: "layouts", pkg: "@pantoken/plugin-layouts", file: "layouts.css", label: "Layouts" },
  {
    key: "visual-debug",
    pkg: "@pantoken/plugin-visual-debug",
    file: "visual-debug.css",
    label: "Visual debug",
  },
];

// ── Logos ─────────────────────────────────────────────────────────────────────
// Nested product → individual-variant hierarchy for the Icons tab's Logos toggle-group.
const productLabels: Record<string, string> = {
  canvas: "Canvas",
  igniteai: "Ignite AI",
  instructure: "Instructure",
  learnplatform: "LearnPlatform",
  mastery: "Mastery",
  parchment: "Parchment",
};
const logosByProduct = products.map((product) => ({
  product,
  label: productLabels[product] ?? product,
  items: logos.filter((l) => l.product === product).map((l) => ({ name: l.name })),
}));

const out = resolve(outDir, "cdn-plugin-manifest.json");
writeFileSync(
  out,
  `${JSON.stringify(
    { customComponents, otherPlugins, customIcons, logos: logosByProduct },
    null,
    2,
  )}\n`,
);
console.log(
  `✓ docs: wrote cdn-plugin-manifest.json (${customComponents.length} custom components, ` +
    `${otherPlugins.length} other plugins, ${customIcons.length} custom icons, ` +
    `${logosByProduct.length} logo products)`,
);
