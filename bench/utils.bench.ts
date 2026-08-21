// Benchmarks for `@pantoken/utils` — the shared primitives every format and renderer calls, usually
// once per token. The reference resolver dominates the native lineage (`toScss`, `toDtcg` and
// `toStyleDictionary` all start with `resolveTokens`), and the drift / self-containment checks scan a
// whole generated stylesheet, so both are measured against the real IR and real CSS, not fixtures.
import { bench, describe } from "vite-plus/test";
import {
  colorUtilitiesCss,
  danglingReferences,
  extractInstuiRefs,
  makeResolver,
  resolveTokens,
  sanitizeSvg,
  tokenUtilitiesCss,
  unknownReferences,
} from "../packages/utils/src/index.ts";
import { buildTokens } from "../packages/core/src/build.ts";
import { toCss } from "../formats/css/src/to-css.ts";

// Icons are excluded: their data-URI values carry no `var()` references, so they add megabytes of
// string copying without exercising anything the resolver or the drift checks do.
const ir = buildTokens({ theme: "rebrand", includeIcons: false });
const sheet = toCss(ir);
const resolve = makeResolver(ir, { mode: "light" });

// A component token pointing at a semantic colour pointing at a primitive — the deepest chain the
// resolver walks, and the per-token cost the whole-IR pass multiplies out.
const chained = ir.find(
  (t) => t.name.startsWith("--instui-component-") && t.value.includes("var("),
);
const chainedValue = chained?.value ?? "var(--instui-color-background-base)";

const colorNames = {
  background: ["base", "muted", "page", "container", "success", "error", "warning"],
  text: ["base", "muted", "success", "error", "warning", "info"],
  stroke: ["base", "muted", "strong", "success", "error", "brand"],
};

const utilityGroups = [
  {
    property: "font-weight",
    tokens: ir.filter((t) => t.name.startsWith("--instui-font-weight-")).map((t) => t.name),
  },
  {
    property: "border-radius",
    tokens: ir.filter((t) => t.name.startsWith("--instui-border-radius-")).map((t) => t.name),
  },
];

const svg =
  '<svg viewBox="0 0 24 24" onload="alert(1)"><script>alert(2)</script>' +
  '<path d="M1 1L23 23" onclick="x()"/><g><path d="M4 4h16v16H4z"/></g></svg>';

describe("reference resolution", () => {
  bench("resolveTokens (full IR, light)", () => {
    resolveTokens(ir, { mode: "light" });
  });

  bench("resolveTokens (full IR, light-dark preserved)", () => {
    resolveTokens(ir);
  });

  bench("makeResolver — one chained value", () => {
    resolve(chainedValue);
  });
});

describe("drift checks", () => {
  bench("extractInstuiRefs (whole stylesheet)", () => {
    extractInstuiRefs(sheet);
  });

  bench("danglingReferences (whole stylesheet)", () => {
    danglingReferences(sheet);
  });

  bench("unknownReferences (stylesheet vs IR)", () => {
    unknownReferences(sheet, ir);
  });
});

describe("utility emitters", () => {
  bench("colorUtilitiesCss", () => {
    colorUtilitiesCss(colorNames, { prefix: "instui" });
  });

  bench("tokenUtilitiesCss", () => {
    tokenUtilitiesCss(utilityGroups, { prefix: "instui" });
  });
});

describe("sanitizeSvg", () => {
  bench("strip scripts and event handlers", () => {
    sanitizeSvg(svg);
  });
});
