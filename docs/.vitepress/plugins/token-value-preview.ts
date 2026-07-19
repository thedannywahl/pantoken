/**
 * A markdown-it plugin that renders a live preview beneath any inline code span whose value is a
 * previewable token value — the CSS API tables. Two kinds:
 *
 * - **Images** (`data:image/…` URIs): icons (`;utf8,` percent-encoded SVGs), logos (`;base64,` SVGs),
 *   and mask helpers. The URI decodes back to inline SVG so the reader sees the glyph. Inlining (not
 *   an `<img src>`) lets `currentColor` icons inherit the theme text colour, staying visible in light
 *   and dark.
 * - **Colours**: a whole-value colour (`#E62429`, `rgba(…)`, `transparent`) resolves to a single
 *   swatch; a `light-dark(a, b)` resolves both branches as two labelled swatches, so the reader sees
 *   what each scheme paints without switching themes.
 *
 * Detection is content-based — it fires on the value regardless of which column or table it sits in,
 * so it covers tokens-consumed `Value` cells, the logos `Default` column, and the `hu/` locale clones
 * with no per-page wiring. Only whole-cell colours are swatched, so a `light-dark(rgba…)` buried in a
 * box-shadow value is left alone. Styled by `.pantoken-token-preview` / `.pantoken-swatch` in the docs
 * theme's `pantoken.css`.
 *
 * @module
 */
import type MarkdownIt from "markdown-it";

// --- Images -----------------------------------------------------------------

/** The first `data:image/…` URI inside a code span (unwrapped from any `url("…")`), or null. */
function findDataImage(content: string): string | null {
  return /data:image\/[^\s'")]+/i.exec(content)?.[0] ?? null;
}

/** A decoded data URI: `svg` for inline SVG markup, or `src` to fall back to an `<img>`. */
interface DecodedImage {
  svg?: string;
  src?: string;
}

/**
 * Decode a `data:image/…` URI. SVG payloads (`;base64,` or percent-encoded `;utf8,`/bare) decode to
 * inline markup; any other image type falls back to the raw URI as an `<img src>`.
 */
function decodeDataImage(uri: string): DecodedImage {
  const match = /^data:([^,]*),([\s\S]*)$/.exec(uri);
  if (!match) return {};
  const [, meta, data] = match;
  if (!/^image\/svg\+xml/i.test(meta)) return { src: uri };
  try {
    if (/;base64/i.test(meta)) return { svg: Buffer.from(data, "base64").toString("utf8") };
    return { svg: decodeURIComponent(data) };
  } catch {
    return { src: uri };
  }
}

/** Strip script elements, inline event handlers, and `javascript:` refs before inlining the SVG. */
function sanitizeSvg(svg: string): string {
  return svg
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:xlink:href|href)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi, "");
}

/** The image-preview block for a code span, or null if its value carries no `data:image` URI. */
function imagePreview(content: string): string | null {
  const uri = findDataImage(content);
  if (!uri) return null;
  const { svg, src } = decodeDataImage(uri);
  let inner: string;
  if (svg) inner = sanitizeSvg(svg);
  else if (src) inner = `<img src="${escapeAttr(src)}" alt="" />`;
  else return null;
  return `<span class="pantoken-token-preview" role="img" aria-label="token preview">${inner}</span>`;
}

// --- Colours ----------------------------------------------------------------

const HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const COLOR_FN = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([^()]*\)$/i;
const NAMED = /^(?:transparent|currentcolor)$/i;

/** Is the trimmed string an entire CSS colour we can paint into a swatch? */
function isColor(value: string): boolean {
  return HEX.test(value) || COLOR_FN.test(value) || NAMED.test(value);
}

/** Split `light-dark(...)`'s inner text on its top-level comma (rgba/hsl args hold their own). */
function splitTopLevel(inner: string): [string, string] | null {
  let depth = 0;
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    if (char === "(") depth++;
    else if (char === ")") depth--;
    else if (char === "," && depth === 0) {
      return [inner.slice(0, i).trim(), inner.slice(i + 1).trim()];
    }
  }
  return null;
}

/** One swatch cell: a checkerboard-backed chip, optionally labelled (Light/Dark for `light-dark`). */
function swatch(color: string, label?: string): string {
  const chip =
    `<span class="pantoken-swatch__chip">` +
    `<span class="pantoken-swatch__fill" style="background-color:${escapeAttr(color)}"></span>` +
    `</span>`;
  const tag = label ? `<span class="pantoken-swatch__label">${label}</span>` : "";
  return `<span class="pantoken-swatch__item">${chip}${tag}</span>`;
}

/** The colour-swatch block for a code span, or null if its value isn't a whole-cell colour. */
function colorPreview(content: string): string | null {
  const value = content.trim();

  const lightDark = /^light-dark\(([\s\S]*)\)$/i.exec(value);
  if (lightDark) {
    const parts = splitTopLevel(lightDark[1]);
    if (parts && isColor(parts[0]) && isColor(parts[1])) {
      const items = swatch(parts[0], "Light") + swatch(parts[1], "Dark");
      return `<span class="pantoken-swatch">${items}</span>`;
    }
    return null;
  }

  if (isColor(value)) return `<span class="pantoken-swatch">${swatch(value)}</span>`;
  return null;
}

// --- Plugin -----------------------------------------------------------------

/** Escape a string for use in a double-quoted HTML attribute. */
function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * Register the plugin: `md.use(tokenValuePreview)`. Wraps the default `code_inline` renderer and, when
 * the code span holds a `data:image` value or a whole-cell colour, appends a preview block after it.
 */
export function tokenValuePreview(md: MarkdownIt): void {
  const defaultRender =
    md.renderer.rules.code_inline ??
    ((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));

  md.renderer.rules.code_inline = (tokens, index, options, env, self) => {
    const rendered = defaultRender(tokens, index, options, env, self);
    const content = tokens[index].content;
    const preview = imagePreview(content) ?? colorPreview(content);
    return preview ? `${rendered}${preview}` : rendered;
  };
}
