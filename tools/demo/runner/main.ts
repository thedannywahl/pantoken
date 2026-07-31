import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { LanguageRegistration } from "@shikijs/types";
import DOMPurify from "dompurify";
import "./runner.css";

type PartKey = "html" | "css" | "js";

// Highlight the read-only source with Shiki, using the same themes the docs' `@example` fences do
// (VitePress's default `github-light` / `github-dark`), so a demo's code reads identically to the
// examples beside it. The one JavaScript RegExp engine (no WASM) plus the two small theme JSONs keep
// the runner light; each grammar is code-split and loaded only when a demo actually uses that language.
const langLoaders: Record<PartKey, () => Promise<LanguageRegistration[]>> = {
  html: () => import("@shikijs/langs/html").then((m) => m.default),
  css: () => import("@shikijs/langs/css").then((m) => m.default),
  js: () => import("@shikijs/langs/javascript").then((m) => m.default),
};
// Shiki's grammar id per part (JS's grammar is registered under "javascript").
const langId: Record<PartKey, string> = { html: "html", css: "css", js: "javascript" };

const params = new URLSearchParams(location.search);
const cssUrls = (params.get("css") ?? "").split(",").filter(Boolean);
const srcUrl = params.get("src");
const mount = document.getElementById("runner");

// The embedding docs page's origin, so theme/size posts target only the host and can't be intercepted
// by a page that reframes the runner. `document.referrer` is the embedder's URL; fall back to our own
// origin (same-origin embedding — the runner is served by the docs site with `allow-same-origin`).
const HOST_ORIGIN = ((): string => {
  try {
    return document.referrer ? new URL(document.referrer).origin : location.origin;
  } catch {
    return location.origin;
  }
})();

// A manual override (set by the host's light/dark toggle) wins over the inherited scheme; null means
// "follow the embedding page".
let schemeOverride: "light" | "dark" | null = null;

/** The inherited scheme: the embedding page's `.dark`, else system (when opened top-level). */
function isDark(): boolean {
  try {
    if (window.parent && window.parent !== window) {
      return window.parent.document.documentElement.classList.contains("dark");
    }
  } catch {
    // Cross-origin parent.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches;
}
/** The scheme actually rendered: the override if set, otherwise the inherited scheme. */
const effectiveDark = (): boolean => (schemeOverride ? schemeOverride === "dark" : isDark());
const schemeName = (): string => (effectiveDark() ? "dark" : "light");

function fail(message: string): void {
  if (mount) mount.innerHTML = `<pre id="runner-error"></pre>`;
  const box = document.getElementById("runner-error");
  if (box) box.textContent = message;
}

/** Copy `text` to the clipboard, falling back to a hidden textarea + `execCommand` where the async API
 * is unavailable (e.g. an insecure context). */
async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Fall through to the legacy path below.
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

/** De-indent a block: drop surrounding blank lines, then strip the smallest common leading indent. */
function dedent(text: string): string {
  const lines = text.replace(/^\n+/, "").replace(/\s+$/, "").split("\n");
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => /^\s*/.exec(line)?.[0].length ?? 0);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(min)).join("\n");
}

/** The demos wrap their markup in a staging `<div class="instui-card">` so the preview sits on a card,
 * like the docs' `@example` previews. That wrapper is page staging, not part of the component's own
 * markup, so strip it (and de-indent) for the code view — the result still renders the full source. */
function stripCardWrapper(html: string): string {
  const match = /^<div\s+class="instui-card(?:\s+[^"]*)?"\s*>\n?([\s\S]*?)\n?<\/div>\s*$/i.exec(
    html.trim(),
  );
  return match ? dedent(match[1]) : html;
}

/** A hover-to-reveal copy button holding its own source `text`; toggles `.copied` for ~2s on success. */
function createCopyButton(text: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy";
  button.title = "Copy code";
  button.setAttribute("aria-label", "Copy code");
  let resetTimer: ReturnType<typeof setTimeout> | undefined;
  button.addEventListener("click", () => {
    void copyToClipboard(text).then(() => {
      button.classList.add("copied");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.classList.remove("copied");
        button.blur();
      }, 2000);
    });
  });
  return button;
}

