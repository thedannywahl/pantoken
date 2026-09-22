/**
 * Toggles between TinyMCE's WYSIWYG view and a syntax-highlighted CodeMirror source view, so
 * authors can hand-edit raw HTML with a live preview updating as they type — unlike TinyMCE's
 * stock `code` plugin, which edits in a one-shot modal dialog with no live preview, no dark-mode
 * theming, and no pretty-print. Extra CodeMirror extensions (e.g. a pantoken-aware linter or
 * autocompletion) can be layered in via `options.extensions`.
 *
 * \@module
 */
import { basicSetup, EditorView } from "codemirror";
import { html } from "@codemirror/lang-html";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Compartment } from "@codemirror/state";
import type { Extension } from "@codemirror/state";
import { tags } from "@lezer/highlight";
import * as prettier from "prettier/standalone";
import * as prettierHtml from "prettier/plugins/html";
import type { Editor } from "tinymce";
import { CODEMIRROR_STRINGS } from "./strings.js";

/** The attribute pantoken's TinyMCE skins already use to scope dark-mode CSS. */
const SCHEME_ATTRIBUTE = "data-pantoken-scheme";

const FORMAT_ICON_NAME = "pantoken-source-format";
const FORMAT_ICON_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3 5 12l4 9M15 3l4 9-4 9"/></svg>';

const lightTheme = EditorView.theme({
  "&": { backgroundColor: "#ffffff", color: "#1e1e1e" },
  ".cm-gutters": { backgroundColor: "#f5f5f5", color: "#888888", border: "none" },
  ".cm-activeLine": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
  ".cm-activeLineGutter": { backgroundColor: "rgba(0, 0, 0, 0.06)" },
});

const darkTheme = EditorView.theme(
  {
    "&": { backgroundColor: "#1e1e1e", color: "#d4d4d4" },
    ".cm-gutters": { backgroundColor: "#252525", color: "#7a7a7a", border: "none" },
    ".cm-activeLine": { backgroundColor: "rgba(255, 255, 255, 0.06)" },
    ".cm-activeLineGutter": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
    ".cm-cursor": { borderLeftColor: "#d4d4d4" },
    ".cm-selectionBackground": { backgroundColor: "rgba(255, 255, 255, 0.15) !important" },
  },
  { dark: true },
);

const lightHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.tagName, color: "#800000" },
    { tag: tags.attributeName, color: "#ff0000" },
    { tag: tags.attributeValue, color: "#0000ff" },
    { tag: tags.string, color: "#0000ff" },
    { tag: tags.comment, color: "#008000" },
    { tag: tags.bracket, color: "#000080" },
  ]),
);

const darkHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.tagName, color: "#569cd6" },
    { tag: tags.attributeName, color: "#9cdcfe" },
    { tag: tags.attributeValue, color: "#ce9178" },
    { tag: tags.string, color: "#ce9178" },
    { tag: tags.comment, color: "#6a9955" },
    { tag: tags.bracket, color: "#d4d4d4" },
  ]),
);

const CONTAINER_BACKGROUND = { light: "#ffffff", dark: "#1e1e1e" };
const CONTAINER_BORDER = { light: "#cccccc", dark: "#444444" };

function currentScheme(): "light" | "dark" {
  return document.documentElement.getAttribute(SCHEME_ATTRIBUTE) === "dark" ? "dark" : "light";
}

