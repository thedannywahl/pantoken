import { expect, test } from "vite-plus/test";
import {
  CUSTOM_COLOR_KEY,
  customColorCss,
  customColorReferenceCurve,
  customColorRemapCss,
  customThemeColors,
  customThemeColorsCss,
  deriveCustomColorScale,
  deriveScale,
  isHexColor,
  parseHexColor,
} from "../src/index.ts";
import { hexToOklch } from "../src/custom-scale.ts";

const STEPS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
];

function channels(hex: string): number[] {
  return [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
}

test("parseHexColor normalizes short and long hex", () => {
  expect(parseHexColor("#CCC")).toBe("#cccccc");
  expect(parseHexColor("2B7ABC")).toBe("#2b7abc");
  expect(parseHexColor("  #abcdef ")).toBe("#abcdef");
});

test("parseHexColor rejects anything that isn't a 3- or 6-digit hex", () => {
  for (const bad of ["", "#ccccc", "#cccccccc", "red", "#ggg", "#fff;}body{color:red", "url(x)"]) {
    expect(() => parseHexColor(bad)).toThrow(TypeError);
    expect(isHexColor(bad)).toBe(false);
  }
  expect(isHexColor(42)).toBe(false);
});

test("#cccccc anchors at step 40 and derives a neutral scale", () => {
  const scale = deriveCustomColorScale("#cccccc");
  expect(scale.input).toBe("#cccccc");
  expect(scale.anchorStep).toBe(40);
  expect([...scale.steps.keys()]).toEqual(STEPS);
  for (const hex of scale.steps.values()) {
    const [r, g, b] = channels(hex);
    expect(Math.max(r!, g!, b!) - Math.min(r!, g!, b!)).toBeLessThanOrEqual(1);
  }
  const anchor = channels(scale.steps.get(40)!);
  expect(Math.abs(anchor[0]! - 0xcc)).toBeLessThanOrEqual(8);
});

test("white and black anchor at the scale ends", () => {
  expect(deriveCustomColorScale("#fff").anchorStep).toBe(10);
  expect(deriveCustomColorScale("#000").anchorStep).toBe(200);
});

test("derived steps darken monotonically and keep the input hue", () => {
  const input = "#e62429";
  const scale = deriveCustomColorScale(input);
  const colors = [...scale.steps.values()].map(hexToOklch);
  for (let i = 1; i < colors.length; i += 1) {
    expect(colors[i]!.l).toBeLessThan(colors[i - 1]!.l);
  }
  const hue = hexToOklch(input).h;
  expect(Math.abs(hexToOklch(scale.steps.get(scale.anchorStep)!).h - hue)).toBeLessThan(0.05);
  for (const hex of scale.steps.values()) expect(hex).toMatch(/^#[0-9a-f]{6}$/u);
});

test("the anchor lands on its step's reference lightness, not a shipped primitive", () => {
  const scale = deriveCustomColorScale("#2b7abc");
  expect(scale.anchorStep).toBe(100);
  expect(scale.steps.get(100)).not.toBe("#2b7abc");
});

test("customColorCss declares the derived primitives and remaps navy and blue onto them", () => {
  const css = customColorCss("#cccccc", { selector: "" });
  expect(css.startsWith(`[data-pantoken-color="${CUSTOM_COLOR_KEY}"] {`)).toBe(true);
  for (const step of STEPS) {
    expect(css).toMatch(new RegExp(`--instui-primitive-color-custom-custom${step}: #[0-9a-f]{6};`));
  }
  expect(css).toContain(
    "--instui-primitive-color-navy-navy10: var(--instui-primitive-color-custom-custom10);",
  );
  expect(css).toContain(
    "--instui-primitive-color-blue-blue200: var(--instui-primitive-color-custom-custom200);",
  );
  expect(() => customColorCss("#fff}")).toThrow(TypeError);
});

test("customThemeColorsCss only appends the custom rule when a hex is supplied", () => {
  expect(customThemeColorsCss()).not.toContain(`[data-pantoken-color="custom"]`);
  const css = customThemeColorsCss(undefined, { custom: "#2b7abc" });
  expect(css).toContain(`:root[data-pantoken-color="custom"]`);
  expect(css.startsWith(customThemeColorsCss())).toBe(true);
});

test("a JSON round-tripped reference curve derives the same scale", () => {
  const curve = JSON.parse(JSON.stringify(customColorReferenceCurve()));
  expect(curve.steps).toEqual(STEPS);
  expect([...deriveScale("#e62429", curve).steps]).toEqual([
    ...deriveCustomColorScale("#e62429").steps,
  ]);
});

test("customColorRemapCss remaps onto custom primitives without declaring them", () => {
  const css = customColorRemapCss();
  expect(css.startsWith(`:root[data-pantoken-color="custom"] {`)).toBe(true);
  expect(css).toContain(
    "--instui-primitive-color-navy-navy10: var(--instui-primitive-color-custom-custom10);",
  );
  expect(css).not.toMatch(/--instui-primitive-color-custom-custom10:/u);
});

test("the plugin forwards the custom option", () => {
  const plugin = customThemeColors({ custom: "#cccccc" });
  const result = plugin.css?.({ tokens: undefined } as never) as { append: string };
  expect(result.append).toContain(`:root[data-pantoken-color="custom"]`);
});
