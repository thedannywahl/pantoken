/**
 * SVG sanitization for glyphs decoded from vendored data URIs or contributed by plugins.
 *
 * @module
 */

/**
 * Strip `<script>` elements and event-handler attributes from SVG markup.
 *
 * Defense-in-depth for SVG decoded from vendored data URIs or contributed by plugins.
 * Not a full HTML parser — relies on the upstream source being trusted and pinned.
 */
export function sanitizeSvg(svg: string): string {
  let sanitized = svg;
  let previous: string;
  // Loop until stable: malformed/nested script fragments can survive a single pass.
  do {
    previous = sanitized;
    sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi, "");
  } while (sanitized !== previous);
  // Loop until stable: nested or concatenated on* attributes can survive a single pass.
  do {
    previous = sanitized;
    sanitized = sanitized.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  } while (sanitized !== previous);
  return sanitized;
}
