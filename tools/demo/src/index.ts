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

/** A selectable token theme for the runner's theme switcher. */
export interface DemoTheme {
  /** Theme id, e.g. `rebrand`. */
  name: string;
  /** Human label shown in the dropdown, e.g. `Rebrand`. */
  label: string;
  /** URL of the theme's token stylesheet. */
  css: string;
}

/** Options for resolving a demo spec. Only the `self` provider uses the runner/demos/css fields. */
export interface ResolveOptions {
  /** Site base path, e.g. `/pantoken/` (default `/`). */
  base?: string;
  /** Runner page path, relative to `base` (default `play/index.html`). */
  runnerPath?: string;
  /** Self-hosted demo-source dir, relative to `base` (default `demos/`). */
  demosPath?: string;
  /** Theme-independent stylesheet URLs the runner always injects (e.g. the component CSS). */
  cssUrls?: readonly string[];
  /** Selectable token themes; the first is the default. Drives the runner's theme switcher. */
  themes?: readonly DemoTheme[];
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

/** Lucide `external-link`, inlined for the "open in a new tab" affordance. */
const EXTERNAL_LINK_ICON =
  '<svg class="pantoken-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';

/** Lucide `maximize`, inlined for the "full screen" affordance. */
const FULLSCREEN_ICON =
  '<svg class="pantoken-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';

/** Lucide `contrast`, inlined for the "toggle light/dark" affordance. */
const CONTRAST_ICON =
  '<svg class="pantoken-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></svg>';

/**
 * Brand marks for the hosted providers, sourced from Simple Icons (`path` + brand `hex`). A demo only
 * shows a provider tag when it runs on one of these — a self-hosted `self:` demo needs no label.
 */
const PROVIDERS: Record<string, { label: string; hex: string; path: string }> = {
  stackblitz: {
    label: "StackBlitz",
    hex: "#1269D3",
    path: "M10.797 14.182H3.635L16.728 0l-3.525 9.818h7.162L7.272 24l3.524-9.818Z",
  },
  codesandbox: {
    label: "CodeSandbox",
    hex: "#151515",
    path: "M0 24H24V0H0V2.45455H21.5455V21.5455H2.45455V0H0Z",
  },
  codepen: {
    label: "CodePen",
    hex: "#000000",
    path: "M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12 0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12m0 10.492L9.745 12 12 13.51 14.255 12zm.638 4.124v2.975l4.996-3.33-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z",
  },
  dartpad: {
    label: "Dart",
    hex: "#0175C2",
    path: "M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z",
  },
  "wp-playground": {
    label: "WordPress",
    hex: "#21759B",
    path: "M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0",
  },
};

/** The provider tag (brand mark + name), or `""` for self-hosted / bare-URL demos that need none. */
function providerTag(provider: string): string {
  const brand = PROVIDERS[provider];
  if (!brand) return "";
  return (
    `<span class="pantoken-demo__provider">` +
    `<svg class="pantoken-demo__provider-icon" viewBox="0 0 24 24" fill="${brand.hex}" aria-hidden="true"><path d="${brand.path}"/></svg>` +
    `${brand.label}</span>`
  );
}

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
      const themes = options.themes ?? [];
      const query =
        `?src=${encodeURIComponent(source)}` +
        (css ? `&css=${encodeURIComponent(css)}` : "") +
        (themes.length ? `&themes=${encodeURIComponent(JSON.stringify(themes))}` : "");
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
 * Render the demo panel HTML for a resolved demo: a titled bar (provider + open-in-new-tab) above a
 * sandboxed, lazy-loaded iframe. Style it with `@pantoken/demo/demo.css`.
 *
 * @param resolved - A {@link ResolvedDemo}.
 * @returns The panel HTML string.
 */
export function renderDemoFigure(resolved: ResolvedDemo): string {
  const src = escapeAttr(resolved.src);
  const provider = escapeAttr(resolved.provider);
  return (
    `<figure class="pantoken-demo">` +
    `<figcaption class="pantoken-demo__bar">` +
    providerTag(provider) +
    `<span class="pantoken-demo__spacer"></span>` +
    `<button class="pantoken-demo__action" type="button" data-role="scheme" data-tooltip="Toggle light/dark" aria-label="Toggle light/dark">${CONTRAST_ICON}</button>` +
    `<button class="pantoken-demo__action" type="button" data-role="fullscreen" data-tooltip="Full screen" aria-label="Full screen">${FULLSCREEN_ICON}</button>` +
    `<a class="pantoken-demo__action" href="${src}" target="_blank" rel="noopener noreferrer" data-tooltip="Open in a new tab" aria-label="Open in a new tab">${EXTERNAL_LINK_ICON}</a>` +
    `</figcaption>` +
    `<iframe class="pantoken-demo__frame" src="${src}" title="Live demo" loading="lazy" allowfullscreen sandbox="${escapeAttr(resolved.sandbox)}"></iframe>` +
    `</figure>\n`
  );
}

/** Options for {@link demoMarkdownIt} — passed straight to {@link resolveDemo}. */
export type DemoMarkdownItOptions = ResolveOptions;

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
    const [tokens, index] = args;
    const token = tokens[index];
    if (token.info.trim() === "demo") {
      return renderDemoFigure(resolveDemo(token.content.trim(), options));
    }
    return fence(...args);
  };
}
