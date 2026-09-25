import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
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

test("no navy brand literal survives in a non-navy block of the real token set", () => {
  const css = customThemeColorsCss();
  for (const key of COLOR_KEYS) {
    if (key === "navy") continue;
    expect(blockFor(css, key)).not.toContain("#44709f");
  }
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