// The body's default height hugs the demo but caps at this many rem; `resize: vertical` (runner.css)
// lets the reader drag it past that.
const MAX_DEFAULT_REM = 30;

/** The demo's parts: what the result renders (`original`), what the code view shows (`code`), the tab
 * labels, and which parts are actually present. */
interface DemoParts {
  original: Record<PartKey, string>;
  code: Record<PartKey, string>;
  labels: Record<PartKey, string>;
  parts: PartKey[];
}

/** The runner's element refs, parsed parts, and mutable state, shared by every helper below. */
interface RunnerCtx {
  mount: HTMLElement;
  loading: HTMLElement;
  runner: HTMLElement;
  tablist: HTMLElement;
  body: HTMLElement;
  codeArea: HTMLElement;
  resultFrame: HTMLIFrameElement;
  holders: Map<PartKey, HTMLElement>;
  original: Record<PartKey, string>;
  code: Record<PartKey, string>;
  labels: Record<PartKey, string>;
  parts: PartKey[];
  booting: boolean;
  currentTheme: string;
  activeCode: PartKey | null;
  resultContentHeight: number;
  userResized: boolean;
  lastAutoHeight: number;
  reportScheduled: boolean;
  resizeSettle?: ReturnType<typeof setTimeout>;
  resolveFirstSize?: () => void;
  resolveTheme?: () => void;
}

/** Split a demo's raw source into HTML/CSS/JS, plus the card-stripped copy the code view shows/copies. */
function parseSource(sourceText: string): DemoParts {
  let css = "";
  let js = "";
  const html = sourceText
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_match, body: string) => {
      css += `${body.trim()}\n`;
      return "";
    })
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (_match, body: string) => {
      js += `${body.trim()}\n`;
      return "";
    })
    .trim();
  const original: Record<PartKey, string> = { html, css: css.trim(), js: js.trim() };
  // What the code view shows and copies: the same source, but with the staging card wrapper stripped
  // from the HTML. The result (below) still renders `original`, so the preview keeps its card.
  const code: Record<PartKey, string> = { ...original, html: stripCardWrapper(original.html) };
  const labels: Record<PartKey, string> = { html: "HTML", css: "CSS", js: "JS" };
  const parts = (["html", "css", "js"] as PartKey[]).filter((key) => original[key]);
  return { original, code, labels, parts };
}

/** Inject the component/token sheets, resolving once every link has loaded (or errored). */
function loadStylesheets(hrefs: string[]): Promise<void[]> {
  return Promise.all(
    hrefs.map(
      (href) =>
        new Promise<void>((resolve) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          link.addEventListener("load", () => resolve());
          link.addEventListener("error", () => resolve());
          document.head.appendChild(link);
        }),
    ),
  );
}

/** Build the boot spinner shown until the runner is fully assembled and measured. */
function createLoadingSpinner(): HTMLDivElement {
  const loading = document.createElement("div");
  loading.className = "runner__loading";
  loading.setAttribute("role", "status");
  loading.setAttribute("aria-label", "Loading demo");
  loading.innerHTML = `<span class="runner__spinner"></span>`;
  return loading;
}

/** The runner's static shell: the view toggle bar plus the code/result body, built hidden. */
function runnerMarkup(): string {
  return `<div class="runner runner--show-result runner--booting">
      <div class="runner__bar">
        <fieldset class="instui-radio-input-group -variant-toggle">
          <legend class="instui-screen-reader-content">View</legend>
        </fieldset>
      </div>
      <div class="runner__body">
        <div class="runner__code"></div>
        <iframe class="runner__result" title="Result" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
    </div>`;
}

