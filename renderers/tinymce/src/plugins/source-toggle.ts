/**
 * Toggles between TinyMCE's WYSIWYG view and a syntax-highlighted CodeMirror source view, so
 * authors can hand-edit raw HTML with a live preview updating as they type — unlike TinyMCE's
 * stock `code` plugin, which edits in a one-shot modal dialog with no live preview. Extra
 * CodeMirror extensions (e.g. {@link pantokenHtmlLinter}, {@link pantokenHtmlCompletion}) can be
 * layered in via `options.extensions`.
 *
 * @module
 */
import { basicSetup, EditorView } from "codemirror";
import { html } from "@codemirror/lang-html";
import type { Extension } from "@codemirror/state";
import type { Editor, Ui } from "tinymce";

/** Options for {@link createSourceTogglePlugin}. */
export interface SourceTogglePluginOptions {
  /** Pixel height of the source view, matching the WYSIWYG editor's own configured height. */
  height: number;
  /** Extra CodeMirror extensions (lint, autocomplete, etc.) layered onto the base HTML setup. */
  extensions?: Extension[];
  /** Called on every doc change while in source mode (e.g. to refresh a live preview). */
  onChange?: (doc: string) => void;
  /** Called right after toggling, with the new mode, e.g. to refresh a preview/downloads. */
  onToggle?: (sourceMode: boolean) => void;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const SOURCE_TOGGLE_PLUGIN_NAME = "pantoken_source_toggle";
/** The toolbar toggle-button name registered by this plugin. */
export const SOURCE_TOGGLE_TOOLBAR_NAME = "sourcecode";

/** A source-toggle plugin instance's public surface, returned by `editor.plugins[name]`. */
export interface SourceTogglePluginApi {
  /** Whether the source view is currently showing (vs. the WYSIWYG editor). */
  isSourceMode(): boolean;
  /** The CodeMirror doc's current text, regardless of which view is active. */
  getContent(): string;
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

    const ensureSourceView = (): EditorView => {
      if (sourceView) return sourceView;
      const container = document.createElement("div");
      container.style.cssText = `display: none; width: 100%; height: ${height}px; box-sizing: border-box; overflow: auto; border: 1px solid #ccc; font-size: 13px;`;
      editor.contentAreaContainer.insertAdjacentElement("afterend", container);
      sourceContainer = container;
      sourceView = new EditorView({
        extensions: [
          basicSetup,
          html(),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update): void => {
            if (update.docChanged) onChange?.(update.state.doc.toString());
          }),
          ...extensions,
        ],
        parent: container,
      });
      return sourceView;
    };

    const replaceDoc = (content: string): void => {
      const view = ensureSourceView();
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: content } });
    };

    const toggle = (api: Ui.Toolbar.ToolbarToggleButtonInstanceApi): void => {
      sourceMode = !sourceMode;
      api.setActive(sourceMode);
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
      onToggle?.(sourceMode);
    };

    editor.ui.registry.addToggleButton(SOURCE_TOGGLE_TOOLBAR_NAME, {
      icon: "sourcecode",
      tooltip: "Source code",
      onAction: toggle,
    });

    editor.on("remove", () => sourceView?.destroy());

    return {
      isSourceMode: () => sourceMode,
      getContent: () => (sourceMode && sourceView ? sourceView.state.doc.toString() : ""),
    };
  };
}
