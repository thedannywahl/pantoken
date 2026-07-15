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

async function main(): Promise<void> {
  if (!mount) return;
  if (!srcUrl) {
    fail("No demo source (missing ?src=).");
    return;
  }

  // Show a spinner immediately and keep it until everything's ready — styles loaded, the demo rendered
  // and measured — then swap in the finished runner in one step, so the reader never sees the half-built
  // states (unstyled chrome, jumping heights) flash by. The spinner is styled by the bundled runner.css,
  // so it needs none of the async component sheets below.
  let booting = true;
  const loading = document.createElement("div");
  loading.className = "runner__loading";
  loading.setAttribute("role", "status");
  loading.setAttribute("aria-label", "Loading demo");
  loading.innerHTML = `<span class="runner__spinner"></span>`;
  mount.replaceChildren(loading);
  const postSize = (height: number): void => {
    if (window.parent !== window)
      window.parent.postMessage({ type: "pantoken-demo-size", height }, "*");
  };
  // Give the host a stable box to size to while we boot.
  postSize(Math.ceil(loading.getBoundingClientRect().height));

  // Inject the component/token sheets, tracking when they've all loaded so the reveal can wait for them
  // (no unstyled flash). Everything reads paired --instui-* tokens, so it's dark-mode safe.
  const cssLoaded = Promise.all(
    cssUrls.map(
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

  // The whole demo (toolbar chrome + rendered result) follows the site's theme, chosen by the palette
  // selector in the docs header and pushed here via `pantoken-demo-theme`. The one multi-theme token
  // sheet (in cssUrls) covers every theme, so switching is just toggling the `data-pantoken-theme`
  // attribute — on this chrome document, and on the result's `<html>` (stamped in render). Starts on the
  // default until the host replies to our request below.
  let currentTheme = "rebrand";
  document.documentElement.dataset.pantokenTheme = currentTheme;
  const setTheme = (name: string): void => {
    if (name === currentTheme) return;
    currentTheme = name;
    document.documentElement.dataset.pantokenTheme = name;
    render();
  };

  let sourceText: string;
  try {
    // Revalidate so an edited demo snippet isn't served stale from cache.
    const response = await fetch(srcUrl, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    sourceText = await response.text();
  } catch (error) {
    fail(`Failed to load demo: ${String(error)}`);
    return;
  }

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

  // Built hidden (`runner--booting`) alongside the spinner; `reveal()` swaps them once ready.
  mount.insertAdjacentHTML(
    "beforeend",
    `<div class="runner runner--show-result runner--booting">
      <div class="runner__bar">
        <fieldset class="instui-radio-input-group -variant-toggle">
          <legend class="instui-screen-reader-content">View</legend>
        </fieldset>
      </div>
      <div class="runner__body">
        <div class="runner__code"></div>
        <iframe class="runner__result" title="Result" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
    </div>`,
  );
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

  // The code follows the toggle's scheme (`effectiveDark`); flip the Shiki color variables via a class.
  const applyEditorScheme = (): void => {
    document.documentElement.classList.toggle("code-dark", effectiveDark());
  };
  applyEditorScheme();

  // Load Shiki and highlight the code panes — kept OFF the critical path (not awaited before the reveal),
  // so the Result view appears without waiting on the grammars to download and parse. Uses the same
  // themes the docs' `@example` fences do; a `.copied` copy button rides along on each pane.
  const buildEditors = async (): Promise<void> => {
    if (!parts.length) return;
    const [githubLight, githubDark] = await Promise.all([
      import("@shikijs/themes/github-light").then((m) => m.default),
      import("@shikijs/themes/github-dark").then((m) => m.default),
    ]);
    const highlighter = await createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: await Promise.all(parts.map((key) => langLoaders[key]())),
      engine: createJavaScriptRegexEngine(),
    });
    for (const key of parts) {
      const holder = holders.get(key);
      if (!holder) continue;
      holder.innerHTML = highlighter.codeToHtml(code[key], {
        lang: langId[key],
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
      });
      holder.appendChild(createCopyButton(code[key]));
    }
    // The panes just gained content; if a code tab is showing, grow the player to fit it.
    applyAutoHeight();
    reportSize();
  };

  function render(): void {
    const scheme = schemeName();
    // The chrome stays on the inherited (page) scheme; only the rendered result follows the toggle.
    document.documentElement.style.colorScheme = isDark() ? "dark" : "light";
    const links = cssUrls.map((href) => `<link rel="stylesheet" href="${href}">`).join("");
    // The markup can be arbitrary (edited live, or a shared ?src= URL), so sanitize it — strip
    // scripts and event handlers, keep HTML + SVG. The demo's own JS runs from the JS tab below.
    const safeHtml = DOMPurify.sanitize(original.html, {
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
    resultFrame.srcdoc =
      `<!doctype html><html data-pantoken-theme="${currentTheme}" style="color-scheme:${scheme}"><head><meta charset="utf-8">${links}${gutter}` +
      `<style>${original.css}</style></head><body class="pantoken-prose">${safeHtml}` +
      `<script>${original.js}</script>${sizeReporter}</body></html>`;
  }

  // Swap the code's colors (and re-render the result) when the embedding page toggles light/dark.
  function applyTheme(): void {
    applyEditorScheme();
    render();
  }

  let activeCode: PartKey | null = parts[0] ?? null;
  const showEditor = (key: PartKey | null): void => {
    for (const [holderKey, holder] of holders) {
      holder.toggleAttribute("data-active", holderKey === key);
    }
  };
  const select = (name: string): void => {
    for (const input of tablist.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
      input.checked = input.value === name;
    }
    if (name === "result") {
      runner.classList.add("runner--show-result");
    } else {
      runner.classList.remove("runner--show-result");
      activeCode = name as PartKey;
      showEditor(activeCode);
    }
    // Re-size the player for the new view (a code tab adds the editor's height above the result). Run
    // now, and again next frame once the just-shown editor has laid out and its scrollHeight is accurate.
    applyAutoHeight();
    reportSize();
    requestAnimationFrame(() => {
      applyAutoHeight();
      reportSize();
    });
  };

  // Size the player, then tell the embedding figure how tall to make its iframe. The body's default
  // height hugs the demo but caps at 30rem; `resize: vertical` (runner.css) lets the reader drag it past
  // that, and once they do we latch `userResized` and stop auto-sizing, so a tab switch or theme change
  // doesn't snap their height back. We always report `toolbar + body` so the figure iframe mirrors the
  // runner exactly — a standalone tab (no parent) has nothing to size, so it skips the report.
  const MAX_DEFAULT_REM = 30;
  let resultContentHeight = 0;
  let userResized = false;
  let lastAutoHeight = -1;

  // Report the whole runner's height (toolbar + the body and its margin), not just `toolbar + body`, so
  // the iframe mirrors it exactly — otherwise the body's margin is clipped and the resize grip with it.
  // Suppressed while booting: the host holds the stable spinner box until `reveal()` reports the real
  // height.
  const reportSize = (): void => {
    if (window.parent === window || booting) return;
    window.parent.postMessage(
      { type: "pantoken-demo-size", height: Math.ceil(runner.getBoundingClientRect().height) },
      "*",
    );
  };
  // Coalesce the rapid reports during a drag into one per frame.
  let reportScheduled = false;
  const scheduleReport = (): void => {
    if (reportScheduled) return;
    reportScheduled = true;
    requestAnimationFrame(() => {
      reportScheduled = false;
      reportSize();
    });
  };

  // Everything in the runner that isn't the body (toolbar + the body's margin); fixed regardless of the
  // body's height, so `runner − body` measures it cleanly.
  const chromeHeight = (): number =>
    Math.max(
      0,
      Math.round(runner.getBoundingClientRect().height - body.getBoundingClientRect().height),
    );

  // The body's default height. The body is `box-sizing: border-box`, so its own padding + border sit on
  // top of the room the panes need — add them in (`bodyExtra`), or the panes come up short and the demo
  // shows a needless scrollbar.
  //
  // Result view: hug the demo, capped at MAX_DEFAULT_REM. Code view: keep the result at that same
  // rendered height and stack the code above it (auto-fit to the code's own height), so the player grows
  // to fit both rather than halving a fixed box. Either default is still draggable.
  const px = (value: string): number => Number.parseFloat(value) || 0;
  const defaultBodyHeight = (): number => {
    const remPx = px(getComputedStyle(document.documentElement).fontSize) || 16;
    const cap = Math.max(0, Math.floor(MAX_DEFAULT_REM * remPx - chromeHeight()));
    const bs = getComputedStyle(body);
    const bodyExtra =
      px(bs.paddingTop) + px(bs.paddingBottom) + px(bs.borderTopWidth) + px(bs.borderBottomWidth);
    // The result pane's rendered height: hug the demo, capped so the result view stays within the cap.
    const resultView = Math.min(resultContentHeight, Math.max(0, cap - bodyExtra));
    if (runner.classList.contains("runner--show-result")) return resultView + bodyExtra;
    // Code view: the code pane (its content plus its bottom divider) added above the maintained result.
    const codeDivider = px(getComputedStyle(codeArea).borderBottomWidth);
    return codeArea.scrollHeight + codeDivider + resultView + bodyExtra;
  };

  // Set the body to its default height, unless the reader has taken over with the resize handle. Read
  // back the height the browser actually used (min-height can clamp our request) so the observer below
  // compares against the real value and doesn't mistake that clamp for a user drag.
  const applyAutoHeight = (): void => {
    if (userResized) return;
    body.style.height = `${defaultBodyHeight()}px`;
    lastAutoHeight = Math.round(body.getBoundingClientRect().height);
  };

  // While the reader drags the resize handle, hide the panes' scrollbars so they don't flicker as the
  // height recomputes: a class covers the code pane, and a postMessage asks the result frame to hide its
  // own (inner) scrollbar. A settle timer restores them shortly after the drag stops.
  const setResizing = (on: boolean): void => {
    runner.classList.toggle("runner--resizing", on);
    resultFrame.contentWindow?.postMessage({ type: "pantoken-demo-freeze", value: on }, "*");
  };
  let resizeSettle: ReturnType<typeof setTimeout> | undefined;

  // A body height change we didn't make (beyond a rounding fuzz) is the reader dragging the handle:
  // latch it so we stop overriding their choice, hide the scrollbars for the drag, and report (throttled
  // to one per frame) so the host iframe tracks along.
  if (window.ResizeObserver) {
    new ResizeObserver(() => {
      const height = Math.round(body.getBoundingClientRect().height);
      if (!userResized && lastAutoHeight >= 0 && Math.abs(height - lastAutoHeight) > 3) {
        userResized = true;
      }
      if (userResized) {
        setResizing(true);
        clearTimeout(resizeSettle);
        resizeSettle = setTimeout(() => setResizing(false), 150);
      }
      scheduleReport();
    }).observe(body);
  }

  const addTab = (name: string, label: string): void => {
    // A segmented radio: one label per view, single-select via the shared name — the checked radio is
    // the active tab.
    const wrapper = document.createElement("label");
    wrapper.className = "instui-radio -variant-toggle -size-sm";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "runner-view";
    input.value = name;
    input.addEventListener("change", () => {
      if (input.checked) select(name);
    });
    wrapper.append(input, document.createTextNode(` ${label}`));
    tablist.appendChild(wrapper);
  };
  addTab("result", "Result");
  for (const key of parts) addTab(key, labels[key]);

  // Swap the spinner for the finished runner and start reporting the real height.
  const reveal = (): void => {
    booting = false;
    loading.remove();
    runner.classList.remove("runner--booting");
    applyAutoHeight();
    reportSize();
  };

  // Two things gate the reveal-ready render: the host's theme reply (so the first render is in the right
  // theme — no post-reveal re-render flash) and the first result-size report (the demo has rendered and
  // measured). Both resolve in the message handler below.
  let resolveFirstSize: (() => void) | undefined;
  const firstResultSize = new Promise<void>((resolve) => {
    resolveFirstSize = resolve;
  });
  let resolveTheme: (() => void) | undefined;
  const themeReady = new Promise<void>((resolve) => {
    resolveTheme = resolve;
  });

  // The docs header drives this runner: `pantoken-demo-theme` picks the token theme (rebrand/canvas/…)
  // and the demo-figure light/dark toggle posts `pantoken-demo-scheme` to flip the scheme.
  window.addEventListener("message", (event) => {
    const data = event.data as { type?: string; height?: number; theme?: string } | null;
    if (data?.type === "pantoken-demo-scheme") {
      schemeOverride = effectiveDark() ? "light" : "dark";
      applyTheme();
    } else if (data?.type === "pantoken-demo-theme" && typeof data.theme === "string") {
      setTheme(data.theme);
      resolveTheme?.();
      resolveTheme = undefined;
    } else if (data?.type === "pantoken-demo-result-size" && typeof data.height === "number") {
      // Keep the last non-zero height: a hidden result frame (code view) can report 0, and we don't
      // want the figure to collapse when the reader is just editing.
      if (data.height > 0) resultContentHeight = data.height;
      resolveFirstSize?.();
      resolveFirstSize = undefined;
      applyAutoHeight();
      reportSize();
    }
  });

  // Ask the host which theme to render, then render once it replies (or after a short wait). Standalone
  // (no parent) has nothing to ask, so proceed straight away.
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "pantoken-demo-request-theme" }, "*");
  } else {
    resolveTheme?.();
    resolveTheme = undefined;
  }
  await Promise.race([themeReady, new Promise<void>((resolve) => setTimeout(resolve, 500))]);

  showEditor(activeCode);
  select("result");
  render();
  void buildEditors();

  // Reveal once the styles are in and the demo has measured itself — or after a safety timeout, so a
  // demo that never reports its size still appears.
  await Promise.race([
    Promise.all([cssLoaded, firstResultSize]),
    new Promise<void>((resolve) => setTimeout(resolve, 4000)),
  ]);
  reveal();

  // Keep the demo in sync with later light/dark toggles on the embedding page.
  try {
    if (window.parent && window.parent !== window) {
      new MutationObserver(() => applyTheme()).observe(window.parent.document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  } catch {
    // Cross-origin — no live theme sync.
  }
}

void main();
