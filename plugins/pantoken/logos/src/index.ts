/**
 * `@pantoken/plugin-logos` — Instructure product logos as SVGs, data URIs, and image tokens.
 *
 * It vendors the SVG logos from Instructure's UX guidelines for Canvas, Mastery, Parchment,
 * Instructure, LearnPlatform, and Ignite AI, in the standard layouts (horizontal, stacked, icon)
 * and color modes (full-color, color, dark, reversed, and so on). Each logo is available three ways:
 * the raw SVG ({@link getLogoSvg}), a data URI ({@link getLogoDataUri}), and a
 * `--instui-logo-<product>-<layout>-<mode>` image token in `@pantoken/plugin-logos/logos.css`.
 *
 * As a pantoken plugin, the `css` hook contributes those image tokens.
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";
import { LOGOS, LOGO_SVGS, LOGOS_CSS } from "../generated/embedded.ts";

/** An Instructure product with a logo. */
export type Product =
  | "canvas"
  | "igniteai"
  | "instructure"
  | "learnplatform"
  | "mastery"
  | "parchment";

/** A logo layout — the arrangement of mark and wordmark. */
export type LogoLayout = "horizontal" | "icon" | "icon-single-dot" | "icon-three-dot" | "stacked";

/** A logo color treatment. */
export type LogoColorMode =
  | "color"
  | "dark"
  | "full-color"
  | "full-color-bg"
  | "full-color-reversed"
  | "light"
  | "reversed"
  | "reversed-bg";

/** Metadata for one available logo asset. */
export interface LogoMeta {
  /** The product the logo belongs to. */
  product: Product;
  /** The layout. */
  layout: LogoLayout;
  /** The color treatment. */
  colorMode: LogoColorMode;
  /** The token/name stem, e.g. `"canvas-horizontal-full-color"`. */
  name: string;
  /** The path within `assets/logos`, e.g. `"canvas/horizontal-full-color.svg"`. */
  path: string;
}

/**
 * Every available logo, sorted by name.
 *
 * @example List the layouts available for Canvas
 * ```ts
 * import { logos } from "@pantoken/plugin-logos";
 *
 * const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
 * ```
 */
export const logos: readonly LogoMeta[] = LOGOS;

/**
 * The products that have logos.
 *
 * @example
 * ```ts
 * import { products } from "@pantoken/plugin-logos";
 *
 * products.includes("mastery"); // true
 * ```
 */
export const products: readonly Product[] = [
  ...new Set(LOGOS.map((logo) => logo.product)),
].toSorted() as Product[];

/**
 * The ready-made image-token stylesheet (the same text as `./logos.css`).
 *
 * @example Inline the logo tokens into a page
 * ```ts
 * import { logosCss } from "@pantoken/plugin-logos";
 *
 * document.head.insertAdjacentHTML("beforeend", `<style>${logosCss}</style>`);
 * // then in CSS: background-image: var(--instui-logo-canvas-horizontal-full-color);
 * ```
 */
export const logosCss: string = LOGOS_CSS;

/**
 * Get a logo's raw SVG.
 *
 * @param product - The product.
 * @param layout - The layout (default `"horizontal"`).
 * @param colorMode - The color treatment (default `"full-color"`).
 * @returns The SVG string, or `undefined` if that combination doesn't exist.
 *
 * @example Get the default horizontal, full-color Canvas logo
 * ```ts
 * import { getLogoSvg } from "@pantoken/plugin-logos";
 *
 * const svg = getLogoSvg("canvas");
 * ```
 *
 * @example Pick a specific layout and color treatment
 * ```ts
 * import { getLogoSvg } from "@pantoken/plugin-logos";
 *
 * const reversed = getLogoSvg("instructure", "stacked", "reversed");
 * ```
 */
export function getLogoSvg(
  product: Product,
  layout: LogoLayout = "horizontal",
  colorMode: LogoColorMode = "full-color",
): string | undefined {
  return LOGO_SVGS[`${product}-${layout}-${colorMode}`];
}

/**
 * Get a logo as a base64 `data:image/svg+xml` URI.
 *
 * @param product - The product.
 * @param layout - The layout (default `"horizontal"`).
 * @param colorMode - The color treatment (default `"full-color"`).
 * @returns The data URI, or `undefined` if that combination doesn't exist.
 *
 * @example Use a logo as an <img> src
 * ```ts
 * import { getLogoDataUri } from "@pantoken/plugin-logos";
 *
 * const uri = getLogoDataUri("mastery", "icon", "color");
 * const img = document.createElement("img");
 * if (uri) img.src = uri;
 * ```
 */
export function getLogoDataUri(
  product: Product,
  layout: LogoLayout = "horizontal",
  colorMode: LogoColorMode = "full-color",
): string | undefined {
  const svg = getLogoSvg(product, layout, colorMode);
  if (svg === undefined) return undefined;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Options for the {@link logosPlugin} plugin. */
export interface LogosOptions {
  /**
   * Where the `css` hook's rules land relative to the stylesheet: `"append"` (default) or
   * `"prepend"`.
   */
  position?: "append" | "prepend";
}

/**
 * Create the logos plugin.
 *
 * The `css` hook contributes the `--instui-logo-*` image tokens (as `url(data:…)` values), so a
 * stylesheet built with the plugin can reference any logo through `var()`.
 *
 * @param options - {@link LogosOptions}.
 * @returns A {@link PantokenPlugin} with a `css` hook.
 *
 * @example Add the logo image tokens when assembling CSS through toCss
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { logosPlugin } from "@pantoken/plugin-logos";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [logosPlugin()] });
 * // then in CSS: background-image: var(--instui-logo-instructure-horizontal-full-color);
 * ```
 */
export function logosPlugin(options: LogosOptions = {}): PantokenPlugin {
  const position = options.position ?? "append";
  return definePlugin({
    name: "@pantoken/plugin-logos",
    css: () => ({ marker: "pantoken:logos", [position]: LOGOS_CSS }),
  });
}

export default logosPlugin;
