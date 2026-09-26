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
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/></svg>';

/** Build a single toolbar menu button toggling superscript or subscript. */
export function createSupSubPlugin() {
  return function pantokenSupSubPlugin(editor: Editor) {
    const superscript = editor.translate?.("Superscript") || "Superscript";
    const subscript = editor.translate?.("Subscript") || "Subscript";
    editor.ui.registry.addIcon(SUP_SUB_TOOLBAR_NAME, SUP_SUB_ICON);
    editor.ui.registry.addMenuButton(SUP_SUB_TOOLBAR_NAME, {
      icon: SUP_SUB_TOOLBAR_NAME,
      tooltip: `${superscript} / ${subscript}`,
      fetch: (success): void => {
        const items: Ui.Menu.NestedMenuItemContents[] = [
          {
            type: "togglemenuitem",
            text: superscript,
            active: editor.queryCommandState("Superscript"),
            onAction: () => editor.execCommand("Superscript"),
          },
          {
            type: "togglemenuitem",
            text: subscript,
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
