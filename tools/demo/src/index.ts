/**
 * `@pantoken/demo` — the render side of the `@demo` system.
 *
 * `@pantoken/typedoc-plugin-demo` turns a `@demo <spec>` tag into a fenced ```demo``` block whose
 * body is the spec (a bare URL or a `<provider>:<ref>` pair). This package resolves that spec into an
 * embeddable iframe and renders the surrounding panel — an MDN-style "live sample."
 *
 * It ships three things: {@link resolveDemo} (spec → iframe attributes, framework-agnostic), a
 * markdown-it plugin ({@link demoMarkdownIt}) that turns ```demo``` fences into the panel HTML, and a
 * self-hosted runner (`@pantoken/demo/runner.html`) — a same-origin page that fetches a bare
 * HTML/CSS/JS demo and renders it with your token stylesheets injected, so `self:` demos need no
 * third-party account and no framing workarounds.
 *
 * @example
 * ```ts
 * import { resolveDemo } from "@pantoken/demo";
 *
 * resolveDemo("stackblitz:abc123").src; // → "https://stackblitz.com/edit/abc123?embed=1&…"
 * resolveDemo("self:button", { base: "/docs/", cssUrls: ["/docs/tokens.css"] }).src;
 * ```
 *
 * @module
 */
import type MarkdownIt from "markdown-it";

/** Options for resolving a demo spec. Only the `self` provider uses the runner/demos/css fields. */
export interface ResolveOptions {
  /** Site base path, e.g. `/pantoken/` (default `/`). */
  base?: string;
  /** Runner page path, relative to `base` (default `play/index.html`). */
  runnerPath?: string;
  /** Self-hosted demo-source dir, relative to `base` (default `demos/`). */
  demosPath?: string;
  /**
   * Stylesheet URLs the runner injects (into its chrome and every rendered result): the component
   * sheets, the multi-theme token sheet, and the plugin/surface sheets. The runner themes by toggling
   * the `data-pantoken-theme` attribute, so one token sheet covers every theme.
   */
  cssUrls?: readonly string[];
}

/** A resolved demo: iframe attributes plus the provider that produced them. */
export interface ResolvedDemo {
  /** The provider that produced the embed (`url`, `self`, `stackblitz`, …). */
  provider: string;
  /** The iframe `src`. */
  src: string;
  /** The iframe `sandbox` attribute. */
  sandbox: string;
}

const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-modals";

/**
 * Resolve a `@demo` spec into iframe attributes.
 *
 * @param spec - A bare URL/path, or `<provider>:<ref>`.
 * @param options - {@link ResolveOptions}.
 * @returns The {@link ResolvedDemo}.
 *
 * @example Provider specs
 * ```ts
 * resolveDemo("https://example.com/x").provider; // "url"
 * resolveDemo("codepen:team/abc123").src; // "https://codepen.io/team/embed/abc123?default-tab=result"
 * ```
 */
export function resolveDemo(spec: string, options: ResolveOptions = {}): ResolvedDemo {
  const trimmed = spec.trim();

  // A bare URL or root-relative path is a raw iframe src (also stops `https:` reading as a provider).
  if (/^(https?:\/\/|\/)/.test(trimmed)) {
    return { provider: "url", src: trimmed, sandbox: SANDBOX };
  }

  const match = /^([a-z][a-z0-9-]*):(.*)$/is.exec(trimmed);
  const provider = match ? match[1].toLowerCase() : "url";
  const ref = (match ? match[2] : trimmed).trim();

  switch (provider) {
    case "self": {
      // Target the runner file explicitly (an SPA host may serve its own shell for the bare dir URL).
      const runner = `${options.base ?? "/"}${options.runnerPath ?? "play/index.html"}`;
      const demos = `${options.base ?? "/"}${options.demosPath ?? "demos/"}`;
      const source = /^(https?:\/\/|\/)/.test(ref) ? ref : `${demos}${ref}.html`;
      const css = (options.cssUrls ?? []).join(",");
      const query =
        `?src=${encodeURIComponent(source)}` + (css ? `&css=${encodeURIComponent(css)}` : "");
      return { provider, src: `${runner}${query}`, sandbox: SANDBOX };
    }
    case "stackblitz": {
      const path = /^(github|edit)\//.test(ref) ? ref : `edit/${ref}`;
      return {
        provider,
        src: `https://stackblitz.com/${path}?embed=1&view=preview&hideNavigation=1`,
        sandbox: SANDBOX,
      };
    }
    case "codesandbox":
      return {
        provider,
        src: `https://codesandbox.io/embed/${ref}?view=preview`,
        sandbox: SANDBOX,
      };
    case "codepen": {
      const [user, slug] = ref.split("/");
      return {
        provider,
        src: `https://codepen.io/${user}/embed/${slug}?default-tab=result`,
        sandbox: SANDBOX,
      };
    }
    case "dartpad":
      return {
        provider,
        src: `https://dartpad.dev/embed-flutter.html?id=${ref}`,
        sandbox: SANDBOX,
      };
    case "wp-playground":
      return {
        provider,
        src: `https://playground.wordpress.net/?mode=seamless&blueprint-url=${encodeURIComponent(ref)}`,
        sandbox: SANDBOX,
      };
    default:
      // Unknown provider: treat the whole spec as a URL.
      return { provider: "url", src: trimmed, sandbox: SANDBOX };
  }
}

