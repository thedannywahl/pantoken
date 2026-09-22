/**
 * A footer/statusbar button for TinyMCE's native visual blocks plugin, since the plugin only
 * ships a toolbar toggle button with no statusbar/footer variant of its own.
 */
import type { Editor } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const VISUALBLOCKS_FOOTER_PLUGIN_NAME = "pantoken_visualblocks_footer";
/** The footer/statusbar control name registered by this plugin. */
export const VISUALBLOCKS_FOOTER_STATUSBAR_NAME = "pantokenVisualBlocksStatus";
const VISUALBLOCKS_STYLE_ID = "pantokenVisualBlocksStyle";
const VISUALBLOCKS_FOOTER_STYLE_ID = "pantokenVisualBlocksFooterStyle";
const VISUALBLOCKS_FOOTER_ACTIVE_CLASS = "pantoken-visualblocks-status--active";

const VISUALBLOCKS_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

// TinyMCE's native plugin only toggles the `mce-visualblocks` class — the dashed outlines
// themselves live in the default Oxide skin's content.css, which custom skins don't ship.
// Uses pantoken/InstUI's `withVisualDebug` outline colour and an `outline` (not `border`) so the
// debug affordance never shifts layout — pixel-accurate with or without it toggled on.
const VISUALBLOCKS_OUTLINE_CSS = `
.mce-visualblocks p, .mce-visualblocks h1, .mce-visualblocks h2, .mce-visualblocks h3,
.mce-visualblocks h4, .mce-visualblocks h5, .mce-visualblocks h6,
.mce-visualblocks div:not([data-mce-bogus]), .mce-visualblocks section,
.mce-visualblocks article, .mce-visualblocks blockquote, .mce-visualblocks address,
.mce-visualblocks pre, .mce-visualblocks figure, .mce-visualblocks figcaption,
.mce-visualblocks hgroup, .mce-visualblocks aside, .mce-visualblocks ul, .mce-visualblocks ol,
.mce-visualblocks dl, .mce-visualblocks li, .mce-visualblocks table {
  outline: 0.0625rem dashed var(--pantoken-visual-debug-color, #f42272);
}
`;

const VISUALBLOCKS_FOOTER_CSS = `
#${VISUALBLOCKS_FOOTER_STATUSBAR_NAME} {
  align-items: center;
  border-radius: 0.1875rem;
  display: inline-flex;
  min-height: 1.5rem;
  padding: 0 0.25rem;
}

#${VISUALBLOCKS_FOOTER_STATUSBAR_NAME}.${VISUALBLOCKS_FOOTER_ACTIVE_CLASS} {
  background: var(--pantoken-visual-debug-color, #f42272);
  color: #fff;
}
`;

/** Build a footer-only button that toggles TinyMCE's visual blocks outlines. */
export function createVisualBlocksFooterPlugin() {
  return function pantokenVisualBlocksFooterPlugin(editor: Editor) {
    let button: HTMLButtonElement | undefined;

    const injectOutlineStyle = (): void => {
      const doc = editor.getDoc();
      if (doc.getElementById(VISUALBLOCKS_STYLE_ID)) return;
      const style = doc.createElement("style");
      style.id = VISUALBLOCKS_STYLE_ID;
      style.textContent = VISUALBLOCKS_OUTLINE_CSS;
      doc.head.append(style);
    };

    const injectFooterStyle = (): void => {
      const doc = editor.getContainer().ownerDocument;
      if (doc.getElementById(VISUALBLOCKS_FOOTER_STYLE_ID)) return;
      const style = doc.createElement("style");
      style.id = VISUALBLOCKS_FOOTER_STYLE_ID;
      style.textContent = VISUALBLOCKS_FOOTER_CSS;
      doc.head.append(style);
    };

    const setButtonState = (state: boolean): void => {
      button?.setAttribute("aria-pressed", String(state));
      button?.classList.toggle(VISUALBLOCKS_FOOTER_ACTIVE_CLASS, state);
      if (button) button.title = state ? "Hide blocks" : "Show blocks";
    };

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
      injectFooterStyle();
      button.addEventListener("click", () => editor.execCommand("mceVisualBlocks"));
      footer.append(button);
    };
    const detachFooter = (): void => {
      editor.off("PostRender", attachFooter);
      button?.remove();
      button = undefined;
    };

    editor.on("PostRender", attachFooter);
    editor.on("init", injectOutlineStyle);
    editor.on("VisualBlocks", (event) => {
      setButtonState(Boolean((event as { state?: boolean }).state));
    });
    editor.on("remove", detachFooter);

    return {};
  };
}
