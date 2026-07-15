import { createHighlighterCore, type HighlighterCore } from "shiki/core";
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

async function main(): Promise<void> {
  if (!mount) return;
  if (!srcUrl) {
    fail("No demo source (missing ?src=).");
    return;
  }

  // The runner chrome is styled with the InstUI component sheet, so inject the theme-independent
  // stylesheets (component CSS). Everything reads paired --instui-* tokens, so it's dark-mode safe.
  for (const href of cssUrls) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

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
  const labels: Record<PartKey, string> = { html: "HTML", css: "CSS", js: "JS" };
  const parts = (["html", "css", "js"] as PartKey[]).filter((key) => original[key]);

  mount.innerHTML = `
    <div class="runner runner--show-result">
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
  const runner = mount.querySelector(".runner") as HTMLElement;
  const bar = mount.querySelector(".runner__bar") as HTMLElement;
  const tablist = mount.querySelector(".instui-radio-input-group") as HTMLElement;
  const codeArea = mount.querySelector(".runner__code") as HTMLElement;
  const resultFrame = mount.querySelector(".runner__result") as HTMLIFrameElement;

  // One highlighter, loaded with both themes and only the grammars this demo uses. Shiki emits both
  // themes' colors as `--shiki-light` / `--shiki-dark` CSS variables (`defaultColor: false`), so the
  // code follows light/dark by toggling a class (see `applyEditorScheme`) — no re-highlight on toggle.
  let highlighter: HighlighterCore | undefined;
  if (parts.length) {
    const [githubLight, githubDark] = await Promise.all([
      import("@shikijs/themes/github-light").then((m) => m.default),
      import("@shikijs/themes/github-dark").then((m) => m.default),
    ]);
    highlighter = await createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: await Promise.all(parts.map((key) => langLoaders[key]())),
      engine: createJavaScriptRegexEngine(),
    });
  }

  const holders = new Map<PartKey, HTMLElement>();
  for (const key of parts) {
    const holder = document.createElement("div");
    holder.className = "runner__editor";
    // A read-only source viewer: the highlighted snippet reads like the example's code fence — no
    // gutter, no editing. Wrapping is handled in runner.css so long lines stay in the column.
    holder.innerHTML =
      highlighter?.codeToHtml(original[key], {
        lang: langId[key],
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
      }) ?? "";
    codeArea.appendChild(holder);
    holders.set(key, holder);
  }

  // The code follows the toggle's scheme (`effectiveDark`); flip the Shiki color variables via a class.
  const applyEditorScheme = (): void => {
    document.documentElement.classList.toggle("code-dark", effectiveDark());
  };
  applyEditorScheme();

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
    const sizeReporter = `<script>(function(){var p=window.parent;function r(){p.postMessage({type:"pantoken-demo-result-size",height:Math.ceil(document.body.getBoundingClientRect().height)},"*");}addEventListener("load",r);if(window.ResizeObserver){new ResizeObserver(r).observe(document.body);}r();})()</script>`;
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
    // Re-size the figure for the new view (a code tab adds the editor's height above the result). Run
    // now (so the pane cap + frame update immediately) and again next frame, once the just-shown editor
    // has laid out and its scrollHeight is accurate.
    reportSize();
    requestAnimationFrame(reportSize);
  };

  // Ask the embedding demo figure to size to this runner — the toolbar plus the rendered demo's own
  // height (reported by the result frame below). The figure clamps to its own min/max-height, so a
  // short demo gets a compact player and a tall one scrolls. A standalone tab has no parent to size, so
  // skip the report there.
  let resultContentHeight = 0;
  const reportSize = (): void => {
    if (window.parent === window) return;
    // Cap each split pane at half the space below the toolbar so the whole player stays within 30rem.
    // The CSS uses this for both panes' max-height (they scroll past it); set it every time so it tracks
    // the toolbar height.
    const remPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const paneMax = Math.max(0, Math.floor((30 * remPx - bar.offsetHeight) / 2));
    runner.style.setProperty("--runner-pane-max", `${paneMax}px`);
    const rb = getComputedStyle(resultFrame);
    const resultBorders =
      (Number.parseFloat(rb.borderTopWidth) || 0) + (Number.parseFloat(rb.borderBottomWidth) || 0);
    // The height that shows the whole demo (content plus the result frame's own top/bottom borders).
    const resultFull = resultContentHeight + resultBorders;
    // Result view: the demo fills the player. Split view: stack the (capped) code above the (capped)
    // result — CSS gives each pane its own scrollbar, so no iframe-height juggling (which would loop
    // against the result reporter) is needed here.
    const bodyHeight = runner.classList.contains("runner--show-result")
      ? resultFull
      : Math.min(codeArea.scrollHeight, paneMax) + Math.min(resultFull, paneMax);
    window.parent.postMessage(
      { type: "pantoken-demo-size", height: bar.offsetHeight + bodyHeight },
      "*",
    );
  };

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

  showEditor(activeCode);
  select("result");
  render();

  // The docs header drives this runner: `pantoken-demo-theme` picks the token theme (rebrand/canvas/…)
  // and the demo-figure light/dark toggle posts `pantoken-demo-scheme` to flip the scheme.
  window.addEventListener("message", (event) => {
    const data = event.data as { type?: string; height?: number; theme?: string } | null;
    if (data?.type === "pantoken-demo-scheme") {
      schemeOverride = effectiveDark() ? "light" : "dark";
      applyTheme();
    } else if (data?.type === "pantoken-demo-theme" && typeof data.theme === "string") {
      setTheme(data.theme);
    } else if (data?.type === "pantoken-demo-result-size" && typeof data.height === "number") {
      // Keep the last non-zero height: a hidden result frame (code view) can report 0, and we don't
      // want the figure to collapse when the reader is just editing.
      if (data.height > 0) resultContentHeight = data.height;
      reportSize();
    }
  });

  // Ask the host which theme to render; it replies with `pantoken-demo-theme`.
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "pantoken-demo-request-theme" }, "*");
  }

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