/** Post the runner's current height to the embedding host so it can size the demo iframe. */
function postSize(height: number): void {
  if (window.parent !== window)
    window.parent.postMessage({ type: "pantoken-demo-size", height }, HOST_ORIGIN);
}

/** Flip Shiki's light/dark color variables to match the toggle's effective scheme. */
function applyEditorScheme(): void {
  document.documentElement.classList.toggle("code-dark", effectiveDark());
}

/** Parse a CSS pixel length to a number, treating a non-numeric value as 0. */
function px(value: string): number {
  return Number.parseFloat(value) || 0;
}

/** Insert the runner shell, wire up its element refs and code holders, and seed the mutable state. */
function createRunnerContext(
  mount: HTMLElement,
  loading: HTMLElement,
  sourceText: string,
): RunnerCtx {
  const { original, code, labels, parts } = parseSource(sourceText);
  // The whole demo (toolbar chrome + rendered result) follows the site's theme, chosen by the palette
  // selector in the docs header and pushed here via `pantoken-demo-theme`. The one multi-theme token
  // sheet (in cssUrls) covers every theme, so switching is just toggling the `data-pantoken-theme`
  // attribute — on this chrome document, and on the result's `<html>` (stamped in render). Starts on the
  // default until the host replies to our request below.
  document.documentElement.dataset.pantokenTheme = "rebrand";
  // Built hidden (`runner--booting`) alongside the spinner; `reveal()` swaps them once ready.
  mount.insertAdjacentHTML("beforeend", runnerMarkup());
  const runner = mount.querySelector(".runner") as HTMLElement;
  const tablist = mount.querySelector(".instui-radio-input-group") as HTMLElement;
  const body = mount.querySelector(".runner__body") as HTMLElement;
  const codeArea = mount.querySelector(".runner__code") as HTMLElement;
  const resultFrame = mount.querySelector(".runner__result") as HTMLIFrameElement;

  // The code panes start empty (so the tabs work); Shiki fills them in the background — see
  // `buildEditors`. The read-only viewer reads like the example's code fence: no gutter, no editing,
  // line wrapping handled in runner.css.
  const holders = new Map<PartKey, HTMLElement>();
  for (const key of parts) {
    const holder = document.createElement("div");
    holder.className = "runner__editor";
    codeArea.appendChild(holder);
    holders.set(key, holder);
  }
  return {
    mount,
    loading,
    runner,
    tablist,
    body,
    codeArea,
    resultFrame,
    holders,
    original,
    code,
    labels,
    parts,
    booting: true,
    currentTheme: "rebrand",
    activeCode: parts[0] ?? null,
    resultContentHeight: 0,
    userResized: false,
    lastAutoHeight: -1,
    reportScheduled: false,
  };
}

