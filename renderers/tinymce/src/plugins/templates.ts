/**
 * A custom `tinymce.PluginManager.add` plugin — modeled on TinyMCE's stock `template` plugin's UX
 * (toolbar button + "Insert template" menu item, dialog listing title), but replaces the whole
 * document (with a confirm) instead of the stock plugin's insert-at-cursor behavior. Templates are
 * supplied by the caller — this package doesn't ship any of its own.
 *
 * @module
 */
import type { Editor } from "tinymce";
import type { StarterTemplate } from "../types.js";

/** Options for {@link createTemplatesPlugin}. */
export interface TemplatesPluginOptions {
  /** The starter templates offered in the "Insert template" picker. */
  templates: readonly StarterTemplate[];
  /** Called after a template is inserted (e.g. to refresh a live preview). */
  onInsert?: (template: StarterTemplate) => void;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const TEMPLATES_PLUGIN_NAME = "pantoken_templates";
/** The toolbar button/menu item name registered by this plugin. */
export const TEMPLATES_TOOLBAR_NAME = "pantokenTemplates";

/** Builds the `tinymce.PluginManager.add` callback for the "Insert template" plugin. */
export function createTemplatesPlugin(options: TemplatesPluginOptions) {
  const { templates, onInsert } = options;
  return function pantokenTemplatesPlugin(editor: Editor) {
    const openDialog = (): void => {
      editor.windowManager.open({
        title: "Insert template",
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "template",
              label: "Starter template",
              items: templates.map((t) => ({ value: t.title, text: t.title })),
            },
          ],
        },
        initialData: { template: templates[0]?.title ?? "" },
        buttons: [
          { type: "cancel", text: "Cancel" },
          { type: "submit", text: "Insert", primary: true },
        ],
        onSubmit: (api): void => {
          const { template } = api.getData() as { template: string };
          const chosen = templates.find((t) => t.title === template);
          api.close();
          if (!chosen) return;
          editor.windowManager.confirm(
            `Replace the current content with the "${chosen.title}" template?`,
            (confirmed: boolean): void => {
              if (!confirmed) return;
              editor.setContent(chosen.content);
              onInsert?.(chosen);
            },
          );
        },
      });
    };

    editor.ui.registry.addButton(TEMPLATES_TOOLBAR_NAME, {
      text: "Insert template",
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(TEMPLATES_TOOLBAR_NAME, {
      text: "Insert template…",
      onAction: openDialog,
    });

    return {};
  };
}
