/**
 * Build a static `<iframe srcdoc>` document for a live example, so its markup renders in a document
 * that `.vp-doc` styles — neither pantoken's own `.vp-doc`-scoped prose nor a host site's native theme
 * CSS — can ever reach, since the iframe is its own document. Unlike the `/play` runner's result
 * iframe (which bakes in a known theme because its outer chrome already resolved one over
 * postMessage), this document is built at page-generation time with no theme known yet, so it
 * requests one from its parent on load instead, mirroring the runner's own boot sequence.
 *
 * @module
 */

/** Escape a string for embedding inside an HTML attribute value delimited by `"`. */
export function escapeSrcdoc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Options for {@link buildExampleSrcdoc}. */
export interface ExampleSrcdocOptions {
  /** Stylesheet URLs to load into the iframe's `<head>` (tokens, components, utilities, icons, …). */
  cssUrls: readonly string[];
  /** Wrap `html` in the shared `.instui-card` surface (default `true`). */
  card?: boolean;
}

// Boots the preview: asks the parent for the active theme (a sandboxed srcdoc frame without
// `allow-same-origin` has an opaque origin, so it can't address the parent by a concrete origin
// string — target "*" on the way out; the host's own trust check happens on receipt) and applies the
// reply's `data-pantoken-theme`. Then reports the rendered body height whenever it changes, so the
// embedding page can size the iframe to its content instead of a fixed box. Mirrors the `/play`
// runner's own request-theme boot and size-reporter (tools/demo/runner/main.ts).
const BOOT_SCRIPT = `<script>(function(){
var p=window.parent;
function r(){p.postMessage({type:"pantoken-demo-size",height:Math.ceil(document.body.getBoundingClientRect().height)},"*");}
addEventListener("message",function(e){
  if(e&&e.data&&e.data.type==="pantoken-demo-theme"){document.documentElement.dataset.pantokenTheme=e.data.theme;}
});
p.postMessage({type:"pantoken-demo-request-theme"},"*");
addEventListener("load",r);
if(window.ResizeObserver){new ResizeObserver(r).observe(document.body);}
r();
})()</script>`;

/**
 * Build the full `<!doctype html>` document string for an isolated live-example preview.
 *
 * @param html - The example's raw markup (verbatim from its source fence).
 * @param options - {@link ExampleSrcdocOptions}.
 * @returns The document string — pass it through {@link escapeSrcdoc} before using it as an iframe
 * `srcdoc` attribute value.
 *
 * @example
 * ```ts
 * import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";
 *
 * const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
 *   cssUrls: ["/demos-assets/components.css"],
 * });
 * const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
 * ```
 */
export function buildExampleSrcdoc(html: string, options: ExampleSrcdocOptions): string {
  const links = options.cssUrls.map((href) => `<link rel="stylesheet" href="${href}">`).join("");
  const body = options.card === false ? html : `<div class="instui-card">${html}</div>`;
  return (
    `<!doctype html><html><head><meta charset="utf-8">${links}` +
    `<style>body{padding:var(--instui-spacing-space-md, 1rem);margin:0}</style></head>` +
    `<body class="pantoken-prose">${body}${BOOT_SCRIPT}</body></html>`
  );
}
