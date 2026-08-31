/**
 * `@pantoken/demo` — the render side of the `@demo` system.
 *
 * `@pantoken/typedoc-plugin-demo` turns a `@demo <spec>` tag into a fenced `demo` block whose
 * body is the spec (a bare URL or a `<provider>:<ref>` pair). This package resolves that spec into an
 * embeddable iframe and renders the surrounding panel — an MDN-style "live sample."
 *
 * It ships three things: {@link resolveDemo} (spec → iframe attributes, framework-agnostic), a
 * markdown-it plugin ({@link demoMarkdownIt}) that turns `demo` fences into the panel HTML, and a
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
/** Minimal renderer-rule shape this plugin needs, independent of any specific markdown-it major
 * version — vitepress bundles its own copy that can differ from the repo's catalog version. */
type RendererRule = (tokens: any, index: number, options: any, env: any, self: any) => string;

/** Minimal markdown-it shape this plugin needs. */
interface MarkdownItLike {
  renderer: { rules: Record<string, RendererRule | undefined> };
  core: { ruler: { push(name: string, fn: (state: any) => void): void } };
}

export { buildExampleSrcdoc, escapeSrcdoc, type ExampleSrcdocOptions } from "./srcdoc.ts";
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
 * @module
 * @beta
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
 * A hoverable "view fullscreen" button, overlaid on a demo/example frame the same way VitePress's own
 * code-block "copy" button reveals on hover. Purely markup — wire a delegated click handler in your
 * host page (`button.closest(...).querySelector("iframe")?.requestFullscreen()`; see the pantoken docs
 * theme for the reference wiring) and style the reveal-on-hover with `@pantoken/demo/demo.css`.
 */
export const FULLSCREEN_BUTTON_HTML: string =
  '<button type="button" class="pantoken-demo__fullscreen" title="View fullscreen" aria-label="View fullscreen">' +
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>' +
  "</svg></button>";

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
    `${FULLSCREEN_BUTTON_HTML}</figure>\n`
  );
}

/** How to seam a live preview onto each `@example` HTML fence on matching pages. */
export interface LiveExampleOptions {
  /** Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages). */
  match: (relativePath: string) => boolean;
  /** Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups). */
  wrap: (html: string, flags: Set<string>, relativePath: string) => string;
}

/** Options for {@link demoMarkdownIt}: the {@link resolveDemo} fields plus optional live-example seaming. */
export interface DemoMarkdownItOptions extends ResolveOptions {
  /**
   * When set, appends a live preview after each `html` fence on matching pages — the same markup,
   * rendered live, beneath its source. Overlay examples (`<dialog>`, `[popover]`) are skipped: they're
   * hidden until opened, so a `## Demo` iframe drives their preview instead.
   */
  liveExample?: LiveExampleOptions;
  /**
   * Route a `demo:self:<name>` fence to a locale-specific self-hosted demo directory, from the current
   * page's markdown-it `env.relativePath` (e.g. `"hu/"` for pages under `hu/`, `""` for the root
   * locale). Prepended to `demosPath` so the localized clone of a demo (translated prose, same markup)
   * loads instead of the English source. Omit for a single-locale site.
   */
  localePrefix?: (relativePath: string) => string;
}

/** An example that's hidden until opened (a `<dialog>` or a `[popover]`), so its live preview is skipped. */
function isOverlay(html: string): boolean {
  return /^<dialog\b/u.test(html.trim()) || /\spopover(?:=|\s|>)/u.test(html);
}

/** Find the inline heading token that precedes a fence token, if present. */
function findPreviousHeadingInline(
  tokens: Array<{ type: string; content?: string }>,
  fenceIndex: number,
) {
  let index = fenceIndex - 1;
  while (index >= 0 && tokens[index].type === "heading_close") index--;
  if (index < 0 || tokens[index].type !== "inline") return null;
  // Only treat this as a heading caption when the inline token is wrapped by heading_open/heading_close.
  if (index - 1 < 0 || tokens[index - 1].type !== "heading_open") return null;
  return {
    inline: tokens[index] as {
      type: string;
      content: string;
      children?: Array<{ type: string; content: string }>;
      hidden?: boolean;
    },
    inlineIndex: index,
  };
}

/** Parse trailing `-flag` tokens from heading text; returns flags and heading text without flags. */
function splitHeadingFlags(content: string): { flags: string[]; stripped: string } | null {
  const match = content.match(/((?:^| )-[a-z][a-z0-9-]*)+$/u);
  if (!match) return null;
  return {
    flags: match[0].match(/-[a-z][a-z0-9-]*/gu) ?? [],
    stripped: content.slice(0, -match[0].length).trimEnd(),
  };
}

