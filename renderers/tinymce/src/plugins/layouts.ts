/**
 * TinyMCE "Layouts" plugin — like the Components/Icons/Logos pickers, but for whole starter page
 * layouts. Defaults to pantoken's own bundled {@link pageLayouts} (hero, callout, testimonial,
 * two-column, rubric note); pass `layouts` to override or extend the list.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import { pageLayouts, type PageLayout } from "../layouts.js";
import { replaceContent } from "../lib/insertion-target.js";
import { formatTinymceString, TINYMCE_STRINGS } from "../strings.js";

/** Options for {@link createLayoutsPlugin}. */
export interface LayoutsPluginOptions {
  /** The page layouts offered in the "Insert layout" picker. Defaults to {@link pageLayouts}. */
  layouts?: readonly PageLayout[];
  /** Called after a layout is inserted (e.g. to refresh a live preview). */
  onInsert?: (layout: PageLayout) => void;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const LAYOUTS_PLUGIN_NAME = "pantoken_layouts";
/** The toolbar button/menu item name registered by this plugin. */
export const LAYOUTS_TOOLBAR_NAME = "pantokenLayouts";
/** Command that opens the layouts picker. */
export const LAYOUTS_COMMAND = "pantokenOpenLayouts";

/** Builds the `tinymce.PluginManager.add` callback for the "Insert layout" plugin. */
export function createLayoutsPlugin(options: LayoutsPluginOptions = {}) {
  const { layouts = pageLayouts, onInsert } = options;
  return function pantokenLayoutsPlugin(editor: Editor) {
    const openDialog = (): void => {
      editor.windowManager.open({
        title: TINYMCE_STRINGS.layoutsDialogTitle,
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "layout",
              label: TINYMCE_STRINGS.layoutsSelectLabel,
              items: layouts.map((l) => ({ value: l.name, text: l.title })),
            },
          ],
        },
        initialData: { layout: layouts[0]?.name ?? "" },
        buttons: [
          { type: "cancel", text: TINYMCE_STRINGS.cancelButton },
          { type: "submit", text: TINYMCE_STRINGS.insertButton, primary: true },
        ],
        onSubmit: (api): void => {
          const { layout } = api.getData() as { layout: string };
          const chosen = layouts.find((l) => l.name === layout);
          api.close();
          if (!chosen) return;
          editor.windowManager.confirm(
            formatTinymceString(TINYMCE_STRINGS.layoutsConfirmReplace, { title: chosen.title }),
            (confirmed: boolean): void => {
              if (!confirmed) return;
              replaceContent(editor, chosen.html);
              onInsert?.(chosen);
            },
          );
        },
      });
    };

    if (options.registerUi === false) {
      editor.addCommand(LAYOUTS_COMMAND, openDialog);
      return {};
    }

    editor.ui.registry.addButton(LAYOUTS_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.layoutsToolbarText,
      tooltip: TINYMCE_STRINGS.layoutsToolbarTooltip,
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(LAYOUTS_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.layoutsMenuText,
      onAction: openDialog,
    });

    return {};
  };
}
