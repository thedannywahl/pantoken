// Benchmarks for `@pantoken/core` — the one source transformation every downstream package sits on.
// `buildTokens` reads the upstream Instructure design tokens + ui-icons and produces the canonical IR,
// so its cost is paid by every `vp run -r build`; the icon layer and the reference flattening that
// feeds the native lineage are measured separately so a regression can be attributed to a layer.
import { test, describe } from "vite-plus/test";
import { runBench } from "./run-bench.ts";
import { applyModify } from "../packages/core/src/color.ts";
import { buildTokens } from "../packages/core/src/build.ts";
import { collectIcons } from "../packages/core/src/icons.ts";
import { resolveReferences, toStyleDictionary } from "../packages/core/src/style-dictionary.ts";

const rebrand = buildTokens({ theme: "rebrand" });
const withoutIcons = buildTokens({ theme: "rebrand", includeIcons: false });

describe("buildTokens", () => {
  test("rebrand (with icons)", async () => {
    await runBench("rebrand (with icons)", () => {
      buildTokens({ theme: "rebrand" });
    });
  });

  test("rebrand (without icons)", async () => {
    await runBench("rebrand (without icons)", () => {
      buildTokens({ theme: "rebrand", includeIcons: false });
    });
  });

  test("canvas (without icons)", async () => {
    await runBench("canvas (without icons)", () => {
      buildTokens({ theme: "canvas", includeIcons: false });
    });
  });

  test("canvasHighContrast (without icons)", async () => {
    await runBench("canvasHighContrast (without icons)", () => {
      buildTokens({ theme: "canvasHighContrast", includeIcons: false });
    });
  });
});

describe("collectIcons", () => {
  test("all sources", async () => {
    await runBench("all sources", () => {
      collectIcons();
    });
  });

  test("instui glyphs only", async () => {
    await runBench("instui glyphs only", () => {
      collectIcons({ includeLucide: false });
    });
  });
});

describe("style-dictionary adapters", () => {
  test("resolveReferences (light, full IR)", async () => {
    await runBench("resolveReferences (light, full IR)", () => {
      resolveReferences(rebrand, "light");
    });
  });

  test("resolveReferences (dark, no icons)", async () => {
    await runBench("resolveReferences (dark, no icons)", () => {
      resolveReferences(withoutIcons, "dark");
    });
  });

  test("toStyleDictionary (light, no icons)", async () => {
    await runBench("toStyleDictionary (light, no icons)", () => {
      toStyleDictionary(withoutIcons, "light");
    });
  });
});

describe("applyModify", () => {
  test("alpha + darken over the palette", async () => {
    await runBench("alpha + darken over the palette", () => {
      for (const token of withoutIcons) {
        if (!token.value.startsWith("#")) continue;
        applyModify(token.value, { type: "alpha", value: 0.5, space: "hsl" });
        applyModify(token.value, { type: "darken", value: 0.2, space: "hsl" });
      }
    });
  });
});