/** Keep inline token content and children in sync without duplicating text across split children. */
function setInlineContent(
  inline: { content?: string; children?: Array<{ type: string; content: string }> },
  content: string,
): void {
  inline.content = content;
  if (content) {
    inline.children = [{ type: "text", content }];
    return;
  }
  inline.children = [];
}

/** Merge parsed `-flag` tokens into a fence's info string (base language plus the flag set), shared by
 * the paragraph/inline flag-migration passes below. */
function mergeFlagsIntoFence(
  tokens: Array<{ info: string }>,
  fenceIndex: number,
  parsed: { flags: string[] },
): void {
  const parts = tokens[fenceIndex].info.trim().split(/\s+/u).filter(Boolean);
  const base = parts.length > 0 ? parts[0] : "html";
  const existing = new Set(parts.slice(1));
  for (const flag of parsed.flags) existing.add(flag);
  tokens[fenceIndex].info = [base, ...existing].join(" ");
}

/** Hide a paragraph marker token triplet (`paragraph_open`, `inline`, `paragraph_close`). */
function hideParagraph(
  tokens: Array<{
    hidden?: boolean;
    content?: string;
    children?: Array<{ type: string; content: string }>;
  }>,
  inlineIndex: number,
): void {
  const open = inlineIndex - 1;
  const close = inlineIndex + 1;
  if (open >= 0) tokens[open].hidden = true;
  tokens[inlineIndex].hidden = true;
  tokens[inlineIndex].content = "";
  tokens[inlineIndex].children = [];
  if (close < tokens.length) tokens[close].hidden = true;
}

/** Hide a heading token triplet (`heading_open`, `inline`, `heading_close`). */
function hideHeading(
  tokens: Array<{
    hidden?: boolean;
    content?: string;
    children?: Array<{ type: string; content: string }>;
  }>,
  inlineIndex: number,
): void {
  const open = inlineIndex - 1;
  const close = inlineIndex + 1;
  if (open >= 0) tokens[open].hidden = true;
  tokens[inlineIndex].hidden = true;
  tokens[inlineIndex].content = "";
  tokens[inlineIndex].children = [];
  if (close < tokens.length) tokens[close].hidden = true;
}

/** Promote a paragraph token triplet (`<p>caption</p>`) into an `<h3>` heading triplet. */
function promoteParagraphToHeading(
  tokens: Array<{
    type: string;
    tag?: string;
    markup?: string;
    level?: number;
    nesting?: number;
  }>,
  inlineIndex: number,
): void {
  const openIndex = inlineIndex - 1;
  const closeIndex = inlineIndex + 1;
  if (openIndex < 0 || closeIndex >= tokens.length) return;
  const open = tokens[openIndex];
  const close = tokens[closeIndex];
  if (open.type !== "paragraph_open" || close.type !== "paragraph_close") return;
  open.type = "heading_open";
  open.tag = "h3";
  open.markup = "###";
  open.level = 0;
  open.nesting = 1;
  close.type = "heading_close";
  close.tag = "h3";
  close.markup = "###";
  close.level = 0;
  close.nesting = -1;
}

/** Move a paragraph caption's trailing flags onto html fence info; hide pure-flag markers. */
function moveParagraphFlagsToFence(
  tokens: Array<{ type: string; info: string; content?: string; hidden?: boolean }>,
  fenceIndex: number,
): void {
  const inlineIndex = fenceIndex - 2;
  if (inlineIndex < 1) return;
  const open = tokens[inlineIndex - 1];
  const inline = tokens[inlineIndex];
  const close = tokens[inlineIndex + 1];
  if (
    open?.type !== "paragraph_open" ||
    inline?.type !== "inline" ||
    close?.type !== "paragraph_close"
  ) {
    return;
  }
  const parsed = splitHeadingFlags(inline.content ?? "");
  if (!parsed) return;
  mergeFlagsIntoFence(tokens, fenceIndex, parsed);
  setInlineContent(
    inline as { content?: string; children?: Array<{ type: string; content: string }> },
    parsed.stripped,
  );
  if (parsed.flags.includes("-noshow")) {
    hideParagraph(
      tokens as Array<{
        hidden?: boolean;
        content?: string;
        children?: Array<{ type: string; content: string }>;
      }>,
      inlineIndex,
    );
    return;
  }
  if (parsed.stripped) {
    promoteParagraphToHeading(
      tokens as Array<{
        type: string;
        tag?: string;
        markup?: string;
        level?: number;
        nesting?: number;
      }>,
      inlineIndex,
    );
    return;
  }
  hideParagraph(
    tokens as Array<{
      hidden?: boolean;
      content?: string;
      children?: Array<{ type: string; content: string }>;
    }>,
    inlineIndex,
  );
}