/** Escape a string for use in an HTML attribute. */
const escapeAttr = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Render the demo panel HTML for a resolved demo: a bare, sandboxed, lazy-loaded iframe framed like a
 * live example (no host chrome — the runner inside carries its own tab toolbar). Style it with
 * `@pantoken/demo/demo.css`.
 *
 * @param resolved - A {@link ResolvedDemo}.
 * @returns The panel HTML string.
 */
export function renderDemoFigure(resolved: ResolvedDemo): string {
  const src = escapeAttr(resolved.src);
  return (
    `<figure class="pantoken-demo">` +
    `<iframe class="pantoken-demo__frame" src="${src}" title="Live demo" loading="lazy" sandbox="${escapeAttr(resolved.sandbox)}"></iframe>` +
    `</figure>\n`
  );
}

/** How to seam a live preview onto each `@example` HTML fence on matching pages. */
export interface LiveExampleOptions {
  /** Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages). */
  match: (relativePath: string) => boolean;
  /** Build the preview block appended after each non-overlay ` ```html ` fence, from its markup. */
  wrap: (html: string) => string;
}

/** Options for {@link demoMarkdownIt}: the {@link resolveDemo} fields plus optional live-example seaming. */
export interface DemoMarkdownItOptions extends ResolveOptions {
  /**
   * When set, appends a live preview after each ` ```html ` fence on matching pages — the same markup,
   * rendered live, beneath its source. Overlay examples (`<dialog>`, `[popover]`) are skipped: they're
   * hidden until opened, so a `## Demo` iframe drives their preview instead.
   */
  liveExample?: LiveExampleOptions;
}

/** An example that's hidden until opened (a `<dialog>` or a `[popover]`), so its live preview is skipped. */
function isOverlay(html: string): boolean {
  return /^<dialog\b/u.test(html.trim()) || /\spopover(?:=|\s|>)/u.test(html);
}

/**
 * A markdown-it plugin: turn ```demo``` fences into the demo panel. Use it with
 * `md.use(demoMarkdownIt, options)`.
 *
 * @param md - The markdown-it instance.
 * @param options - {@link DemoMarkdownItOptions}.
 *
 * @example
 * ```ts
 * import MarkdownIt from "markdown-it";
 * import { demoMarkdownIt } from "@pantoken/demo";
 *
 * const md = new MarkdownIt().use(demoMarkdownIt, {
 *   base: "/pantoken/",
 *   cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
 * });
 * ```
 */
export function demoMarkdownIt(md: MarkdownIt, options: DemoMarkdownItOptions = {}): void {
  const fence = md.renderer.rules.fence;
  if (!fence) return;

  md.renderer.rules.fence = (...args) => {
    const [tokens, index, , env] = args;
    const token = tokens[index];
    const info = token.info.trim();
    if (info === "demo") {
      return renderDemoFigure(resolveDemo(token.content.trim(), options));
    }
    const rendered = fence(...args);
    // Seam a live preview onto each `@example` HTML fence on matching pages (the CSS-API pages load the
    // component CSS, so the same markup renders live). The rendered source fence stays as-is above it.
    const live = options.liveExample;
    if (live && info === "html") {
      const relativePath = (env as { relativePath?: string } | undefined)?.relativePath ?? "";
      const html = token.content.replace(/\n$/u, "");
      if (live.match(relativePath) && !isOverlay(html)) {
        return `${rendered}\n${live.wrap(html)}\n`;
      }
    }
    return rendered;
  };
}
