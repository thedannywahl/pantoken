// Benchmarks for `@pantoken/core` — the one source transformation every downstream package sits on.
// `buildTokens` reads the upstream Instructure design tokens + ui-icons and produces the canonical IR,
// so its cost is paid by every `vp run -r build`; the icon layer and the reference flattening that
// feeds the native lineage are measured separately so a regression can be attributed to a layer.
import { test, describe } from "vite-plus/test";
import { applyModify } from "../packages/core/src/color.ts";
import { buildTokens } from "../packages/core/src/build.ts";
import { collectIcons } from "../packages/core/src/icons.ts";
import { resolveReferences, toStyleDictionary } from "../packages/core/src/style-dictionary.ts";

const rebrand = buildTokens({ theme: "rebrand" });
const withoutIcons = buildTokens({ theme: "rebrand", includeIcons: false });

describe("buildTokens", () => {
  test("rebrand (with icons)", async ({ bench }) => {
    await bench("rebrand (with icons)", () => {
      buildTokens({ theme: "rebrand" });
    }).run();
  });

  test("rebrand (without icons)", async ({ bench }) => {
    await bench("rebrand (without icons)", () => {
      buildTokens({ theme: "rebrand", includeIcons: false });
    }).run();
  });

  test("canvas (without icons)", async ({ bench }) => {
    await bench("canvas (without icons)", () => {
      buildTokens({ theme: "canvas", includeIcons: false });
    }).run();
  });

  test("canvasHighContrast (without icons)", async ({ bench }) => {
    await bench("canvasHighContrast (without icons)", () => {
      buildTokens({ theme: "canvasHighContrast", includeIcons: false });
    }).run();
  });
});

describe("collectIcons", () => {
  test("all sources", async ({ bench }) => {
    await bench("all sources", () => {
      collectIcons();
    }).run();
  });

  test("instui glyphs only", async ({ bench }) => {
    await bench("instui glyphs only", () => {
      collectIcons({ includeLucide: false });
    }).run();
  });
});

describe("style-dictionary adapters", () => {
  test("resolveReferences (light, full IR)", async ({ bench }) => {
    await bench("resolveReferences (light, full IR)", () => {
      resolveReferences(rebrand, "light");
    }).run();
  });

  test("resolveReferences (dark, no icons)", async ({ bench }) => {
    await bench("resolveReferences (dark, no icons)", () => {
      resolveReferences(withoutIcons, "dark");
    }).run();
  });

  test("toStyleDictionary (light, no icons)", async ({ bench }) => {
    await bench("toStyleDictionary (light, no icons)", () => {
      toStyleDictionary(withoutIcons, "light");
    }).run();
  });
});

describe("applyModify", () => {
  test("alpha + darken over the palette", async ({ bench }) => {
    await bench("alpha + darken over the palette", () => {
      for (const token of withoutIcons) {
        if (!token.value.startsWith("#")) continue;
        applyModify(token.value, { type: "alpha", value: 0.5, space: "hsl" });
        applyModify(token.value, { type: "darken", value: 0.2, space: "hsl" });
      }
    }).run();
  });
});
