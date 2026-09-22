/**
 * A single toolbar dropdown combining TinyMCE's native superscript and subscript toggles, since
 * TinyMCE has no built-in combined control for the two.
 */
import type { Editor, Ui } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const SUP_SUB_PLUGIN_NAME = "pantoken_sup_sub";
/** Toolbar menu-button name to pass in TinyMCE's `toolbar` init option. */
export const SUP_SUB_TOOLBAR_NAME = "pantokenSupSub";

const SUP_SUB_ICON =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 12h8M12 19V5"/><path d="M21 8h-3.5a1.5 1.5 0 1 1 1.5 2.6L17.5 12H21M21 15.5h-3.5a1.5 1.5 0 1 0 1.5-2.6"/></svg>';

/** Build a single toolbar menu button toggling superscript or subscript. */
export function createSupSubPlugin() {
  return function pantokenSupSubPlugin(editor: Editor) {
    editor.ui.registry.addIcon(SUP_SUB_TOOLBAR_NAME, SUP_SUB_ICON);
    editor.ui.registry.addMenuButton(SUP_SUB_TOOLBAR_NAME, {
      icon: SUP_SUB_TOOLBAR_NAME,
      tooltip: "Superscript / subscript",
      fetch: (success): void => {
        const items: Ui.Menu.NestedMenuItemContents[] = [
          {
            type: "togglemenuitem",
            text: "Superscript",
            active: editor.queryCommandState("Superscript"),
            onAction: () => editor.execCommand("Superscript"),
          },
          {
            type: "togglemenuitem",
            text: "Subscript",
            active: editor.queryCommandState("Subscript"),
            onAction: () => editor.execCommand("Subscript"),
          },
        ];
        success(items);
      },
    });

    return {};
  };
}
