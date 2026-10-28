import { makeResolver, SCOPE_LAYERS } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

/** System defaults stay below explicit scheme pins, even when the component reset isn't loaded. */
export function systemSchemeCss(): string {
  return `@layer ${SCOPE_LAYERS.join(", ")};\n@layer pantoken.base {\n  :where(:root) { color-scheme: light dark; }\n}`;
}

/**
 * Composite translucent surface colors against a semantic surface, without changing text, glyphs,
 * intentional empty backgrounds, or the brand colors used to tint the surface.
 */
function opaqueSurface(
  value: string,
  base: string,
  tokens: ReadonlyMap<string, Token>,
  visiting = new Set<string>(),
): string {
  let result = value.replace(/var\((--[\w-]+)\)/gu, (reference, name: string) => {
    const token = tokens.get(name);
    if (!token) return reference;
    if (visiting.has(name)) throw new Error(`Circular surface token reference: ${name}`);
    const next = new Set(visiting).add(name);
    const opaque = opaqueSurface(token.value, base, tokens, next);
    return opaque === token.value ? reference : opaque;
  });
  if (result.includes("color-mix(")) result = result.replace(/\btransparent\b/gu, base);
  result = result.replace(
    /rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*(0?\.\d+)\s*\)/gu,
    (original, r: string, g: string, b: string, alpha: string) =>
      Number(alpha) === 0
        ? original
        : `color-mix(in srgb, rgb(${r} ${g} ${b}) ${Number(alpha) * 100}%, ${base})`,
  );
  return result.replace(
    /#([\da-f]{6})([\da-f]{2})\b/giu,
    (original, rgb: string, alpha: string) => {
      const opacity = Number.parseInt(alpha, 16);
      if (opacity === 0 || opacity === 255) return original;
      return `color-mix(in srgb, #${rgb} ${(opacity / 255) * 100}%, ${base})`;
    },
  );
}

function mediaBlock(
  query: string,
  scope: string,
  layer: string | undefined,
  pairs: readonly [string, string][],
): string {
  if (pairs.length === 0) return "";
  const rule = `${scope} {\n${pairs.map(([name, value]) => `  ${name}: ${value};`).join("\n")}\n}`;
  return `@media (${query}) {\n${layer ? `@layer ${layer} {\n${rule}\n}` : rule}\n}`;
}

/** Automatic preferences for the active token scope; no alternate theme or enabling class. */
export function tokenPreferenceCss(
  tokens: readonly Token[],
  scope: string,
  layer?: string,
): string {
  const byName = new Map(tokens.map((token) => [token.name, token]));
  const resolve = makeResolver(tokens);
  const opaque: [string, string][] = [];
  const more: [string, string][] = [];
  const less: [string, string][] = [];
  for (const token of tokens) {
    if (!token.name.startsWith("--instui-")) continue;
    if (
      /(?:border-(?:width|size)|focus-outline-width)(?:-|$)/u.test(token.name) &&
      !/^0(?:px|em|rem)?$/u.test(resolve(token.value).trim())
    ) {
      more.push([
        token.name,
        `max(${token.name.includes("focus-outline") ? "3px" : "2px"}, ${token.value})`,
      ]);
    }
    if (token.name.startsWith("--instui-color-drop-shadow-"))
      less.push([token.name, "transparent"]);
    if (!token.name.includes("background")) continue;
    const base = token.name.includes("on-color")
      ? "var(--instui-color-background-brand)"
      : token.name.includes("inverse") || token.name.endsWith("overlay-dark")
        ? "var(--instui-color-background-inverse)"
        : "var(--instui-color-background-base)";
    const value = opaqueSurface(token.value, base, byName, new Set([token.name]));
    if (value !== token.value) opaque.push([token.name, value]);
  }
  return [
    mediaBlock("prefers-contrast: more", scope, layer, more),
    mediaBlock("prefers-contrast: less", scope, layer, less),
    mediaBlock("prefers-reduced-transparency: reduce", scope, layer, opaque),
  ]
    .filter(Boolean)
    .join("\n\n");
}
