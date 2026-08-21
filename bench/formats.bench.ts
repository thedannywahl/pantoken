// Benchmarks for the emitters that turn the token IR into shippable files. These run on every
// `vp run -r build` and again for every theme variant, so they are the bulk of generation time:
// `toCss` walks the IR twice (typed `@property` registrations plus scoped declarations), while
// `toScss` and `toDtcg` each flatten the whole reference graph before emitting.
import { bench, describe } from "vite-plus/test";
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
  bench("rebrand (full sheet, with icons)", () => {
    toCss(rebrand);
  });

  bench("rebrand (lean sheet, no icons)", () => {
    toCss(rebrandLean);
  });

  bench("rebrand (lean sheet, foundation plugin)", () => {
    toCss(rebrandLean, { plugins: [foundationPlugin] });
  });

  bench("canvas (lean sheet, scoped)", () => {
    toCss(canvas, { scope: '[class*="instui"]' });
  });
});

describe("buildCssFile", () => {
  bench("properties + declarations", () => {
    buildCssFile({ comments: [], scope: ":root", properties, sections: [{ pairs: declarations }] });
  });
});

describe("themedTokens", () => {
  bench("rebrand light-only, no icons", () => {
    themedTokens("rebrand", { includeIcons: false, lightOnly: true });
  });

  bench("canvasHighContrast, icons filtered out", () => {
    themedTokens("canvasHighContrast", { includeIcons: false });
  });
});

describe("toScss", () => {
  bench("rebrand (light)", () => {
    toScss(rebrandLean, { mode: "light" });
  });
});

describe("toDtcg", () => {
  bench("rebrand (light)", () => {
    toDtcg(rebrandLean, "light");
  });

  bench("rebrand (dark)", () => {
    toDtcg(rebrandLean, "dark");
  });
});
