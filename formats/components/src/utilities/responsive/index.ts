/**
 * The responsive-visibility utilities — the closest pure-CSS analogue to InstUI's `<Responsive>`:
 * viewport-width hide classes plus `-cq-` container-query variants.
 *
 * Not dual-chained onto every real component (unlike spacing/gap/layout): the alias post-processors
 * (`withSizeAliases`/`deprecatedAliasPairs` in `lib/aliases.ts`) scan this record's CSS body with
 * unanchored regexes, and this utility's selector lists (breakpoint × infix × short/long/device name)
 * are already large enough that adding ~70 more chained selectors per rule (one per real component)
 * pushes the scan into unusable-slow territory (confirmed: multi-minute hang during implementation).
 * Each rule does carry a bare `.-hidden-max-xs`-style dash modifier alongside the prefixed
 * `.instui-hidden-max-xs` class (a flat, constant-factor addition, not a per-component fan-out), so the
 * documented `@modifier` names resolve to a real selector.
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";
import type { ComponentTheme } from "../../lib/helpers.ts";

const emValue = (tokenName: string): string => {
  const match = /^([\d.]+)em$/u.exec(tokens.find((t) => t.name === tokenName)?.value ?? "");
  if (!match) throw new Error(`@pantoken/tokens: missing or non-em token "${tokenName}"`);
  return `${match[1]}em`;
};

/** Short name, long-form spelling, and device name for each `--instui-component-tray-width-*` tier. */
const SCALE_TIERS: readonly [short: string, long: string, device: string][] = [
  ["xs", "x-small", "mobile"],
  ["sm", "small", "phablet"],
  ["md", "medium", "tablet"],
  ["lg", "large", "laptop"],
  ["xl", "x-large", "desktop"],
];

/** `[names sharing one breakpoint value, width]` for the scale tiers — theme-invariant. */
const scaleBreakpoints = (): [string[], string][] =>
  SCALE_TIERS.map(([short, long, device]) => [
    [short, long, device],
    emValue(`--instui-component-tray-width-${short}`),
  ]);

/** The main content area's max-width, in em, per theme — hand-authored (not in the token IR). */
const CONTENT_BREAKPOINT_EM: Record<ComponentTheme, { content: string; contentFullWidth: string }> =
  {
    rebrand: { content: "68.75em", contentFullWidth: "98.75em" }, // 1100px / 1580px
    canvas: { content: "59.25em", contentFullWidth: "59.25em" },
    canvasHighContrast: { content: "59.25em", contentFullWidth: "59.25em" },
  };

