import { expect, test } from "vite-plus/test";
import { alpha, darken, lighten, onColor, overlayColors } from "../src/index.ts";

test("alpha sets opacity via color-mix with transparent", () => {
  expect(alpha("var(--brand)", 10)).toBe("color-mix(in srgb, var(--brand) 10%, transparent)");
  expect(alpha("#1d354f", 28)).toBe("color-mix(in srgb, #1d354f 28%, transparent)");
});

test("darken/lighten adjust HSL lightness via relative color syntax (l is a 0-100 number)", () => {
  expect(darken("var(--brand)", 10)).toBe("hsl(from var(--brand) h s calc(l - 10))");
  expect(darken("var(--brand)")).toBe("hsl(from var(--brand) h s calc(l - 10))"); // default 10
  expect(lighten("var(--brand)", 15)).toBe("hsl(from var(--brand) h s calc(l + 15))");
});

test("helpers nest — alpha(darken(...)) mirrors InstUI's ghost hover derivation", () => {
  expect(alpha(darken("var(--brand)", 10), 10)).toBe(
    "color-mix(in srgb, hsl(from var(--brand) h s calc(l - 10)) 10%, transparent)",
  );
});

test("overlayColors flattens an overlay over an opaque base", () => {
  expect(overlayColors("var(--surface)", "var(--brand)", 12)).toBe(
    "color-mix(in srgb, var(--brand) 12%, var(--surface))",
  );
});

test("onColor snaps to black/white contrast for content on a surface", () => {
  expect(onColor("var(--brand)")).toBe(
    "oklch(from var(--brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)",
  );
  expect(onColor("#1d354f", 0.5)).toBe("oklch(from #1d354f clamp(0, (0.5 - l) * infinity, 1) 0 0)");
});
