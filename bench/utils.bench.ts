// Benchmarks for `@pantoken/utils` — the shared primitives every format and renderer calls, usually
// once per token. The reference resolver dominates the native lineage (`toScss`, `toDtcg` and
// `toStyleDictionary` all start with `resolveTokens`), and the drift / self-containment checks scan a
// whole generated stylesheet, so both are measured against the real IR and real CSS, not fixtures.
import { test, describe } from "vite-plus/test";
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
  test("resolveTokens (full IR, light)", async ({ bench }) => {
    await bench("resolveTokens (full IR, light)", () => {
      resolveTokens(ir, { mode: "light" });
    }).run();
  });

  test("resolveTokens (full IR, light-dark preserved)", async ({ bench }) => {
    await bench("resolveTokens (full IR, light-dark preserved)", () => {
      resolveTokens(ir);
    }).run();
  });

  test("makeResolver — one chained value", async ({ bench }) => {
    await bench("makeResolver — one chained value", () => {
      resolve(chainedValue);
    }).run();
  });
});

describe("drift checks", () => {
  test("extractInstuiRefs (whole stylesheet)", async ({ bench }) => {
    await bench("extractInstuiRefs (whole stylesheet)", () => {
      extractInstuiRefs(sheet);
    }).run();
  });

  test("danglingReferences (whole stylesheet)", async ({ bench }) => {
    await bench("danglingReferences (whole stylesheet)", () => {
      danglingReferences(sheet);
    }).run();
  });

  test("unknownReferences (stylesheet vs IR)", async ({ bench }) => {
    await bench("unknownReferences (stylesheet vs IR)", () => {
      unknownReferences(sheet, ir);
    }).run();
  });
});

describe("utility emitters", () => {
  test("colorUtilitiesCss", async ({ bench }) => {
    await bench("colorUtilitiesCss", () => {
      colorUtilitiesCss(colorNames, { prefix: "instui" });
    }).run();
  });

  test("tokenUtilitiesCss", async ({ bench }) => {
    await bench("tokenUtilitiesCss", () => {
      tokenUtilitiesCss(utilityGroups, { prefix: "instui" });
    }).run();
  });
});

describe("sanitizeSvg", () => {
  test("strip scripts and event handlers", async ({ bench }) => {
    await bench("strip scripts and event handlers", () => {
      sanitizeSvg(svg);
    }).run();
  });
});