/** Move flags from an inline token immediately before an html fence (no paragraph wrappers). */
function moveInlineFlagsToFence(
  tokens: Array<{
    type: string;
    info: string;
    content?: string;
    hidden?: boolean;
    children?: Array<{ type: string; content: string }>;
  }>,
  fenceIndex: number,
): void {
  const inlineIndex = fenceIndex - 1;
  if (inlineIndex < 0) return;
  const inline = tokens[inlineIndex];
  if (inline.type !== "inline") return;
  const parsed = splitHeadingFlags(inline.content ?? "");
  if (!parsed) return;
  mergeFlagsIntoFence(tokens, fenceIndex, parsed);
  setInlineContent(inline, parsed.stripped);
  if (parsed.flags.includes("-noshow")) {
    inline.hidden = true;
    inline.children = [];
    return;
  }
  if (parsed.stripped) {
    return;
  }
  inline.hidden = true;
}

/** Move trailing heading flags onto the matching html fence info string. */
function moveHeadingFlagsToFence(
  tokens: Array<{ type: string; info: string; content?: string }>,
  fenceIndex: number,
): void {
  const heading = findPreviousHeadingInline(tokens, fenceIndex);
  if (!heading?.inline.content) return;
  const parsed = splitHeadingFlags(heading.inline.content);
  if (!parsed) return;
  tokens[fenceIndex].info = ["html", ...parsed.flags].join(" ");
  setInlineContent(heading.inline, parsed.stripped);
  if (parsed.flags.includes("-noshow")) {
    hideHeading(
      tokens as Array<{
        hidden?: boolean;
        content?: string;
        children?: Array<{ type: string; content: string }>;
      }>,
      heading.inlineIndex,
    );
    return;
  }
  // Keep inline child text in sync, or suppress the heading if only flags remained.
  if (parsed.stripped) return;
}

/** Scan html fences and migrate trailing heading `-flag` tokens into their fence info strings. */
function migrateLiveExampleFlags(
  tokens: Array<{ type: string; info: string; content?: string }>,
): void {
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.type !== "fence" || !token.info.trimStart().startsWith("html")) continue;
    moveHeadingFlagsToFence(tokens, index);
    moveParagraphFlagsToFence(
      tokens as Array<{ type: string; info: string; content?: string; hidden?: boolean }>,
      index,
    );
    moveInlineFlagsToFence(
      tokens as Array<{
        type: string;
        info: string;
        content?: string;
        hidden?: boolean;
        children?: Array<{ type: string; content: string }>;
      }>,
      index,
    );
  }
}

/**
 * A markdown-it plugin: turn `demo` fences into the demo panel. Use it with
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
export function demoMarkdownIt(md: MarkdownItLike, options: DemoMarkdownItOptions = {}): void {
  const fence = md.renderer.rules.fence;
  if (!fence) return;

  // Core rule: migrate `-flag` tokens from heading inline content into the following html fence's info
  // string, and strip them from the heading so they don't appear in the rendered title.
  if (options.liveExample) {
    md.core.ruler.push("live_example_flags", (state: { tokens: unknown[] }) => {
      migrateLiveExampleFlags(
        state.tokens as Array<{ type: string; info: string; content?: string }>,
      );
    });
  }

  md.renderer.rules.fence = (...args: Parameters<RendererRule>) => {
    const [tokens, index, , env] = args;
    const token = tokens[index];
    const info = token.info.trim();
    if (info === "demo") {
      const relativePath = (env as { relativePath?: string } | undefined)?.relativePath ?? "";
      const prefix = options.localePrefix?.(relativePath) ?? "";
      const demoOptions = prefix
        ? { ...options, demosPath: `${prefix}${options.demosPath ?? "demos/"}` }
        : options;
      return renderDemoFigure(resolveDemo(token.content.trim(), demoOptions));
    }
    const flags = new Set<string>(info.match(/-[a-z][a-z0-9-]*/gu) ?? []);
    // `-noshow` strips the html source fence and its live preview from rendered output.
    if (info.startsWith("html") && flags.has("-noshow")) {
      return "";
    }
    const rendered = fence(...args);
    // Seam a live preview onto each `@example` HTML fence on matching pages (the CSS-API pages load the
    // component CSS, so the same markup renders live). The rendered source fence stays as-is above it.
    const live = options.liveExample;
    if (live && info.startsWith("html")) {
      const relativePath = (env as { relativePath?: string } | undefined)?.relativePath ?? "";
      const html = token.content.replace(/\n$/u, "");
      // Parse -flag tokens from the info string (migrated by the core rule above).
      if (live.match(relativePath) && !isOverlay(html)) {
        return `${rendered}\n${live.wrap(html, flags, relativePath)}\n`;
      }
    }
    return rendered;
  };
}
