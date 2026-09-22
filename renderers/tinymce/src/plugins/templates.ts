/**
 * A custom `tinymce.PluginManager.add` plugin — modeled on TinyMCE's stock `template` plugin's UX
 * (toolbar button + "Insert template" menu item, dialog listing title), but replaces the whole
 * document (with a confirm) instead of the stock plugin's insert-at-cursor behavior. Templates are
 * supplied by the caller — this package doesn't ship any of its own.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { StarterTemplate } from "../types.js";
import { replaceContent } from "../lib/insertion-target.js";
import { formatTinymceString, TINYMCE_STRINGS } from "../strings.js";

/** Options for {@link createTemplatesPlugin}. */
export interface TemplatesPluginOptions {
  /** The starter templates offered in the "Insert template" picker. */
  templates: readonly StarterTemplate[];
  /** Called after a template is inserted (e.g. to refresh a live preview). */
  onInsert?: (template: StarterTemplate) => void;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const TEMPLATES_PLUGIN_NAME = "pantoken_templates";
/** The toolbar button/menu item name registered by this plugin. */
export const TEMPLATES_TOOLBAR_NAME = "pantokenTemplates";
/** Command that opens the templates picker. */
export const TEMPLATES_COMMAND = "pantokenOpenTemplates";

/** Builds the `tinymce.PluginManager.add` callback for the "Insert template" plugin. */
export function createTemplatesPlugin(options: TemplatesPluginOptions) {
  const { templates, onInsert } = options;
  return function pantokenTemplatesPlugin(editor: Editor) {
    const openDialog = (): void => {
      editor.windowManager.open({
        title: TINYMCE_STRINGS.templatesDialogTitle,
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "template",
              label: TINYMCE_STRINGS.templatesSelectLabel,
              items: templates.map((t) => ({ value: t.title, text: t.title })),
            },
          ],
        },
        initialData: { template: templates[0]?.title ?? "" },
        buttons: [
          { type: "cancel", text: TINYMCE_STRINGS.cancelButton },
          { type: "submit", text: TINYMCE_STRINGS.insertButton, primary: true },
        ],
        onSubmit: (api): void => {
          const { template } = api.getData() as { template: string };
          const chosen = templates.find((t) => t.title === template);
          api.close();
          if (!chosen) return;
          editor.windowManager.confirm(
            formatTinymceString(TINYMCE_STRINGS.templatesConfirmReplace, {
              title: chosen.title,
            }),
            (confirmed: boolean): void => {
              if (!confirmed) return;
              replaceContent(editor, chosen.content);
              onInsert?.(chosen);
            },
          );
        },
      });
    };

    if (options.registerUi === false) {
      editor.addCommand(TEMPLATES_COMMAND, openDialog);
      return {};
    }

    editor.ui.registry.addButton(TEMPLATES_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.templatesToolbarText,
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(TEMPLATES_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.templatesMenuText,
      onAction: openDialog,
    });

    return {};
  };
}
