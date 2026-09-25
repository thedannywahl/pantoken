/**
 * Routes HTML insertion to whichever surface is active: the WYSIWYG editor, or — when
 * \@pantoken/tinymce-codemirror's source-view toggle is installed and active — its CodeMirror doc.
 * Without this, insert-toolbar actions (components, layouts, logos, templates, icons) silently
 * target the hidden WYSIWYG document while an author is looking at the HTML source view.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import {
  SOURCE_TOGGLE_PLUGIN_NAME,
  type SourceTogglePluginApi,
} from "@pantoken/tinymce-codemirror";

function getSourceTogglePlugin(editor: Editor): SourceTogglePluginApi | undefined {
  return (editor.plugins as Record<string, unknown> | undefined)?.[SOURCE_TOGGLE_PLUGIN_NAME] as
    | SourceTogglePluginApi
    | undefined;
}

/** Inserts HTML at the cursor: into the CodeMirror doc in source mode, else the WYSIWYG editor. */
export function insertHtml(editor: Editor, html: string): void {
  const sourceToggle = getSourceTogglePlugin(editor);
  if (sourceToggle?.isSourceMode()) {
    sourceToggle.insertAtCursor(html);
    return;
  }
  editor.insertContent(html);
}

/** Replaces the whole document: the CodeMirror doc in source mode, else the WYSIWYG editor. */
export function replaceContent(editor: Editor, html: string): void {
  const sourceToggle = getSourceTogglePlugin(editor);
  if (sourceToggle?.isSourceMode()) {
    sourceToggle.replaceAll(html);
    return;
  }
  editor.setContent(html);
}
