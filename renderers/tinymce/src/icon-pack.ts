import { rebrandTokens } from "@pantoken/tokens";
import type { IconManager } from "tinymce";

const ICON_TOKEN_PREFIX = "--instui-icon-";
const FALLBACK_ICON = "circle-question-mark";

const ICON_ALIASES: Record<string, string> = {
  "accessibility-check": "accessibility",
  "accordion-toggle": "chevron-down",
  accordion: "panel-top",
  "action-next": "arrow-right",
  "action-prev": "arrow-left",
  "add-file": "square-dashed-plus",
  adjustments: "sliders-horizontal",
  "align-center": "text-align-center",
  "align-justify": "text-align-justify",
  "align-left": "text-align-start",
  "align-none": "remove-formatting",
  "align-right": "text-align-end",
  attachment: "paperclip",
  browse: "folder-open",
  cancel: "x",
  "change-case": "case-upper",
  checklist: "list-checks",
  "checklist-rtl": "list-checks",
  "checkmark-filled": "circle-check-big",
  checkmark: "check",
  "close-filled": "circle-x",
  close: "x",
  "code-sample": "square-code",
  "color-picker": "pipette",
  "comment-add": "message-square-plus",
  comment: "message-square",
  cut: "scissors",
  "document-gear-properties": "file-cog",
  "document-properties": "file-cog",
  drag: "grip-vertical",
  duplicate: "copy",
  "edit-block": "square-pen",
  "edit-image": "image-up",
  embed: "square-code",
  emoji: "smile",
  export: "download",
  "export-pdf": "file-down",
  "export-word": "file-down",
  help: "circle-question-mark",
  "highlight-bg-color": "highlighter",
  home: "house",
  "horizontal-rule": "minus",
  indent: "list-indent-increase",
  "insert-character": "omega",
  "list-bull-circle": "list-circle",
  "list-bull-default": "list",
  "list-bull-disc": "list",
  "list-bull-square": "list-square",
  "more-drawer": "ellipsis",
  "new-document": "file-plus",
  "new-tab": "square-plus",
  "ordered-list": "list-ordered",
  "ordered-list-rtl": "list-ordered",
  outdent: "list-indent-decrease",
  paste: "clipboard-paste",
  "paste-text": "clipboard-paste",
  preferences: "settings",
  preview: "eye",
  print: "printer",
  reload: "refresh-cw",
  remove: "trash",
  resize: "maximize-2",
  "resize-handle": "-vertical",
  "rotate-left": "rotate-ccw",
  "rotate-right": "rotate-cw",
  "select-all": "square-check-big",
  selected: "square-check",
  "source-file": "file-code",
  "source-image": "file-image",
  "source-link": "link",
  sourcecode: "code-xml",
  "strike-through": "strikethrough",
  "table-delete-column": "table-column-x",
  "table-delete-row": "table-row-x",
  "table-delete-table": "table-2-x",
  "table-insert-column-after": "table-column-plus-right",
  "table-insert-column-before": "table-column-plus-left",
  "table-insert-row-above": "table-row-plus-top",
  "table-insert-row-after": "table-row-plus-bottom",
  "table-merge-cells": "table-cells-merge",
  "table-split-cells": "table-cells-split",
  "text-size-decrease": "a-arrow-down",
  "text-size-increase": "a-arrow-up",
  "unordered-list": "list",
  unlock: "lock-open",
  unselected: "square",
  "upload-from-device": "upload",
  "upload-from-link": "link",
  warning: "triangle-alert",
};

/** TinyMCE icon-pack id to pass as the editor's `icons` option. */
export const PANTOKEN_ICON_PACK_NAME = "pantoken";

function decodeIconToken(value: string): string | undefined {
  const match = /^url\(['"]?data:image\/svg\+xml;utf8,(%3Csvg.*?)['"]?\)$/u.exec(value);
  return match
    ? decodeURIComponent(match[1]).replace(
        "<svg ",
        '<svg style="fill: none; stroke: currentColor" ',
      )
    : undefined;
}

const pantokenIcons = new Map<string, string>();

for (const token of rebrandTokens) {
  if (token.meta?.kind !== "icon" || !token.name.startsWith(ICON_TOKEN_PREFIX)) continue;
  const svg = decodeIconToken(token.value);
  if (svg) pantokenIcons.set(token.name.slice(ICON_TOKEN_PREFIX.length), svg);
}

function getPantokenIcon(tinymceIconName: string): string {
  const pantokenName = pantokenIcons.has(tinymceIconName)
    ? tinymceIconName
    : ICON_ALIASES[tinymceIconName];
  return pantokenIcons.get(pantokenName) ?? pantokenIcons.get(FALLBACK_ICON)!;
}

/**
 * Register a TinyMCE icon pack whose complete key set mirrors the installed default pack while
 * every rendered glyph comes from Pantoken's InstUI/Lucide icon tokens.
 */
export function registerPantokenIconPack(iconManager: IconManager): string {
  if (!iconManager.has("default")) {
    throw new Error("TinyMCE's default icon pack must be loaded before the Pantoken icon pack");
  }

  const icons = Object.fromEntries(
    Object.keys(iconManager.get("default").icons).map((name) => [name, getPantokenIcon(name)]),
  );
  iconManager.add(PANTOKEN_ICON_PACK_NAME, { icons });
  return PANTOKEN_ICON_PACK_NAME;
}
