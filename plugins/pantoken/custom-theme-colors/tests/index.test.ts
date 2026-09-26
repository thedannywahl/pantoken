import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import { customThemeColors, customThemeColorsCss, COLOR_KEYS } from "../src/index.ts";

test("is a css-only plugin", () => {
  expect(capabilitiesOf(customThemeColors())).toEqual(["css"]);
});

test("emits rules for all color namespaces and only instui tokens", () => {
  const css = customThemeColorsCss();
  for (const key of COLOR_KEYS) {
    expect(css).toContain(`:root[data-pantoken-color="${key}"]`);
    expect(css).toContain("--instui-primitive-color-navy-navy10:");
    expect(css).toContain("--instui-primitive-color-blue-blue10:");
    expect(css).toContain("--instui-color-background-accent-blue:");
  }
  expect(css).not.toContain("--vp-");
});

test("navy/blue blocks skip self-referencing overrides instead of emitting circular vars", () => {
  const css = customThemeColorsCss();
  const navyBlock = css.match(/:root\[data-pantoken-color="navy"\] \{[^}]*\}/u)?.[0] ?? "";
  const blueBlock = css.match(/:root\[data-pantoken-color="blue"\] \{[^}]*\}/u)?.[0] ?? "";
  expect(navyBlock).not.toContain(
    "--instui-primitive-color-navy-navy10: var(--instui-primitive-color-navy-navy10);",
  );
  expect(blueBlock).not.toContain(
    "--instui-primitive-color-blue-blue10: var(--instui-primitive-color-blue-blue10);",
  );
});

test("preserves semantic status colors when blue primitives are remapped", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-blue-blue100", "#2b7abc"],
      ["--instui-primitive-color-blue-blue140", "#1d354f"],
      ["--instui-color-background-info", "var(--instui-primitive-color-blue-blue100)"],
      ["--instui-color-background-pastel-info", "var(--instui-primitive-color-blue-blue140)"],
      ["--instui-color-stroke-info", "var(--instui-primitive-color-blue-blue100)"],
      ["--instui-color-text-info", "var(--instui-primitive-color-blue-blue140)"],
      ["--instui-color-icon-info", "var(--instui-primitive-color-blue-blue140)"],
    ]),
  );

  for (const key of COLOR_KEYS) {
    expect(css).toContain(`:root[data-pantoken-color="${key}"]`);
    expect(css).toContain("--instui-color-background-info: #2b7abc;");
    expect(css).toContain("--instui-color-background-pastel-info: #1d354f;");
    expect(css).toContain("--instui-color-stroke-info: #2b7abc;");
    expect(css).toContain("--instui-color-text-info: #1d354f;");
    expect(css).toContain("--instui-color-icon-info: #1d354f;");
  }
});

test("plugin css hook appends rules", () => {
  const plugin = customThemeColors();
  const out = plugin.css?.({ tokens: [], css: "" });
  expect(out && "append" in out ? out.append : "").toContain(':root[data-pantoken-color="navy"]');
});

const blockFor = (css: string, key: string): string =>
  css.match(new RegExp(`:root\\[data-pantoken-color="${key}"\\] \\{[^}]*\\}`, "u"))?.[0] ?? "";

test("relinks literal brand hex values to the selected scale", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy110", "#44709f"],
      ["--instui-color-background-interactive-action-secondary-base", "#44709f33"],
      ["--instui-color-background-interactive-action-secondary-active", "#44709f26"],
      ["--instui-color-stroke-interactive-action-secondary-base", "#44709f00"],
    ]),
  );

  const green = blockFor(css, "green");
  expect(green).toContain(
    "--instui-color-background-interactive-action-secondary-base: color-mix(in srgb, var(--instui-primitive-color-green-green110) 20%, transparent);",
  );
  expect(green).toContain(
    "--instui-color-background-interactive-action-secondary-active: color-mix(in srgb, var(--instui-primitive-color-green-green110) 14.9%, transparent);",
  );
  expect(green).toContain(
    "--instui-color-stroke-interactive-action-secondary-base: color-mix(in srgb, var(--instui-primitive-color-green-green110) 0%, transparent);",
  );
});

test("relinks both sides of a light-dark() value and leaves non-brand colors alone", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy110", "#44709f"],
      ["--instui-primitive-color-navy-navy150", "#234465"],
      ["--instui-color-background-x", "light-dark(#44709f33, #234465)"],
      ["--instui-color-shadow-x", "0 1px 2px rgba(0,0,0,0.3)"],
    ]),
  );

  const red = blockFor(css, "red");
  expect(red).toContain(
    "--instui-color-background-x: light-dark(color-mix(in srgb, var(--instui-primitive-color-red-red110) 20%, transparent), var(--instui-primitive-color-red-red150));",
  );
  expect(red).not.toContain("--instui-color-shadow-x:");
});

test("leaves brand literals untouched in their own namespace block", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy110", "#44709f"],
      ["--instui-color-background-interactive-action-secondary-base", "#44709f33"],
    ]),
  );

  expect(blockFor(css, "navy")).not.toContain(
    "--instui-color-background-interactive-action-secondary-base:",
  );
  expect(blockFor(css, "sea")).toContain(
    "--instui-color-background-interactive-action-secondary-base:",
  );
});

test("does not relink literals inside icon data URIs", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy110", "#44709f"],
      ["--instui-icon-thing", `url("data:image/svg+xml,<svg fill='#44709f'></svg>")`],
    ]),
  );

  expect(css).not.toContain("--instui-icon-thing:");
});

