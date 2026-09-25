import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import less from "less";
import postcss from "postcss";
import { themes } from "@pantoken/tokens";
import { resolveTokens } from "@pantoken/utils";

const oxideRoot = resolve(import.meta.dirname, "../oxide");
const generatedLessRoot = resolve(oxideRoot, "src/less/generated");
const outputRoot = resolve(import.meta.dirname, "../generated/skins");

/** Published UI and content stylesheet paths generated for each supported theme. */
export const SKIN_FILES = [
  "next-gen/skin.css",
  "next-gen/content.css",
  "canvas/skin.css",
  "canvas/content.css",
  "canvas-high-contrast/skin.css",
  "canvas-high-contrast/content.css",
] as const;

const LESS_TOKEN_VARIABLES = [
  ["background-color", "--instui-color-background-base"],
  ["base-value", "--instui-font-size-text-base"],
  ["color-black", "--instui-color-text-base"],
  ["color-tint", "--instui-color-background-brand"],
  // The primary button's text color specifically — unlike `color-black`/`color-white` (generic
  // page-text tokens that flip with the scheme independent of `color-tint`), this pairs with
  // `color-tint`'s own light/dark flip so the two always contrast, even where dark mode swaps
  // the brand color to a near-white pill.
  ["color-tint-text", "--instui-color-text-interactive-action-primary-base"],
  ["color-white", "--instui-color-text-on-color"],
  ["color-error", "--instui-color-background-error"],
  ["color-success", "--instui-color-background-success"],
  ["color-warning", "--instui-color-background-warning"],
  ["color-active", "--instui-color-background-interactive-action-primary-active"],
  ["color-active-text", "--instui-color-text-interactive-action-primary-active"],
  ["color-active-icon", "--instui-color-icon-interactive-action-primary-active"],
  ["border-color", "--instui-color-stroke-base"],
  ["border-color-light", "--instui-color-stroke-base"],
  ["text-color", "--instui-color-text-base"],
  ["text-color-muted", "--instui-color-text-muted"],
  ["panel-border-radius", "--instui-border-radius-md"],
  ["control-border-radius", "--instui-border-radius-sm"],
  ["keyboard-focus-outline-width", "--instui-border-width-interactive-focus"],
  ["keyboard-focus-outline-color", "--instui-color-stroke-interactive-focus-ring-base"],
  ["pad-xs", "--instui-spacing-space-xs"],
  ["pad-sm", "--instui-spacing-space-sm"],
  ["pad-md", "--instui-spacing-space-md"],
  ["pad-lg", "--instui-spacing-space-lg"],
  ["pad-xl", "--instui-spacing-space-xl"],
] as const;

type ThemeName = keyof typeof themes;

function writeTokenVariables(name: string, theme: ThemeName, mode: "light" | "dark"): void {
  const resolved = new Map(resolveTokens(themes[theme], { mode }));
  const lines = LESS_TOKEN_VARIABLES.map(([lessName, tokenName]) => {
    const value = resolved.get(tokenName);
    if (!value) throw new Error(`Missing ${tokenName} in ${theme} ${mode} token IR`);
    return `@${lessName}: ${value}; // ${tokenName}`;
  });
  mkdirSync(generatedLessRoot, { recursive: true });
  writeFileSync(resolve(generatedLessRoot, `${name}-tokens.less`), `${lines.join("\n")}\n`);
}

async function compileLess(relativePath: string): Promise<string> {
  const filename = resolve(oxideRoot, "src/less", relativePath);
  const source = readFileSync(filename, "utf8");
  const result = await less.render(source, {
    filename,
    paths: [oxideRoot],
  });
  return result.css;
}

function scopeDarkMode(css: string): string {
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    const parent = rule.parent;
    if (
      parent?.type === "atrule" &&
      (parent.name === "keyframes" || parent.name === "-webkit-keyframes")
    ) {
      return;
    }
    rule.selectors = rule.selectors.map(
      (selector) => `:root[data-pantoken-scheme="dark"] ${selector}`,
    );
  });
  return root.toString();
}

function writeSkin(name: string, file: "skin.css" | "content.css", css: string): void {
  const output = resolve(outputRoot, name, file);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${css.trim()}\n`);
  console.log(`wrote ${output}`);
}

async function generate(): Promise<void> {
  writeTokenVariables("next-gen-light", "rebrand", "light");
  writeTokenVariables("next-gen-dark", "rebrand", "dark");
  writeTokenVariables("canvas", "canvas", "light");
  writeTokenVariables("canvas-high-contrast", "canvasHighContrast", "light");

  const [
    nextGenLight,
    nextGenDark,
    nextGenContent,
    canvas,
    canvasContent,
    canvasHighContrast,
    canvasHighContrastContent,
  ] = await Promise.all([
    compileLess("skins/ui/next-gen/skin.less"),
    compileLess("skins/ui/next-gen-dark/skin.less"),
    compileLess("skins/content/next-gen/content.less"),
    compileLess("skins/ui/canvas/skin.less"),
    compileLess("skins/content/canvas/content.less"),
    compileLess("skins/ui/canvas-high-contrast/skin.less"),
    compileLess("skins/content/canvas-high-contrast/content.less"),
  ]);

  writeSkin("next-gen", "skin.css", `${nextGenLight}\n${scopeDarkMode(nextGenDark)}`);
  writeSkin("next-gen", "content.css", nextGenContent);
  writeSkin("canvas", "skin.css", canvas);
  writeSkin("canvas", "content.css", canvasContent);
  writeSkin("canvas-high-contrast", "skin.css", canvasHighContrast);
  writeSkin("canvas-high-contrast", "content.css", canvasHighContrastContent);
}

await generate();
