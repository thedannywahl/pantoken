import { EditorView, basicSetup } from "codemirror";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
import DOMPurify from "dompurify";
import "./runner.css";

type PartKey = "html" | "css" | "js";

// Lucide glyphs from the pantoken icon set, inlined so we don't bundle all 1,777.
const ICON = {
  split:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/></svg>',
  square:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
  reset:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  chevron:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
};

// Language modes and the dark editor theme are code-split: each becomes its own chunk, loaded only
// when a demo actually uses that language (or when dark mode is active).
const langLoaders: Record<PartKey, () => Promise<Extension>> = {
  html: () => import("@codemirror/lang-html").then((m) => m.html()),
  css: () => import("@codemirror/lang-css").then((m) => m.css()),
  js: () => import("@codemirror/lang-javascript").then((m) => m.javascript()),
};
let oneDarkPromise: Promise<Extension> | undefined;
const loadOneDark = (): Promise<Extension> =>
  (oneDarkPromise ??= import("@codemirror/theme-one-dark").then((m) => m.oneDark));

interface DemoTheme {
  name: string;
  label: string;
  css: string;
}

const params = new URLSearchParams(location.search);
const cssUrls = (params.get("css") ?? "").split(",").filter(Boolean);
const themes: DemoTheme[] = (() => {
  try {
    return JSON.parse(decodeURIComponent(params.get("themes") ?? "[]")) as DemoTheme[];
  } catch {
    return [];
  }
})();
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

  // The toolbar always stays on the default (first) theme; only the rendered result follows the
  // switcher. So the outer doc's token sheet is fixed, and `themeCss` (used by render) is swappable.
  const toolbarThemeCss = themes[0]?.css ?? "";
  let themeCss = themes[0]?.css ?? "";
  if (toolbarThemeCss) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = toolbarThemeCss;
    document.head.appendChild(link);
  }

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
        <div class="instui-button-group" role="tablist"></div>
        <span class="runner__spacer"></span>
        <div class="runner__theme"${themes.length ? "" : " hidden"}>
          <button class="instui-button -secondary -sm" data-role="theme-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            <span data-role="theme-label"></span>
            <span class="runner__icon">${ICON.chevron}</span>
          </button>
          <div class="instui-menu runner__theme-menu" data-role="theme-menu" role="menu" hidden></div>
        </div>
        <button class="instui-button -toggle -sm -icon" data-role="split" type="button" aria-pressed="false" data-tooltip="Split" aria-label="Split">
          <span class="runner__icon">${ICON.split}</span>
        </button>
        <button class="instui-button -secondary -sm -icon" data-role="reset" type="button" data-tooltip="Reset" aria-label="Reset" disabled>
          <span class="runner__icon">${ICON.reset}</span>
        </button>
      </div>
      <div class="runner__body">
        <div class="runner__code"></div>
        <iframe class="runner__result" title="Result" sandbox="allow-scripts allow-same-origin"></iframe>
      </div>
    </div>`;
  const runner = mount.querySelector(".runner") as HTMLElement;
  const tablist = mount.querySelector(".instui-button-group") as HTMLElement;
  const codeArea = mount.querySelector(".runner__code") as HTMLElement;
  const resultFrame = mount.querySelector(".runner__result") as HTMLIFrameElement;
  const splitButton = mount.querySelector('[data-role="split"]') as HTMLButtonElement;
  const resetButton = mount.querySelector('[data-role="reset"]') as HTMLButtonElement;

  const themeSlot = new Compartment();
  const editors = new Map<PartKey, EditorView>();
  let renderTimer: ReturnType<typeof setTimeout> | undefined;
  const scheduleRender = (): void => {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 250);
  };

  // Reset is only useful once an editor drifts from its original snippet, so gate it on that.
  const isDirty = (): boolean =>
    parts.some(
      (key) => (editors.get(key)?.state.doc.toString() ?? original[key]) !== original[key],
    );
  const updateResetState = (): void => {
    resetButton.disabled = !isDirty();
  };

  const darkTheme = effectiveDark() ? await loadOneDark() : [];
  for (const key of parts) {
    const holder = document.createElement("div");
    holder.className = "runner__editor";
    codeArea.appendChild(holder);
    editors.set(
      key,
      new EditorView({
        parent: holder,
        state: EditorState.create({
          doc: original[key],
          extensions: [
            basicSetup,
            await langLoaders[key](),
            themeSlot.of(darkTheme),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                scheduleRender();
                updateResetState();
              }
            }),
          ],
        }),
      }),
    );
  }

  const contentOf = (key: PartKey): string =>
    editors.get(key)?.state.doc.toString() ?? original[key];

  function render(): void {
    const scheme = schemeName();
    // The chrome stays on the inherited (page) scheme; only the rendered result follows the toggle.
    document.documentElement.style.colorScheme = isDark() ? "dark" : "light";
    const links = [...cssUrls, themeCss]
      .filter(Boolean)
      .map((href) => `<link rel="stylesheet" href="${href}">`)
      .join("");
    // The markup can be arbitrary (edited live, or a shared ?src= URL), so sanitize it — strip
    // scripts and event handlers, keep HTML + SVG. The demo's own JS runs from the JS tab below.
    const safeHtml = DOMPurify.sanitize(contentOf("html"), {
      USE_PROFILES: { html: true, svg: true, svgFilters: true },
    });
    // A comfortable result gutter (base.css resets body margin to 0). Declared before the demo's own
    // <style> so a demo can override it, and with a plain `body` selector so it beats base's :where().
    const gutter = `<style>body{padding:var(--instui-spacing-space-md, 1rem)}</style>`;
    resultFrame.srcdoc =
      `<!doctype html><html style="color-scheme:${scheme}"><head><meta charset="utf-8">${links}${gutter}` +
      `<style>${contentOf("css")}</style></head><body class="pantoken-prose">${safeHtml}` +
      `<script>${contentOf("js")}</script></body></html>`;
  }

  // Swap the editors' theme (and re-render the result) when the embedding page toggles light/dark.
  async function applyTheme(): Promise<void> {
    const theme = effectiveDark() ? await loadOneDark() : [];
    for (const view of editors.values()) view.dispatch({ effects: themeSlot.reconfigure(theme) });
    render();
  }

  let activeCode: PartKey | null = parts[0] ?? null;
  const showEditor = (key: PartKey | null): void => {
    for (const [editorKey, view] of editors) {
      (view.dom.parentElement as HTMLElement).toggleAttribute("data-active", editorKey === key);
    }
  };
  const select = (name: string): void => {
    for (const tab of tablist.querySelectorAll<HTMLElement>(".instui-button")) {
      tab.setAttribute("aria-pressed", String(tab.dataset.tab === name));
    }
    if (name === "result") {
      runner.classList.add("runner--show-result");
    } else {
      runner.classList.remove("runner--show-result");
      activeCode = name as PartKey;
      showEditor(activeCode);
    }
  };

  const addTab = (name: string, label: string): HTMLButtonElement => {
    const tab = document.createElement("button");
    tab.className = "instui-button -toggle -sm";
    tab.type = "button";
    tab.textContent = label;
    tab.dataset.tab = name;
    tab.setAttribute("role", "tab");
    tab.addEventListener("click", () => select(name));
    tablist.appendChild(tab);
    return tab;
  };
  const resultTab = addTab("result", "Result");
  for (const key of parts) addTab(key, labels[key]);

  const splitIcon = splitButton.querySelector(".runner__icon") as HTMLElement | null;
  splitButton.addEventListener("click", () => {
    const split = runner.classList.toggle("runner--split");
    splitButton.setAttribute("aria-pressed", String(split));
    // In split view the two panes show together, so the control now collapses back to a single view:
    // swap in the square glyph and relabel it.
    if (splitIcon) splitIcon.innerHTML = split ? ICON.square : ICON.split;
    const label = split ? "Single view" : "Split";
    splitButton.setAttribute("data-tooltip", label);
    splitButton.setAttribute("aria-label", label);
    // In split view the code and result show together, so the Result tab is a no-op — disable it.
    resultTab.disabled = split;
    if (split && activeCode) select(activeCode);
    else if (!split) select("result");
  });

  resetButton.addEventListener("click", () => {
    for (const key of parts) {
      const view = editors.get(key);
      if (view)
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: original[key] } });
    }
    render();
    updateResetState();
  });

  const themeTrigger = mount.querySelector<HTMLButtonElement>('[data-role="theme-trigger"]');
  const themeMenu = mount.querySelector<HTMLElement>('[data-role="theme-menu"]');
  const themeLabel = mount.querySelector<HTMLElement>('[data-role="theme-label"]');
  if (themeTrigger && themeMenu && themeLabel && themes.length) {
    const closeMenu = (): void => {
      themeMenu.hidden = true;
      themeTrigger.setAttribute("aria-expanded", "false");
    };
    themeLabel.textContent = themes[0].label;
    for (const theme of themes) {
      const item = document.createElement("button");
      item.className = "item";
      item.type = "button";
      item.setAttribute("role", "menuitem");
      item.textContent = theme.label;
      item.addEventListener("click", () => {
        themeCss = theme.css;
        themeLabel.textContent = theme.label;
        closeMenu();
        render();
      });
      themeMenu.appendChild(item);
    }
    themeTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = themeMenu.hidden;
      themeMenu.hidden = !open;
      themeTrigger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
      if (
        !themeMenu.hidden &&
        !(event.target instanceof Node && themeMenu.contains(event.target))
      ) {
        closeMenu();
      }
    });
  }

  showEditor(activeCode);
  select("result");
  render();

  // The host's light/dark toggle (in the demo figure bar) posts here to flip this demo's scheme,
  // overriding the inherited one until the reader toggles back.
  window.addEventListener("message", (event) => {
    if ((event.data as { type?: string } | null)?.type === "pantoken-demo-scheme") {
      schemeOverride = effectiveDark() ? "light" : "dark";
      void applyTheme();
    }
  });

  try {
    if (window.parent && window.parent !== window) {
      new MutationObserver(() => void applyTheme()).observe(
        window.parent.document.documentElement,
        {
          attributes: true,
          attributeFilter: ["class"],
        },
      );
    }
  } catch {
    // Cross-origin — no live theme sync.
  }
}

void main();