test("does not relink preserved blue accents or status intents", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-blue-blue100", "#2b7abc"],
      ["--instui-color-background-accent-blue", "#2b7abc"],
      ["--instui-color-background-info", "#2b7abc"],
    ]),
  );

  const plum = blockFor(css, "plum");
  expect(plum).toContain("--instui-color-background-accent-blue: #2b7abc;");
  expect(plum).toContain("--instui-color-background-info: #2b7abc;");
  expect(plum).not.toContain("--instui-color-background-accent-blue: var(");
  expect(plum).not.toContain("--instui-color-background-info: var(");
});

test("relinks rgba() and shorthand hex forms, and ignores malformed literals", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy150", "#234465"],
      ["--instui-primitive-color-navy-navy60", "#aabbcc"],
      ["--instui-color-background-rgba-x", "rgba(35,68,101,0.15)"],
      ["--instui-color-short-x", "#abc"],
      ["--instui-color-broken-x", "#12345"],
    ]),
  );

  const sky = blockFor(css, "sky");
  expect(sky).toContain(
    "--instui-color-background-rgba-x: color-mix(in srgb, var(--instui-primitive-color-sky-sky150) 15%, transparent);",
  );
  expect(sky).toContain("--instui-color-short-x: var(--instui-primitive-color-sky-sky60);");
  expect(sky).not.toContain("--instui-color-broken-x:");
});

test("does not relink elevation shadow colors", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy150", "#234465"],
      ["--instui-color-drop-shadow-shadow-color1", "rgba(35,68,101,0.15)"],
    ]),
  );

  expect(css).not.toContain("--instui-color-drop-shadow-shadow-color1:");
});

// Tokens that are *meant* to stay blue when the brand scale moves: the explicitly-named blue
// accents, the blue chart ramp, and the status intents.
const KEEPS_ITS_BLUE = /(?:-accent-blue|-blue-color\d+|-(?:info|success|warning|error))$/u;

/** The hue/saturation envelope of the navy + blue steps, read from the token set itself. */
function brandEnvelope(): { minHue: number; maxHue: number; minSaturation: number } {
  const hues: number[] = [];
  const saturations: number[] = [];
  for (const token of byTheme("rebrand")) {
    if (!/^--instui-primitive-color-(?:navy-navy|blue-blue)\d+$/u.test(token.name)) continue;
    const hsl = toHsl(token.value);
    if (!hsl) continue;
    hues.push(hsl.hue);
    saturations.push(hsl.saturation);
  }
  return {
    minHue: Math.min(...hues),
    maxHue: Math.max(...hues),
    minSaturation: Math.min(...saturations),
  };
}

function toHsl(literal: string): { hue: number; saturation: number } | undefined {
  const body = /^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/iu.exec(literal.trim())?.[1];
  if (!body) return undefined;
  const [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(body.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (max === min) return { hue: 0, saturation: 0 };
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  if (max === r) hue = (g - b) / delta + (g < b ? 6 : 0);
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  return { hue: (hue / 6) * 360, saturation };
}

test("no brand-hue literal survives unthemed in a non-navy block of the real token set", () => {
  const { minHue, maxHue, minSaturation } = brandEnvelope();
  const css = customThemeColorsCss();
  const offenders: string[] = [];

  for (const key of COLOR_KEYS) {
    if (key === "navy") continue;
    for (const line of blockFor(css, key).split("\n")) {
      const [name, ...rest] = line.split(":");
      const value = rest.join(":");
      if (!value || KEEPS_ITS_BLUE.test(name.trim())) continue;
      for (const literal of value.match(/#[0-9a-f]{3,8}/giu) ?? []) {
        const hsl = toHsl(literal);
        if (!hsl || hsl.saturation < minSaturation / 2) continue;
        if (hsl.hue >= minHue - 2 && hsl.hue <= maxHue + 2)
          offenders.push(`${key}: ${line.trim()}`);
      }
    }
  }

  expect(offenders).toEqual([]);
});

test("scopes conditional rules under a custom selector instead of :root", () => {
  const css = customThemeColorsCss(undefined, { selector: "#chrome" });
  expect(css).toContain('#chrome[data-pantoken-color="green"]');
  expect(css).not.toContain(':root[data-pantoken-color="green"]');
});

test("supports attribute-only rules for editable content wrappers", () => {
  const css = customThemeColorsCss(undefined, { selector: "" });
  expect(css).toContain('[data-pantoken-color="sea"]');
  expect(css).not.toContain(':root[data-pantoken-color="sea"]');
});

test("emits an unconditional reset block pinning true base colors under resetSelector", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy70", "#123456"],
      ["--instui-primitive-color-blue-blue70", "#654321"],
    ]),
    { resetSelector: "#theme-tray" },
  );
  const reset = css.match(/#theme-tray \{[^}]*\}/u)?.[0] ?? "";
  expect(reset).toContain("--instui-primitive-color-navy-navy70: #123456;");
  expect(reset).toContain("--instui-primitive-color-blue-blue70: #654321;");
  // Unconditional — no `[data-pantoken-color="…"]` attribute gate on the reset selector itself.
  expect(reset).not.toContain("data-pantoken-color");
});

test("reset block restores literal brand values relinked elsewhere in the sheet", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-navy-navy110", "#44709f"],
      ["--instui-color-background-interactive-action-secondary-base", "#44709f33"],
    ]),
    { resetSelector: "#theme-tray" },
  );
  const green = blockFor(css, "green");
  expect(green).toContain(
    "--instui-color-background-interactive-action-secondary-base: color-mix(in srgb, var(--instui-primitive-color-green-green110) 20%, transparent);",
  );
  const reset = css.match(/#theme-tray \{[^}]*\}/u)?.[0] ?? "";
  expect(reset).toContain(
    "--instui-color-background-interactive-action-secondary-base: #44709f33;",
  );
});