/** Render the demo into the sandboxed result iframe (chrome scheme, sanitized markup, size reporter). */
function render(ctx: RunnerCtx): void {
  const scheme = schemeName();
  // The chrome stays on the inherited (page) scheme; only the rendered result follows the toggle.
  document.documentElement.style.colorScheme = isDark() ? "dark" : "light";
  const links = cssUrls.map((href) => `<link rel="stylesheet" href="${href}">`).join("");
  // The markup can be arbitrary (edited live, or a shared ?src= URL), so sanitize it — strip
  // scripts and event handlers, keep HTML + SVG. The demo's own JS runs from the JS tab below.
  const safeHtml = DOMPurify.sanitize(ctx.original.html, {
    USE_PROFILES: { html: true, svg: true, svgFilters: true },
  });
  // A comfortable result gutter (base.css resets body margin to 0). Declared before the demo's own
  // <style> so a demo can override it, and with a plain `body` selector so it beats base's :where().
  const gutter = `<style>body{padding:var(--instui-spacing-space-md, 1rem)}</style>`;
  // Report the rendered content's height to the runner (its parent) so the runner can size itself —
  // and, in turn, the embedding demo figure — to the demo instead of a fixed box. Fires on load and
  // whenever the content reflows (fonts, images, the demo's own JS).
  //
  // Measure the BODY box, not <html>: an iframe's <html> stretches to fill the frame's viewport, so
  // `documentElement.scrollHeight` reports the frame height, not the content — a feedback loop that
  // never shrinks to the demo. The body hugs its own content, so it's the true height to report.
  // It also listens for `pantoken-demo-freeze`: while the reader drags the runner's resize handle, the
  // runner asks it to hide its own scrollbar so it doesn't flicker as the height recomputes.
  const sizeReporter = `<script>(function(){var p=window.parent;function r(){p.postMessage({type:"pantoken-demo-result-size",height:Math.ceil(document.body.getBoundingClientRect().height)},"*");}addEventListener("load",r);if(window.ResizeObserver){new ResizeObserver(r).observe(document.body);}addEventListener("message",function(e){if(e&&e.data&&e.data.type==="pantoken-demo-freeze"){document.documentElement.style.overflow=e.data.value?"hidden":"";}});r();})()</script>`;
  ctx.resultFrame.srcdoc =
    `<!doctype html><html data-pantoken-theme="${ctx.currentTheme}" style="color-scheme:${scheme}"><head><meta charset="utf-8">${links}${gutter}` +
    `<style>${ctx.original.css}</style></head><body class="pantoken-prose">${safeHtml}` +
    `<script>${ctx.original.js}</script>${sizeReporter}</body></html>`;
}

/** Swap the code's colors (and re-render the result) when the embedding page toggles light/dark. */
function applyTheme(ctx: RunnerCtx): void {
  applyEditorScheme();
  render(ctx);
}

/** Switch the token theme (rebrand/canvas/…) on the chrome and result, then re-render. */
function setTheme(ctx: RunnerCtx, name: string): void {
  if (name === ctx.currentTheme) return;
  ctx.currentTheme = name;
  document.documentElement.dataset.pantokenTheme = name;
  render(ctx);
}

/** Show only the code pane for `key` (or none), toggling the active data attribute. */
function showEditor(ctx: RunnerCtx, key: PartKey | null): void {
  for (const [holderKey, holder] of ctx.holders) {
    holder.toggleAttribute("data-active", holderKey === key);
  }
}

/** Activate a view tab (result or a code part), syncing the radios and re-sizing the player. */
function select(ctx: RunnerCtx, name: string): void {
  for (const input of ctx.tablist.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
    input.checked = input.value === name;
  }
  if (name === "result") {
    ctx.runner.classList.add("runner--show-result");
  } else {
    ctx.runner.classList.remove("runner--show-result");
    ctx.activeCode = name as PartKey;
    showEditor(ctx, ctx.activeCode);
  }
  // Re-size the player for the new view (a code tab adds the editor's height above the result). Run
  // now, and again next frame once the just-shown editor has laid out and its scrollHeight is accurate.
  applyAutoHeight(ctx);
  reportSize(ctx);
  requestAnimationFrame(() => {
    applyAutoHeight(ctx);
    reportSize(ctx);
  });
}

/** Report the whole runner's height to the host iframe (suppressed while booting or standalone). */
function reportSize(ctx: RunnerCtx): void {
  if (window.parent === window || ctx.booting) return;
  window.parent.postMessage(
    { type: "pantoken-demo-size", height: Math.ceil(ctx.runner.getBoundingClientRect().height) },
    HOST_ORIGIN,
  );
}

/** Coalesce the rapid resize reports during a drag into one per animation frame. */
function scheduleReport(ctx: RunnerCtx): void {
  if (ctx.reportScheduled) return;
  ctx.reportScheduled = true;
  requestAnimationFrame(() => {
    ctx.reportScheduled = false;
    reportSize(ctx);
  });
}

/** The runner's non-body height (toolbar + the body's margin), measured cleanly as runner − body. */
function chromeHeight(ctx: RunnerCtx): number {
  return Math.max(
    0,
    Math.round(ctx.runner.getBoundingClientRect().height - ctx.body.getBoundingClientRect().height),
  );
}

