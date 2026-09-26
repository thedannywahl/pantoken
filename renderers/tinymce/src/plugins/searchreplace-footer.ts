/**
 * A footer/statusbar button for TinyMCE's native search & replace plugin, since the plugin only
 * ships a toolbar button with no statusbar/footer variant of its own.
 */
import type { Editor } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const SEARCHREPLACE_FOOTER_PLUGIN_NAME = "pantoken_searchreplace_footer";
/** The footer/statusbar control name registered by this plugin. */
export const SEARCHREPLACE_FOOTER_STATUSBAR_NAME = "pantokenSearchReplaceStatus";

const SEARCHREPLACE_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';

/** Build a footer-only button that opens TinyMCE's search & replace dialog. */
export function createSearchReplaceFooterPlugin() {
  return function pantokenSearchReplaceFooterPlugin(editor: Editor) {
    let button: HTMLButtonElement | undefined;

    const attachFooter = (): void => {
      if (button) return;
      const footer = editor
        .getContainer()
        .querySelector<HTMLElement>(".tox-statusbar__text-container");
      if (!footer) return;

      button = document.createElement("button");
      button.id = SEARCHREPLACE_FOOTER_STATUSBAR_NAME;
      button.type = "button";
      button.className = "tox-statusbar__wordcount";
      button.title = editor.translate?.("Find and Replace") || "Find and replace";
      button.innerHTML = SEARCHREPLACE_ICON_SVG;
      button.addEventListener("click", () => editor.execCommand("SearchReplace"));
      footer.append(button);
    };
    const detachFooter = (): void => {
      editor.off("PostRender", attachFooter);
      button?.remove();
      button = undefined;
    };

    editor.on("PostRender", attachFooter);
    editor.on("remove", detachFooter);

    return {};
  };
}