/** Options for {@link createSourceTogglePlugin}. */
export interface SourceTogglePluginOptions {
  /** Pixel height of the source view outside fullscreen, matching the WYSIWYG editor's height. */
  height: number;
  /** Extra CodeMirror extensions (lint, autocomplete, etc.) layered onto the base HTML setup. */
  extensions?: Extension[];
  /** Called on every doc change while in source mode (e.g. to refresh a live preview). */
  onChange?: (doc: string) => void;
  /** Called right after toggling, with the new mode, e.g. to refresh a preview/downloads. */
  onToggle?: (sourceMode: boolean) => void;
  /** Where the toggle control is registered. Defaults to `"toolbar"`. */
  display?: "toolbar" | "footer" | "both";
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const SOURCE_TOGGLE_PLUGIN_NAME = "pantoken_source_toggle";
/** The toolbar toggle-button name registered by this plugin. */
export const SOURCE_TOGGLE_TOOLBAR_NAME = "sourcecode";
/** The toolbar button name for the pretty-print action, enabled only in source mode. */
export const SOURCE_FORMAT_TOOLBAR_NAME = "pantokenSourceFormat";
/** The footer/statusbar control name registered when `display` includes `"footer"`. */
export const SOURCE_TOGGLE_STATUSBAR_NAME = "pantokenSourceToggleStatus";

/** A source-toggle plugin instance's public surface, returned by `editor.plugins[name]`. */
export interface SourceTogglePluginApi {
  /** Whether the source view is currently showing (vs. the WYSIWYG editor). */
  isSourceMode(): boolean;
  /** The CodeMirror doc's current text, regardless of which view is active. */
  getContent(): string;
  /** Inserts HTML at the current cursor/selection in the CodeMirror doc. */
  insertAtCursor(content: string): void;
  /** Replaces the entire CodeMirror doc. */
  replaceAll(content: string): void;
  /** Pretty-prints the current CodeMirror doc in place via `prettier`'s HTML parser. */
  format(): Promise<void>;
}

/** Builds the `tinymce.PluginManager.add` callback for the source-view toggle plugin. */
export function createSourceTogglePlugin(
  options: SourceTogglePluginOptions,
): (editor: Editor) => SourceTogglePluginApi {
  const { height, extensions = [], onChange, onToggle } = options;
  return function pantokenSourceTogglePlugin(editor: Editor): SourceTogglePluginApi {
    let sourceView: EditorView | undefined;
    let sourceContainer: HTMLDivElement | undefined;
    let sourceMode = false;
    let isFullscreen = false;
    const themeCompartment = new Compartment();
    let schemeObserver: MutationObserver | undefined;
    const sourceModeListeners = new Set<(active: boolean) => void>();

    const applyContainerChrome = (): void => {
      if (!sourceContainer) return;
      const scheme = currentScheme();
      sourceContainer.style.backgroundColor = CONTAINER_BACKGROUND[scheme];
      sourceContainer.style.borderColor = CONTAINER_BORDER[scheme];
      sourceContainer.style.height = isFullscreen ? "100%" : `${height}px`;
    };

    const applyTheme = (): void => {
      if (!sourceView) return;
      sourceView.dispatch({
        effects: themeCompartment.reconfigure(
          currentScheme() === "dark"
            ? [darkTheme, darkHighlighting]
            : [lightTheme, lightHighlighting],
        ),
      });
      applyContainerChrome();
    };

    const ensureSourceView = (): EditorView => {
      if (sourceView) return sourceView;
      const container = document.createElement("div");
      container.style.cssText =
        "display: none; width: 100%; box-sizing: border-box; overflow: auto; border: 1px solid; font-size: 13px;";
      editor.contentAreaContainer.insertAdjacentElement("afterend", container);
      sourceContainer = container;
      sourceView = new EditorView({
        extensions: [
          basicSetup,
          html(),
          EditorView.lineWrapping,
          themeCompartment.of(
            currentScheme() === "dark"
              ? [darkTheme, darkHighlighting]
              : [lightTheme, lightHighlighting],
          ),
          EditorView.updateListener.of((update): void => {
            if (update.docChanged) onChange?.(update.state.doc.toString());
          }),
          ...extensions,
        ],
        parent: container,
      });
      applyContainerChrome();
      schemeObserver = new MutationObserver(applyTheme);
      schemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [SCHEME_ATTRIBUTE],
      });
      return sourceView;
    };

