import { expect, test } from "vite-plus/test";
import { definePlugin } from "@pantoken/plugin-kit";
import { defineToken } from "../src/plugin.ts";
import { buildTokens, buildTokensFromRoot, TokenModifierError } from "../src/build.ts";

const tokens = buildTokens({ theme: "rebrand" });
const byName = new Map(tokens.map((t) => [t.name, t]));

test("builds a large IR with the expected token layers", () => {
  expect(tokens.length).toBeGreaterThan(1000);
  expect(tokens.some((t) => t.name.startsWith("--instui-primitive-"))).toBe(true);
  expect(tokens.some((t) => t.name.startsWith("--instui-color-"))).toBe(true);
  expect(tokens.some((t) => t.name.startsWith("--instui-component-"))).toBe(true);
});

test("a semantic colour token is typed <color> and themes via light-dark only when needed", () => {
  const bg = byName.get("--instui-color-background-base");
  expect(bg).toBeDefined();
  // background-base resolves to a reference (var) or a light-dark of references — either way
  // its logical type is colour; contextual values carry syntax "*".
  expect(["<color>", "*"]).toContain(bg?.syntax);
  for (const t of tokens) {
    if (t.value.startsWith("light-dark(")) expect(t.themed).toBe(true);
  }
});

test("materializes upstream modifiers after resolving references and theme branches", () => {
  const mobileNav = byName.get("--instui-color-background-mobile-nav");
  const secondary = byName.get("--instui-color-institutional-brand-button-secondary-bgd");
  const hover = byName.get("--instui-component-base-button-primary-hover-background");
  const alertBorder = byName.get("--instui-component-alert-info-border-color-inline");

  for (const token of [mobileNav, secondary, hover, alertBorder]) {
    expect(token).toBeDefined();
    expect(token?.flatValue ?? token?.value).not.toContain("var(");
    expect(token?.meta).toBeUndefined();
  }
  expect(alertBorder?.flatValue ?? alertBorder?.value).toMatch(
    /^light-dark\(#[0-9a-f]{8}, #[0-9a-f]{8}\)$|^#[0-9a-f]{8}$/i,
  );
});

test("a modified colour keeps its var() origin in value and its literal in flatValue", () => {
  const secondary = byName.get("--instui-color-institutional-brand-button-secondary-bgd");
  expect(secondary?.value).toBe(
    "light-dark(color-mix(in srgb, var(--instui-primitive-color-navy-navy110) 20%, transparent), color-mix(in srgb, var(--instui-primitive-color-navy-navy60) 30%, transparent))",
  );
  expect(secondary?.flatValue).toBe("light-dark(#44709f33, #86a8d54d)");

  // A modifier over an already-themed reference collapses to one expression: the origin var()
  // carries the light/dark split, so `themed` has to come from the flattened pair.
  const hoverBackground = byName.get("--instui-component-base-button-secondary-hover-background");
  expect(hoverBackground?.value).toBe(
    "hsl(from var(--instui-color-institutional-brand-button-secondary-bgd) h s calc(l + (100 - l) * 0.1))",
  );
  expect(hoverBackground?.flatValue).toBe("light-dark(#4d7eb333, #92b1d94d)");
  expect(hoverBackground?.themed).toBe(true);
});

test("materializes the upstream canvas TextInput LCH modifier", () => {
  const canvas = buildTokens({ theme: "canvas", includeIcons: false });
  const disabledArrowBorder = canvas.find(
    ({ name }) => name === "--instui-component-text-input-arrows-border-disabled-color",
  );
  expect(disabledArrowBorder?.flatValue).toBe("#d7d9da");
  expect(disabledArrowBorder?.value).toBe(
    "lch(from var(--instui-color-institutional-brand-button-secondary-bgd) calc(l * 0.9) c h)",
  );
});

const modifier = (type: "alpha" | "darken" | "lighten", value = "0.5") => ({
  "studio.tokens": { modify: { type, value, space: "hsl" } },
});

function rootWithPrimitives(primitives: Record<string, unknown>): Record<string, any> {
  return {
    primitives: { default: primitives },
    rebrand: {
      semantic: {
        layout: { default: { semantic: {} } },
        color: { rebrandLight: { semantic: {} }, rebrandDark: { semantic: {} } },
      },
      component: {},
    },
  };
}

test("resolves chained modifiers from the terminal colour outward", () => {
  const root = rootWithPrimitives({
    color: {
      base: { value: "#808080", type: "color" },
      dark: {
        value: "{color.base}",
        type: "color",
        $extensions: modifier("darken"),
      },
      wash: {
        value: "{color.dark}",
        type: "color",
        $extensions: modifier("alpha", "0.25"),
      },
    },
  });
  const built = buildTokensFromRoot(root, { includeIcons: false });
  const wash = built.find((token) => token.name.endsWith("color-wash"));
  expect(wash?.flatValue).toBe("#40404040");
  expect(wash?.value).toBe(
    "color-mix(in srgb, var(--instui-primitive-color-dark) 25%, transparent)",
  );
});

test("aggregates malformed, non-colour, missing, and cyclic modifier failures", () => {
  const root = rootWithPrimitives({
    color: {
      malformed: {
        value: "#fff",
        type: "color",
        $extensions: { "studio.tokens": { modify: { type: "mix", value: "2" } } },
      },
      missing: {
        value: "{color.absent}",
        type: "color",
        $extensions: modifier("alpha"),
      },
      cycleA: {
        value: "{color.cycleB}",
        type: "color",
        $extensions: modifier("darken"),
      },
      cycleB: { value: "{color.cycleA}", type: "color" },
      wrongType: {
        value: "{spacing.base}",
        type: "color",
        $extensions: modifier("lighten"),
      },
    },
    spacing: { base: { value: "1rem", type: "dimension" } },
  });

  expect(() => buildTokensFromRoot(root, { includeIcons: false })).toThrow(TokenModifierError);
  try {
    buildTokensFromRoot(root, { includeIcons: false });
  } catch (error) {
    const reasons = (error as TokenModifierError).issues.map((issue) => issue.reason);
    expect(reasons.some((reason) => reason.includes("modify.type"))).toBe(true);
    expect(reasons.some((reason) => reason.includes("missing token"))).toBe(true);
    expect(reasons.some((reason) => reason.includes("cycle"))).toBe(true);
    expect(reasons.some((reason) => reason.includes('type "dimension"'))).toBe(true);
  }
});

test("allows validation tooling to supply a reviewed modifier replacement", () => {
  const root = rootWithPrimitives({
    color: {
      bad: {
        value: "#fff",
        type: "color",
        $extensions: { "studio.tokens": { modify: { type: "mix", value: "0.5" } } },
      },
    },
  });
  const issues: unknown[] = [];
  const built = buildTokensFromRoot(root, {
    includeIcons: false,
    resolveModifierIssue: (issue) => {
      issues.push(issue);
      return "#123456";
    },
  });
  expect(issues).toHaveLength(2);
  expect(built[0]?.value).toBe("#123456");
});

test("icons are rolled in as <image> tokens with metadata", () => {
  const icons = tokens.filter((t) => t.meta?.kind === "icon");
  expect(icons.length).toBeGreaterThan(500);

  const arrowLeft = byName.get("--instui-icon-arrow-left");
  expect(arrowLeft?.syntax).toBe("<image>");
  expect(arrowLeft?.value.startsWith("url('data:image/svg+xml")).toBe(true);
  expect(arrowLeft?.meta?.bidirectional).toBe(true);

  // A Custom (Instructure-authored) glyph is present.
  expect(byName.has("--instui-icon-canvas-logo")).toBe(true);
});

test("plugin token hooks inject at the token layer", () => {
  const focus = definePlugin({
    name: "focus",
    tokens: ({ tokens }) => [
      ...tokens,
      defineToken({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
    ],
  });
  // The hook behavior is independent of icon collection, so skip icons here for speed/stability.
  const withFocus = buildTokens({ theme: "rebrand", plugins: [focus], includeIcons: false });
  expect(withFocus.some((t) => t.name === "--instui-focus-color")).toBe(true);
  // Without the plugin, the token is absent — proving injection is opt-in.
  expect(tokens.some((t) => t.name === "--instui-focus-color")).toBe(false);
});
