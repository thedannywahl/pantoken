/**
 * A context toolbar for inserted icon glyphs (`.instui-icon` spans): pick a color, pick a size, or
 * delete the icon. Paired with `buildIconMarkup`'s `contenteditable="false"`, which is what makes
 * TinyMCE treat the glyph as a selectable object in the first place.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import { getEditorStrings } from "../strings.js";

const ICON_CONTEXT_TOOLBAR_NAME = "pantokenIconContext";
const ICON_COLOR_BUTTON_NAME = "pantokenIconColor";
const ICON_SIZE_MENU_NAME = "pantokenIconSize";
const ICON_DELETE_BUTTON_NAME = "pantokenIconDelete";

/** Whether `node` is an inserted icon glyph span (see `buildIconMarkup`). */
export function isIconElement(node: Element): boolean {
  return node.nodeName === "SPAN" && node.classList.contains("instui-icon");
}

/** `rgb(r, g, b[, a])` to `#rrggbb` — `<input type="color">` only accepts hex. */
function toHexColor(cssColor: string): string | undefined {
  const match = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/u.exec(cssColor);
  if (!match) return /^#[0-9a-f]{6}$/iu.test(cssColor) ? cssColor : undefined;
  const [, r, g, b] = match;
  return `#${[r, g, b].map((channel) => Number(channel).toString(16).padStart(2, "0")).join("")}`;
}

/** Registers the color/size/delete context toolbar shown when an inserted icon glyph is selected. */
export function registerIconContextToolbar(editor: Editor): void {
  const strings = getEditorStrings(editor);
  const iconSizes = [
    { label: strings.iconContextSizeSmall, fontSize: "0.75em" },
    { label: strings.iconContextSizeMedium, fontSize: undefined },
    { label: strings.iconContextSizeLarge, fontSize: "1.5em" },
    { label: strings.iconContextSizeExtraLarge, fontSize: "2em" },
  ];
  editor.ui.registry.addButton(ICON_COLOR_BUTTON_NAME, {
    icon: "color-picker",
    tooltip: strings.iconContextColorTooltip,
    onAction: () => {
      const node = editor.selection.getNode();
      if (!isIconElement(node)) return;
      const doc = node.ownerDocument;
      const input = doc.createElement("input");
      input.type = "color";
      const current = node.style.color || doc.defaultView?.getComputedStyle(node).color || "";
      input.value = toHexColor(current) ?? "#000000";
      input.addEventListener(
        "change",
        () => {
          editor.undoManager.transact(() => {
            node.style.color = input.value;
          });
        },
        { once: true },
      );
      input.click();
    },
  });

  editor.ui.registry.addMenuButton(ICON_SIZE_MENU_NAME, {
    icon: "resize",
    tooltip: strings.iconContextSizeTooltip,
    fetch: (success) => {
      success(
        iconSizes.map(({ label, fontSize }) => ({
          type: "menuitem",
          text: label,
          onAction: () => {
            const node = editor.selection.getNode();
            if (!isIconElement(node)) return;
            editor.undoManager.transact(() => {
              if (fontSize) node.style.fontSize = fontSize;
              else node.style.removeProperty("font-size");
            });
          },
        })),
      );
    },
  });

  editor.ui.registry.addButton(ICON_DELETE_BUTTON_NAME, {
    icon: "remove",
    tooltip: strings.iconContextDeleteTooltip,
    onAction: () => {
      const node = editor.selection.getNode();
      if (!isIconElement(node)) return;
      editor.undoManager.transact(() => {
        editor.dom.remove(node);
      });
    },
  });

  editor.ui.registry.addContextToolbar(ICON_CONTEXT_TOOLBAR_NAME, {
    predicate: isIconElement,
    items: `${ICON_COLOR_BUTTON_NAME} ${ICON_SIZE_MENU_NAME} ${ICON_DELETE_BUTTON_NAME}`,
    position: "node",
    scope: "node",
  });
}