/** The responsive-visibility utility — viewport-width hide classes plus `-cq-` container-query variants. */
export const responsive: Definition = defineUtility({
  name: "responsive",
  css: (p, options) => {
    const theme = options?.theme ?? "rebrand";
    const { content, contentFullWidth } = CONTENT_BREAKPOINT_EM[theme];
    // Scale tiers get short + long-form + device-name twins; the named tiers below don't (no scale to twin against).
    const bp: [string[], string][] = [
      ...scaleBreakpoints(),
      [["content"], content],
      [["content-full-width"], contentFullWidth],
    ];
    const selectors = (prefix: string, infix: string, names: string[]): string =>
      names.map((name) => `.${prefix}${infix}${name}, .-${infix}${name}`).join(", ");
    const viewport = bp
      .map(
        ([names, w]) =>
          `@media (max-width: ${w}) { ${selectors(p, "hidden-max-", names)} { display: none !important; } }\n` +
          `@media (min-width: ${w}) { ${selectors(p, "hidden-min-", names)} { display: none !important; } }`,
      )
      .join("\n");
    // Container-query variants — the true InstUI <Responsive> analogue: mark an ancestor `.<prefix>-container`
    // and these react to ITS width, not the viewport's. Same breakpoint scale, `-cq-` infix.
    const container = bp
      .map(
        ([names, w]) =>
          `@container (max-width: ${w}) { ${selectors(p, "cq-hidden-max-", names)} { display: none !important; } }\n` +
          `@container (min-width: ${w}) { ${selectors(p, "cq-hidden-min-", names)} { display: none !important; } }`,
      )
      .join("\n");
    // `-show-*` is the inverse of `-hidden-*`: hidden by default, `revert`ed back to its natural
    // display only inside the matching range. `revert` (not `initial`/`unset`, which would force
    // `inline`) restores whatever display an earlier-origin rule (UA stylesheet, or an author rule
    // this utility doesn't override) would have set — the standard technique for a display-agnostic
    // show utility, though it can't see a same-origin author rule's `display` if one exists.
    const showSelector = (infix: string): string =>
      bp.map(([names]) => selectors(p, infix, names)).join(", ");
    const showBase = ["show-max-", "show-min-", "cq-show-max-", "cq-show-min-"]
      .map(showSelector)
      .join(", ");
    const showViewport = bp
      .map(
        ([names, w]) =>
          `@media (max-width: ${w}) { ${selectors(p, "show-max-", names)} { display: revert !important; } }\n` +
          `@media (min-width: ${w}) { ${selectors(p, "show-min-", names)} { display: revert !important; } }`,
      )
      .join("\n");
    const showContainer = bp
      .map(
        ([names, w]) =>
          `@container (max-width: ${w}) { ${selectors(p, "cq-show-max-", names)} { display: revert !important; } }\n` +
          `@container (min-width: ${w}) { ${selectors(p, "cq-show-min-", names)} { display: revert !important; } }`,
      )
      .join("\n");
    // The @media/@container queries only define a threshold — they don't hide anything themselves
    // (the classes below do); describe the threshold, not the visibility behavior.
    const conditionDocs = bp
      .map(
        ([names, w]) =>
          ` * @media (max-width: ${w}) — Upper bound of the \`${names[0]}\` breakpoint.\n` +
          ` * @media (min-width: ${w}) — Lower bound of the \`${names[0]}\` breakpoint.\n` +
          ` * @container (max-width: ${w}) — Upper bound of the \`${names[0]}\` breakpoint, evaluated against a marked container.\n` +
          ` * @container (min-width: ${w}) — Lower bound of the \`${names[0]}\` breakpoint, evaluated against a marked container.`,
      )
      .join("\n");
    // Every hide class, documented; long-form/device-name twins are `@alias` aliases of the short
    // name (cssdoc renders these the same way as the size-scale's `-size-small`/`-size-sm` aliases).
    const modifierDocs = bp
      .map(([names, w]) => {
        const [short, ...aliases] = names;
        const canonical = [
          ` * @modifier -hidden-max-${short} — Hide when the viewport is at or below the \`${short}\` breakpoint (\`${w}\`).`,
          ` * @modifier -hidden-min-${short} — Hide when the viewport is at or above the \`${short}\` breakpoint (\`${w}\`).`,
          ` * @modifier -cq-hidden-max-${short} — Hide when the marked container is at or below the \`${short}\` breakpoint (\`${w}\`).`,
          ` * @modifier -cq-hidden-min-${short} — Hide when the marked container is at or above the \`${short}\` breakpoint (\`${w}\`).`,
        ];
        const aliasDocs = aliases.flatMap((alias) => [
          ` * @modifier -hidden-max-${alias} — @alias {@link -hidden-max-${short}}`,
          ` * @modifier -hidden-min-${alias} — @alias {@link -hidden-min-${short}}`,
          ` * @modifier -cq-hidden-max-${alias} — @alias {@link -cq-hidden-max-${short}}`,
          ` * @modifier -cq-hidden-min-${alias} — @alias {@link -cq-hidden-min-${short}}`,
        ]);
        const showCanonical = [
          ` * @modifier -show-max-${short} — Show (inverse of \`-hidden-min-${short}\`) when the viewport is at or below the \`${short}\` breakpoint (\`${w}\`); hidden otherwise.`,
          ` * @modifier -show-min-${short} — Show (inverse of \`-hidden-max-${short}\`) when the viewport is at or above the \`${short}\` breakpoint (\`${w}\`); hidden otherwise.`,
          ` * @modifier -cq-show-max-${short} — Show when the marked container is at or below the \`${short}\` breakpoint (\`${w}\`); hidden otherwise.`,
          ` * @modifier -cq-show-min-${short} — Show when the marked container is at or above the \`${short}\` breakpoint (\`${w}\`); hidden otherwise.`,
        ];
        const showAliasDocs = aliases.flatMap((alias) => [
          ` * @modifier -show-max-${alias} — @alias {@link -show-max-${short}}`,
          ` * @modifier -show-min-${alias} — @alias {@link -show-min-${short}}`,
          ` * @modifier -cq-show-max-${alias} — @alias {@link -cq-show-max-${short}}`,
          ` * @modifier -cq-show-min-${alias} — @alias {@link -cq-show-min-${short}}`,
        ]);
        return [...canonical, ...aliasDocs, ...showCanonical, ...showAliasDocs].join("\n");
      })
      .join("\n");
    // `@property` registers each breakpoint as an inspectable custom property (informational only —
    // changing it does NOT move the compiled `@media`/`@container` thresholds above, since browsers
    // can't read a custom property back into a media feature). `initial-value` must be a literal (CSS
    // rejects `var()` there), so the scale tiers' real value is wired separately below, via `var(...)`
    // on the same property — that's what makes `--instui-component-tray-width-*` show as consumed.
    const properties = bp
      .map(
        ([names, w]) =>
          `@property --pantoken-bp-${names[0]} { syntax: "<length>"; inherits: true; initial-value: ${w}; }`,
      )
      .join("\n");
    const scaleSourceVars = SCALE_TIERS.map(
      ([short]) => `  --pantoken-bp-${short}: var(--instui-component-tray-width-${short});`,
    ).join("\n");
    const scaleShortNames = new Set(SCALE_TIERS.map(([short]) => short));
    // Each `@property` gets real prose: scale tiers name the IR token they mirror; the two
    // unscaled, themed tiers say so instead, since they aren't backed by a token.
    const propertyDocs = bp
      .map(([names, w]) => {
        const short = names[0];
        const source = scaleShortNames.has(short)
          ? `mirrors \`--instui-component-tray-width-${short}\``
          : "hand-authored, themed (not in the token IR)";
        return ` * @cssproperty --pantoken-bp-${short} <length> — The \`${short}\` breakpoint's value (\`${w}\`, ${source}). Overriding it does not move the compiled \`@media\`/\`@container\` thresholds above.`;
      })
      .join("\n");
    // prettier-ignore
    return css`
/**
 * @utility responsive
 * @selector [class*="-hidden-"],[class*="-show-"]
 * @global
 * @summary Viewport- or container-width show/hide classes across a themed breakpoint scale.
 * @remarks \`.instui-hidden-max-<bp>\`/\`-hidden-min-<bp>\` hide by viewport width; \`.instui-show-max-<bp>\`/\`-show-min-<bp>\` are the inverse (hidden by default, shown only inside the range via \`display: revert\`); the \`-cq-\` variants react to a \`.instui-container\` ancestor's width instead, not the viewport's. Scale tiers \`xs\`/\`sm\`/\`md\`/\`lg\`/\`xl\` (sourced from the IR's tray-width component tokens) are each aliased to a long-form spelling (\`x-small\`\u2013\`x-large\`) and a device name (\`mobile\`/\`phablet\`/\`tablet\`/\`laptop\`/\`desktop\`) \u2014 both deprecated in favor of the short name \u2014 plus the unscaled, themed \`content\`/\`content-full-width\` tiers (the main content area's max-width).
 * @example
 * <div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
 * <div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
${modifierDocs}
${conditionDocs}
${propertyDocs}
 */
${properties}
:root {
${scaleSourceVars}
}
${viewport}
.${p}container { container-type: inline-size; }
${container}
${showBase} { display: none !important; }
${showViewport}
${showContainer}
`;
  },
});

/** The responsive-visibility utilities as a standalone, header-wrapped stylesheet. */
export const responsiveUtilitiesCss: Definition["css"] = responsive.css;