    const replaceDoc = (content: string): void => {
      const view = ensureSourceView();
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: content } });
    };

    const insertAtCursor = (content: string): void => {
      const view = ensureSourceView();
      const { from, to } = view.state.selection.main;
      view.dispatch({
        changes: { from, to, insert: content },
        selection: { anchor: from + content.length },
      });
    };

    const format = async (): Promise<void> => {
      if (!sourceView) return;
      const formatted = await prettier.format(sourceView.state.doc.toString(), {
        parser: "html",
        plugins: [prettierHtml],
      });
      replaceDoc(formatted);
    };

    const toggle = (onActiveChange?: (active: boolean) => void): void => {
      sourceMode = !sourceMode;
      onActiveChange?.(sourceMode);
      const view = ensureSourceView();
      const contentArea = editor.contentAreaContainer;
      if (sourceMode) {
        replaceDoc(editor.getContent());
        contentArea.style.display = "none";
        sourceContainer!.style.display = "block";
        view.focus();
      } else {
        contentArea.style.display = "";
        sourceContainer!.style.display = "none";
        editor.setContent(view.state.doc.toString());
      }
      for (const listener of sourceModeListeners) listener(sourceMode);
      onToggle?.(sourceMode);
    };

    const display = options.display ?? "toolbar";
    const hasToolbar = display === "toolbar" || display === "both";
    const hasFooter = display === "footer" || display === "both";

    editor.ui.registry.addIcon(FORMAT_ICON_NAME, FORMAT_ICON_SVG);

    if (hasToolbar) {
      editor.ui.registry.addToggleButton(SOURCE_TOGGLE_TOOLBAR_NAME, {
        icon: "sourcecode",
        tooltip: CODEMIRROR_STRINGS.sourceToggleTooltip,
        onAction: (api) => toggle(api.setActive),
      });

      editor.ui.registry.addButton(SOURCE_FORMAT_TOOLBAR_NAME, {
        icon: FORMAT_ICON_NAME,
        tooltip: CODEMIRROR_STRINGS.sourceFormatTooltip,
        onAction: () => void format(),
        onSetup: (api): (() => void) => {
          api.setEnabled(sourceMode);
          const listener = (active: boolean): void => api.setEnabled(active);
          sourceModeListeners.add(listener);
          return () => sourceModeListeners.delete(listener);
        },
      });
    }

    if (hasFooter) {
      let footerButton: HTMLButtonElement | undefined;
      const attachFooter = (): void => {
        if (footerButton) return;
        const footer = editor
          .getContainer()
          .querySelector<HTMLElement>(".tox-statusbar__text-container");
        if (!footer) return;

        footerButton = document.createElement("button");
        footerButton.id = SOURCE_TOGGLE_STATUSBAR_NAME;
        footerButton.type = "button";
        footerButton.className = "tox-statusbar__wordcount";
        footerButton.title = CODEMIRROR_STRINGS.sourceToggleTooltip;
        footerButton.setAttribute("aria-pressed", String(sourceMode));
        footerButton.textContent = "</>";
        footerButton.addEventListener("click", () =>
          toggle((active) => footerButton!.setAttribute("aria-pressed", String(active))),
        );
        footer.append(footerButton);
      };
      const detachFooter = (): void => {
        editor.off("PostRender", attachFooter);
        footerButton?.remove();
        footerButton = undefined;
      };
      editor.on("PostRender", attachFooter);
      editor.on("remove", detachFooter);
    }

    editor.on("FullscreenStateChanged", (event) => {
      isFullscreen = Boolean((event as { state?: boolean }).state);
      applyContainerChrome();
    });

    editor.on("remove", () => {
      schemeObserver?.disconnect();
      sourceView?.destroy();
    });

    return {
      isSourceMode: () => sourceMode,
      getContent: () => (sourceMode && sourceView ? sourceView.state.doc.toString() : ""),
      insertAtCursor,
      replaceAll: replaceDoc,
      format,
    };
  };
}
