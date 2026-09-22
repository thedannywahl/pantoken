/**
 * A footer/statusbar button for TinyMCE's native visual blocks plugin, since the plugin only
 * ships a toolbar toggle button with no statusbar/footer variant of its own.
 */
import type { Editor } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const VISUALBLOCKS_FOOTER_PLUGIN_NAME = "pantoken_visualblocks_footer";
/** The footer/statusbar control name registered by this plugin. */
export const VISUALBLOCKS_FOOTER_STATUSBAR_NAME = "pantokenVisualBlocksStatus";

const VISUALBLOCKS_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

/** Build a footer-only button that toggles TinyMCE's visual blocks outlines. */
export function createVisualBlocksFooterPlugin() {
  return function pantokenVisualBlocksFooterPlugin(editor: Editor) {
    let button: HTMLButtonElement | undefined;

    const attachFooter = (): void => {
      if (button) return;
      const footer = editor
        .getContainer()
        .querySelector<HTMLElement>(".tox-statusbar__text-container");
      if (!footer) return;

      button = document.createElement("button");
      button.id = VISUALBLOCKS_FOOTER_STATUSBAR_NAME;
      button.type = "button";
      button.className = "tox-statusbar__wordcount";
      button.title = "Show blocks";
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = VISUALBLOCKS_ICON_SVG;
      button.addEventListener("click", () => editor.execCommand("mceVisualBlocks"));
      footer.append(button);
    };
    const detachFooter = (): void => {
      editor.off("PostRender", attachFooter);
      button?.remove();
      button = undefined;
    };

    editor.on("PostRender", attachFooter);
    editor.on("VisualBlocks", (event) => {
      button?.setAttribute("aria-pressed", String(Boolean((event as { state?: boolean }).state)));
    });
    editor.on("remove", detachFooter);

    return {};
  };
}
