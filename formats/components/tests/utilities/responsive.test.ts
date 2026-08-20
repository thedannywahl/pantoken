import { expect, test } from "vite-plus/test";
import { responsiveUtilitiesCss } from "../../src/index.ts";
import { responsive } from "../../src/utilities/responsive/index.ts";
import { validate } from "../_validate.ts";

test("responsive: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(responsive);
});

test("responsive utilities emit viewport hidden-max/min classes at the tray-width breakpoint scale", () => {
  const css = responsiveUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(
    "@media (max-width: 48em) { .instui-hidden-max-lg, .instui-hidden-max-large, .instui-hidden-max-laptop { display: none !important; } }",
  );
  expect(css).toContain(
    "@media (min-width: 48em) { .instui-hidden-min-lg, .instui-hidden-min-large, .instui-hidden-min-laptop { display: none !important; } }",
  );
  expect(css).toContain(".instui-hidden-max-sm");
  expect(css).toContain(".instui-hidden-max-small");
  expect(css).toContain(".instui-hidden-max-phablet");
  expect(css).toContain(".instui-hidden-min-xl");
  expect(css).toContain(".instui-hidden-min-x-large");
  expect(css).toContain(".instui-hidden-min-desktop");
  // Container-query variants react to a marked container's width, not the viewport.
  expect(css).toContain(".instui-container { container-type: inline-size; }");
  expect(css).toContain(
    "@container (max-width: 48em) { .instui-cq-hidden-max-lg, .instui-cq-hidden-max-large, .instui-cq-hidden-max-laptop { display: none !important; } }",
  );
  expect(css).toContain(".instui-cq-hidden-min-lg");
});

test("responsive utilities emit show-max/min classes as the inverse of hidden-max/min", () => {
  const css = responsiveUtilitiesCss({ prefix: "instui" });
  // Hidden by default (one combined base rule covering every -show-*/-cq-show-* class)...
  expect(css).toMatch(/\.instui-show-max-sm,[^{]*\{ display: none !important; \}/);
  expect(css).toContain(".instui-cq-show-min-lg");
  // ...then revert()ed back to its natural display only inside the matching range.
  expect(css).toContain(
    "@media (max-width: 20em) { .instui-show-max-sm, .instui-show-max-small, .instui-show-max-phablet { display: revert !important; } }",
  );
  expect(css).toContain(
    "@media (min-width: 20em) { .instui-show-min-sm, .instui-show-min-small, .instui-show-min-phablet { display: revert !important; } }",
  );
  expect(css).toContain(
    "@container (max-width: 48em) { .instui-cq-show-max-lg, .instui-cq-show-max-large, .instui-cq-show-max-laptop { display: revert !important; } }",
  );
});

test("responsive utilities emit the unscaled, theme-dependent content breakpoints (no long-form/device aliases)", () => {
  const rebrand = responsiveUtilitiesCss({ prefix: "instui", theme: "rebrand" });
  expect(rebrand).toContain(
    "@media (max-width: 68.75em) { .instui-hidden-max-content { display: none !important; } }",
  );
  expect(rebrand).toContain(
    "@media (max-width: 98.75em) { .instui-hidden-max-content-full-width { display: none !important; } }",
  );
  expect(rebrand).not.toContain("hidden-max-content-small");

  const canvas = responsiveUtilitiesCss({ prefix: "instui", theme: "canvas" });
  expect(canvas).toContain(
    "@media (max-width: 59.25em) { .instui-hidden-max-content { display: none !important; } }",
  );
  expect(canvas).toContain(
    "@media (max-width: 59.25em) { .instui-hidden-max-content-full-width { display: none !important; } }",
  );
});

test("responsive utilities document every hide class, the breakpoint thresholds, and the tokens they consume", async () => {
  const { parseCssDocs } = await import("@cssdoc/core");
  const css = responsiveUtilitiesCss({ prefix: "instui" });
  const [entry] = parseCssDocs(css, {});

  // -hidden-max-*/-hidden-min-* (and their -cq- variants) are each documented, not just auto-derived.
  const canonical = entry.modifiers.find((m) => m.name === "-hidden-max-sm");
  expect(canonical?.description).toMatch(/`sm` breakpoint/);
  const cqCanonical = entry.modifiers.find((m) => m.name === "-cq-hidden-min-xl");
  expect(cqCanonical?.description).toMatch(/marked container/);

  // Long-form and device-name classes are documented as aliases of the short name.
  expect(entry.modifiers.find((m) => m.name === "-hidden-max-small")?.alias?.canonical).toBe(
    "-hidden-max-sm",
  );
  expect(entry.modifiers.find((m) => m.name === "-hidden-min-phablet")?.alias?.canonical).toBe(
    "-hidden-min-sm",
  );

  // -show-* are documented too, as the inverse of -hidden-*, with the same alias pattern.
  const showCanonical = entry.modifiers.find((m) => m.name === "-show-min-sm");
  expect(showCanonical?.description).toMatch(/-hidden-max-sm/);
  expect(entry.modifiers.find((m) => m.name === "-show-max-small")?.alias?.canonical).toBe(
    "-show-max-sm",
  );

  // The @media/@container conditions describe the breakpoint threshold, not visibility behavior.
  const condition = entry.conditions.find(
    (c) => c.type === "media" && c.query === "(min-width: 20em)",
  );
  expect(condition?.description).not.toMatch(/hide|hidden/i);
  expect(entry.conditions.every((c) => Boolean(c.description))).toBe(true);

  // The breakpoint scale is exposed as inspectable `@property` custom properties, each documented...
  expect(entry.cssPropertiesDeclared.map((p) => p.name)).toEqual(
    expect.arrayContaining([
      "--pantoken-bp-xs",
      "--pantoken-bp-sm",
      "--pantoken-bp-md",
      "--pantoken-bp-lg",
      "--pantoken-bp-xl",
      "--pantoken-bp-content",
      "--pantoken-bp-content-full-width",
    ]),
  );
  expect(entry.cssPropertiesDeclared.every((p) => Boolean(p.description))).toBe(true);
  expect(
    entry.cssPropertiesDeclared.find((p) => p.name === "--pantoken-bp-sm")?.description,
  ).toMatch(/--instui-component-tray-width-sm/);
  // ...and the scale tiers' real values consume the tray-width tokens (content tiers aren't IR-backed).
  expect(entry.cssPropertiesConsumed.map((t) => t.name)).toEqual(
    expect.arrayContaining([
      "--instui-component-tray-width-xs",
      "--instui-component-tray-width-sm",
      "--instui-component-tray-width-md",
      "--instui-component-tray-width-lg",
      "--instui-component-tray-width-xl",
    ]),
  );
});