/** The body's default height: hug the demo (capped) in result view, stack code above it in code view. */
function defaultBodyHeight(ctx: RunnerCtx): number {
  const remPx = px(getComputedStyle(document.documentElement).fontSize) || 16;
  const cap = Math.max(0, Math.floor(MAX_DEFAULT_REM * remPx - chromeHeight(ctx)));
  const bs = getComputedStyle(ctx.body);
  const bodyExtra =
    px(bs.paddingTop) + px(bs.paddingBottom) + px(bs.borderTopWidth) + px(bs.borderBottomWidth);
  // The result pane's rendered height: hug the demo, capped so the result view stays within the cap.
  const resultView = Math.min(ctx.resultContentHeight, Math.max(0, cap - bodyExtra));
  if (ctx.runner.classList.contains("runner--show-result")) return resultView + bodyExtra;
  // Code view: the code pane (its content plus its bottom divider) added above the maintained result.
  const codeDivider = px(getComputedStyle(ctx.codeArea).borderBottomWidth);
  return ctx.codeArea.scrollHeight + codeDivider + resultView + bodyExtra;
}

/** Set the body to its default height unless the reader has taken over with the resize handle. */
function applyAutoHeight(ctx: RunnerCtx): void {
  if (ctx.userResized) return;
  ctx.body.style.height = `${defaultBodyHeight(ctx)}px`;
  ctx.lastAutoHeight = Math.round(ctx.body.getBoundingClientRect().height);
}

/** During a drag, hide the code and result scrollbars so they don't flicker as the height recomputes. */
function setResizing(ctx: RunnerCtx, on: boolean): void {
  ctx.runner.classList.toggle("runner--resizing", on);
  // The result frame is a srcdoc iframe sandboxed with `allow-same-origin`, so it inherits our origin
  // — target it exactly rather than "*", so the freeze message can't be intercepted by another frame.
  ctx.resultFrame.contentWindow?.postMessage(
    { type: "pantoken-demo-freeze", value: on },
    location.origin,
  );
}

/** Whether the observed height indicates the reader has manually resized the panel. */
function shouldLatchUserResize(ctx: RunnerCtx, height: number): boolean {
  return !ctx.userResized && ctx.lastAutoHeight >= 0 && Math.abs(height - ctx.lastAutoHeight) > 3;
}

/** Keep resize affordances active until a short settle delay after dragging stops. */
function settleResizeState(ctx: RunnerCtx): void {
  setResizing(ctx, true);
  clearTimeout(ctx.resizeSettle);
  ctx.resizeSettle = setTimeout(() => setResizing(ctx, false), 150);
}

/** ResizeObserver callback body split out so logic can stay testable and low-branch. */
function handleObservedBodyResize(ctx: RunnerCtx): void {
  const height = Math.round(ctx.body.getBoundingClientRect().height);
  if (shouldLatchUserResize(ctx, height)) ctx.userResized = true;
  if (ctx.userResized) settleResizeState(ctx);
  scheduleReport(ctx);
}

/** Watch for a reader-driven body resize: latch it, hide scrollbars for the drag, and report throttled. */
function observeBodyResize(ctx: RunnerCtx): void {
  if (window.ResizeObserver) {
    new ResizeObserver(() => handleObservedBodyResize(ctx)).observe(ctx.body);
  }
}

/** Add one segmented-radio view tab wired to select the matching view when checked. */
function addTab(ctx: RunnerCtx, name: string, label: string): void {
  // A segmented radio: one label per view, single-select via the shared name — the checked radio is
  // the active tab.
  const wrapper = document.createElement("label");
  wrapper.className = "instui-radio -variant-toggle -size-sm";
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "runner-view";
  input.value = name;
  input.addEventListener("change", () => {
    if (input.checked) select(ctx, name);
  });
  wrapper.append(input, document.createTextNode(` ${label}`));
  ctx.tablist.appendChild(wrapper);
}

