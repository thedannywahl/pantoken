// Benchmarks for `@pantoken/core` — the one source transformation every downstream package sits on.
// `buildTokens` reads the upstream Instructure design tokens + ui-icons and produces the canonical IR,
// so its cost is paid by every `vp run -r build`; the icon layer and the reference flattening that
// feeds the native lineage are measured separately so a regression can be attributed to a layer.
import { bench, describe } from "vite-plus/test";
import { applyModify } from "../packages/core/src/color.ts";
import { buildTokens } from "../packages/core/src/build.ts";
import { collectIcons } from "../packages/core/src/icons.ts";
import { resolveReferences, toStyleDictionary } from "../packages/core/src/style-dictionary.ts";

const rebrand = buildTokens({ theme: "rebrand" });
const withoutIcons = buildTokens({ theme: "rebrand", includeIcons: false });

describe("buildTokens", () => {
  bench("rebrand (with icons)", () => {
    buildTokens({ theme: "rebrand" });
  });

  bench("rebrand (without icons)", () => {
    buildTokens({ theme: "rebrand", includeIcons: false });
  });

  bench("canvas (without icons)", () => {
    buildTokens({ theme: "canvas", includeIcons: false });
  });

  bench("canvasHighContrast (without icons)", () => {
    buildTokens({ theme: "canvasHighContrast", includeIcons: false });
  });
});

describe("collectIcons", () => {
  bench("all sources", () => {
    collectIcons();
  });

  bench("instui glyphs only", () => {
    collectIcons({ includeLucide: false });
  });
});

describe("style-dictionary adapters", () => {
  bench("resolveReferences (light, full IR)", () => {
    resolveReferences(rebrand, "light");
  });

  bench("resolveReferences (dark, no icons)", () => {
    resolveReferences(withoutIcons, "dark");
  });

  bench("toStyleDictionary (light, no icons)", () => {
    toStyleDictionary(withoutIcons, "light");
  });
});

describe("applyModify", () => {
  bench("alpha + darken over the palette", () => {
    for (const token of withoutIcons) {
      if (!token.value.startsWith("#")) continue;
      applyModify(token.value, { type: "alpha", value: 0.5 });
      applyModify(token.value, { type: "darken", value: 0.2 });
    }
  });
});
