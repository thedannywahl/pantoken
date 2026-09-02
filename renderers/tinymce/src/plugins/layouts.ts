/**
 * TinyMCE "Layouts" plugin — like the Components/Icons/Logos pickers, but for whole starter page
 * layouts. Defaults to pantoken's own bundled {@link pageLayouts} (hero, callout, testimonial,
 * two-column, rubric note); pass `layouts` to override or extend the list.
 *
 * @module
 */
import type { Editor } from "tinymce";
import { pageLayouts, type PageLayout } from "../layouts.js";

/** Options for {@link createLayoutsPlugin}. */
export interface LayoutsPluginOptions {
  /** The page layouts offered in the "Insert layout" picker. Defaults to {@link pageLayouts}. */
  layouts?: readonly PageLayout[];
  /** Called after a layout is inserted (e.g. to refresh a live preview). */
  onInsert?: (layout: PageLayout) => void;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const LAYOUTS_PLUGIN_NAME = "pantoken_layouts";
/** The toolbar button/menu item name registered by this plugin. */
export const LAYOUTS_TOOLBAR_NAME = "pantokenLayouts";

/** Builds the `tinymce.PluginManager.add` callback for the "Insert layout" plugin. */
export function createLayoutsPlugin(options: LayoutsPluginOptions = {}) {
  const { layouts = pageLayouts, onInsert } = options;
  return function pantokenLayoutsPlugin(editor: Editor) {
    const openDialog = (): void => {
      editor.windowManager.open({
        title: "Insert layout",
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "layout",
              label: "Starter layout",
              items: layouts.map((l) => ({ value: l.name, text: l.title })),
            },
          ],
        },
        initialData: { layout: layouts[0]?.name ?? "" },
        buttons: [
          { type: "cancel", text: "Cancel" },
          { type: "submit", text: "Insert", primary: true },
        ],
        onSubmit: (api): void => {
          const { layout } = api.getData() as { layout: string };
          const chosen = layouts.find((l) => l.name === layout);
          api.close();
          if (!chosen) return;
          editor.windowManager.confirm(
            `Replace the current content with the "${chosen.title}" layout?`,
            (confirmed: boolean): void => {
              if (!confirmed) return;
              editor.setContent(chosen.html);
              onInsert?.(chosen);
            },
          );
        },
      });
    };

    editor.ui.registry.addButton(LAYOUTS_TOOLBAR_NAME, {
      text: "Layouts",
      tooltip: "Insert a starter layout",
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(LAYOUTS_TOOLBAR_NAME, {
      text: "Layout…",
      onAction: openDialog,
    });

    return {};
  };
}