/** Build the view tabs: Result first, then one per present code part. */
function initTabs(ctx: RunnerCtx): void {
  addTab(ctx, "result", "Result");
  for (const key of ctx.parts) addTab(ctx, key, ctx.labels[key]);
}

/** Swap the spinner for the finished runner and start reporting the real height. */
function reveal(ctx: RunnerCtx): void {
  ctx.booting = false;
  ctx.loading.remove();
  ctx.runner.classList.remove("runner--booting");
  applyAutoHeight(ctx);
  reportSize(ctx);
}

/** Load Shiki off the critical path and fill the code panes (with copy buttons), then re-size. */
async function buildEditors(ctx: RunnerCtx): Promise<void> {
  if (!ctx.parts.length) return;
  const [githubLight, githubDark] = await Promise.all([
    import("@shikijs/themes/github-light").then((m) => m.default),
    import("@shikijs/themes/github-dark").then((m) => m.default),
  ]);
  const highlighter = await createHighlighterCore({
    themes: [githubLight, githubDark],
    langs: await Promise.all(ctx.parts.map((key) => langLoaders[key]())),
    engine: createJavaScriptRegexEngine(),
  });
  for (const key of ctx.parts) {
    const holder = ctx.holders.get(key);
    if (!holder) continue;
    // Shiki already HTML-escapes the code, but the source can arrive from a `src` URL param, so run
    // the highlighter markup through DOMPurify too — it keeps Shiki's `<span style>` coloring while
    // stripping any executable markup, closing the DOM-XSS path even for untrusted input.
    const highlighted = highlighter.codeToHtml(ctx.code[key], {
      lang: langId[key],
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    holder.innerHTML = DOMPurify.sanitize(highlighted);
    holder.appendChild(createCopyButton(ctx.code[key]));
  }
  // The panes just gained content; if a code tab is showing, grow the player to fit it.
  applyAutoHeight(ctx);
  reportSize(ctx);
}

/** Create the two reveal gates — the first result-size report and the host's theme reply. */
function createGates(ctx: RunnerCtx): {
  firstResultSize: Promise<void>;
  themeReady: Promise<void>;
} {
  const firstResultSize = new Promise<void>((resolve) => {
    ctx.resolveFirstSize = resolve;
  });
  const themeReady = new Promise<void>((resolve) => {
    ctx.resolveTheme = resolve;
  });
  return { firstResultSize, themeReady };
}

/** A message posted to the runner by the host page or the sandboxed result frame. */
interface DemoMessage {
  type?: string;
  height?: number;
  theme?: string;
}

/**
 * Whether a `postMessage` origin is trusted: the embedding host, our own origin, or the sandboxed
 * result frame (whose opaque origin is the string `"null"`). Anything else is a page reframing us.
 */
function isTrustedOrigin(origin: string): boolean {
  return origin === HOST_ORIGIN || origin === location.origin || origin === "null";
}

/** Message handlers keyed by `type`; each validates its own payload so the dispatcher stays flat. */
const MESSAGE_HANDLERS: Record<string, (ctx: RunnerCtx, data: DemoMessage) => void> = {
  "pantoken-demo-scheme": (ctx) => {
    schemeOverride = effectiveDark() ? "light" : "dark";
    applyTheme(ctx);
  },
  "pantoken-demo-theme": (ctx, data) => {
    if (typeof data.theme !== "string") return;
    setTheme(ctx, data.theme);
    ctx.resolveTheme?.();
    ctx.resolveTheme = undefined;
  },
  "pantoken-demo-result-size": (ctx, data) => {
    if (typeof data.height !== "number") return;
    // Keep the last non-zero height: a hidden result frame (code view) can report 0, and we don't
    // want the figure to collapse when the reader is just editing.
    if (data.height > 0) ctx.resultContentHeight = data.height;
    ctx.resolveFirstSize?.();
    ctx.resolveFirstSize = undefined;
    applyAutoHeight(ctx);
    reportSize(ctx);
  },
};

/** Guard and return the message handler for a payload, if any. */
function handlerForMessage(
  data: DemoMessage | null,
): ((ctx: RunnerCtx, data: DemoMessage) => void) | undefined {
  if (!data?.type) return undefined;
  return MESSAGE_HANDLERS[data.type];
}

/** Handle host messages: scheme toggle, theme pick, and result-size reports (each may gate the reveal). */
function handleMessage(ctx: RunnerCtx, event: MessageEvent): void {
  // Drop posts from an untrusted origin so a page that reframes the runner can't drive it.
  if (!isTrustedOrigin(event.origin)) return;
  const data = event.data as DemoMessage | null;
  const handler = handlerForMessage(data);
  handler?.(ctx, data as DemoMessage);
}

/** Validate the required source URL parameter, reporting an actionable error when absent. */
function requireSourceUrl(): string | null {
  if (!srcUrl) {
    fail("No demo source (missing ?src=).");
    return null;
  }
  return srcUrl;
}

/** Fetch demo source text with no-cache and convert load errors into user-facing failures. */
async function loadSourceText(url: string): Promise<string | null> {
  try {
    // Revalidate so an edited demo snippet isn't served stale from cache.
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    fail(`Failed to load demo: ${String(error)}`);
    return null;
  }
}

/** Ask the host which theme to use, or (standalone, no parent) resolve the theme gate immediately. */
function requestTheme(ctx: RunnerCtx): void {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "pantoken-demo-request-theme" }, HOST_ORIGIN);
  } else {
    ctx.resolveTheme?.();
    ctx.resolveTheme = undefined;
  }
}

