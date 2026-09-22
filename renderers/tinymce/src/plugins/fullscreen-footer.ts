/**
 * A footer/statusbar button for TinyMCE's native fullscreen plugin, since the plugin only ships
 * a toolbar toggle button with no statusbar/footer variant of its own.
 */
import type { Editor } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const FULLSCREEN_FOOTER_PLUGIN_NAME = "pantoken_fullscreen_footer";
/** The footer/statusbar control name registered by this plugin. */
export const FULLSCREEN_FOOTER_STATUSBAR_NAME = "pantokenFullscreenStatus";

const FULLSCREEN_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';

/** Build a footer-only button that toggles TinyMCE's fullscreen mode. */
export function createFullscreenFooterPlugin() {
  return function pantokenFullscreenFooterPlugin(editor: Editor) {
    let button: HTMLButtonElement | undefined;

    const attachFooter = (): void => {
      if (button) return;
      const footer = editor
        .getContainer()
        .querySelector<HTMLElement>(".tox-statusbar__text-container");
      if (!footer) return;

      button = document.createElement("button");
      button.id = FULLSCREEN_FOOTER_STATUSBAR_NAME;
      button.type = "button";
      button.className = "tox-statusbar__wordcount";
      button.title = "Fullscreen";
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = FULLSCREEN_ICON_SVG;
      button.addEventListener("click", () => editor.execCommand("mceFullScreen"));
      footer.append(button);
    };
    const detachFooter = (): void => {
      editor.off("PostRender", attachFooter);
      button?.remove();
      button = undefined;
    };

    editor.on("PostRender", attachFooter);
    editor.on("FullscreenStateChanged", (event) => {
      button?.setAttribute("aria-pressed", String(Boolean((event as { state?: boolean }).state)));
    });
    editor.on("remove", detachFooter);

    return {};
  };
}
