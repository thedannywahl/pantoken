// Benchmarks for the emitters that turn the token IR into shippable files. These run on every
// `vp run -r build` and again for every theme variant, so they are the bulk of generation time:
// `toCss` walks the IR twice (typed `@property` registrations plus scoped declarations), while
// `toScss` and `toDtcg` each flatten the whole reference graph before emitting.
import { test, describe } from "vite-plus/test";
import { buildCssFile } from "../formats/css/src/emit.ts";
import { themedTokens } from "../formats/css/src/theme-variants.ts";
import { toCss } from "../formats/css/src/to-css.ts";
import { toDtcg } from "../formats/dtcg/src/transform.ts";
import { toScss } from "../formats/scss/src/to-scss.ts";
import { foundationPlugin } from "../formats/css/src/foundation.ts";

const rebrand = themedTokens("rebrand");
const rebrandLean = themedTokens("rebrand", { includeIcons: false });
const canvas = themedTokens("canvas", { includeIcons: false });

const properties = rebrandLean
  .filter((t) => !t.value.includes("var(") && !t.value.includes("light-dark("))
  .map((t) => ({ name: t.name, syntax: t.syntax, value: t.value }));
const declarations: [string, string][] = rebrandLean
  .filter((t) => t.value.includes("var(") || t.value.includes("light-dark("))
  .map((t) => [t.name, t.value]);

describe("toCss", () => {
  test("rebrand (full sheet, with icons)", async ({ bench }) => {
    await bench("rebrand (full sheet, with icons)", () => {
      toCss(rebrand);
    }).run();
  });

  test("rebrand (lean sheet, no icons)", async ({ bench }) => {
    await bench("rebrand (lean sheet, no icons)", () => {
      toCss(rebrandLean);
    }).run();
  });

  test("rebrand (lean sheet, foundation plugin)", async ({ bench }) => {
    await bench("rebrand (lean sheet, foundation plugin)", () => {
      toCss(rebrandLean, { plugins: [foundationPlugin] });
    }).run();
  });

  test("canvas (lean sheet, scoped)", async ({ bench }) => {
    await bench("canvas (lean sheet, scoped)", () => {
      toCss(canvas, { scope: '[class*="instui"]' });
    }).run();
  });
});

describe("buildCssFile", () => {
  test("properties + declarations", async ({ bench }) => {
    await bench("properties + declarations", () => {
      buildCssFile({
        comments: [],
        scope: ":root",
        properties,
        sections: [{ pairs: declarations }],
      });
    }).run();
  });
});

describe("themedTokens", () => {
  test("rebrand light-only, no icons", async ({ bench }) => {
    await bench("rebrand light-only, no icons", () => {
      themedTokens("rebrand", { includeIcons: false, lightOnly: true });
    }).run();
  });

  test("canvasHighContrast, icons filtered out", async ({ bench }) => {
    await bench("canvasHighContrast, icons filtered out", () => {
      themedTokens("canvasHighContrast", { includeIcons: false });
    }).run();
  });
});

describe("toScss", () => {
  test("rebrand (light)", async ({ bench }) => {
    await bench("rebrand (light)", () => {
      toScss(rebrandLean, { mode: "light" });
    }).run();
  });
});

describe("toDtcg", () => {
  test("rebrand (light)", async ({ bench }) => {
    await bench("rebrand (light)", () => {
      toDtcg(rebrandLean, "light");
    }).run();
  });

  test("rebrand (dark)", async ({ bench }) => {
    await bench("rebrand (dark)", () => {
      toDtcg(rebrandLean, "dark");
    }).run();
  });
});