/** Keep the demo in sync with later light/dark toggles on the embedding page. */
function observeParentTheme(ctx: RunnerCtx): void {
  try {
    if (window.parent && window.parent !== window) {
      new MutationObserver(() => applyTheme(ctx)).observe(window.parent.document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  } catch {
    // Cross-origin — no live theme sync.
  }
}

async function main(): Promise<void> {
  if (!mount) return;
  const requiredSrcUrl = requireSourceUrl();
  if (!requiredSrcUrl) return;

  // Show a spinner and keep it until everything's ready, so the reader never sees the half-built states
  // flash by; then swap in the finished runner in one step (see `reveal`).
  const loading = createLoadingSpinner();
  mount.replaceChildren(loading);
  // Give the host a stable box to size to while we boot.
  postSize(Math.ceil(loading.getBoundingClientRect().height));

  // Inject the component/token sheets; the reveal waits on them so there's no unstyled flash.
  const cssLoaded = loadStylesheets(cssUrls);

  const sourceText = await loadSourceText(requiredSrcUrl);
  if (sourceText === null) return;

  const ctx = createRunnerContext(mount, loading, sourceText);
  // The code follows the toggle's scheme (`effectiveDark`); flip the Shiki color variables via a class.
  applyEditorScheme();
  observeBodyResize(ctx);
  initTabs(ctx);

  // Two gates for the reveal-ready render: the host's theme reply and the first result-size report.
  // Both resolve in the message handler below.
  const { firstResultSize, themeReady } = createGates(ctx);
  window.addEventListener("message", (event) => handleMessage(ctx, event));

  // Ask the host which theme to render, then wait for the reply (or a short timeout for standalone).
  requestTheme(ctx);
  await Promise.race([themeReady, new Promise<void>((resolve) => setTimeout(resolve, 500))]);

  showEditor(ctx, ctx.activeCode);
  select(ctx, "result");
  render(ctx);
  void buildEditors(ctx);

  // Reveal once the styles are in and the demo has measured itself — or after a safety timeout, so a
  // demo that never reports its size still appears.
  await Promise.race([
    Promise.all([cssLoaded, firstResultSize]),
    new Promise<void>((resolve) => setTimeout(resolve, 4000)),
  ]);
  reveal(ctx);

  // Keep the demo in sync with later light/dark toggles on the embedding page.
  observeParentTheme(ctx);
}

void main();
