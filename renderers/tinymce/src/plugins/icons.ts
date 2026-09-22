/**
 * TinyMCE icons picker plugin. Feeds pantoken's icons into TinyMCE's native `emoticons` plugin as
 * a custom database (categorized by provider) instead of a bespoke grid dialog, then edits the
 * inserted icon's screen-reader label via a small follow-up dialog.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import { buildFileUrl } from "@pantoken/cdn";
import type { CdnFile } from "@pantoken/cdn";
import {
  buildEmoticonsDatabase,
  getIconCdnFile,
  humanizeIconName,
  ICON_BUNDLE_CDN_FILES,
  matchInsertedIcon,
  PANTOKEN_ICONS_DATABASE_ID,
  type TaggedIcon,
} from "../icons.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";
import { insertHtmlIntoSourceViewOnly } from "../lib/insertion-target.js";
import { formatTinymceString, TINYMCE_STRINGS } from "../strings.js";

/**
 * Configuration options for the icons picker plugin.
 */
export interface IconsPickerOptions {
  icons: TaggedIcon[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** Appends a `<link rel="stylesheet">` to the top-level document `<head>` (idempotent per URL). */
function injectTopLevelStylesheet(url: string): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`link[href="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.append(link);
}

/**
 * Create the icons picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 */
export function createIconsPlugin(options: IconsPickerOptions): (editor: Editor) => void {
  // TinyMCE always instantiates plugins with `new Plugin(editor, ...)` — must be a constructible
  // function expression, not an arrow function (arrows throw "is not a constructor").
  return function pantokenIconsPlugin(editor: Editor) {
    // The picker's own dialog chrome renders in the top-level document, not the content iframe —
    // it needs every icon's CSS custom property available upfront since the grid isn't paginated.
    for (const bundle of ICON_BUNDLE_CDN_FILES) injectTopLevelStylesheet(buildFileUrl(bundle));

    // `tinymce.Resource` is a static registry reachable off the global manager singleton; this
    // package only imports TinyMCE's types, so it goes through `editor.editorManager` rather than
    // importing the `tinymce` runtime directly.
    (
      editor.editorManager as unknown as { Resource: { add: (id: string, db: unknown) => void } }
    ).Resource.add(PANTOKEN_ICONS_DATABASE_ID, buildEmoticonsDatabase(options.icons));

    editor.on("ExecCommand", (e) => {
      if (e.command !== "mceInsertContent") return;
      const icon = matchInsertedIcon(e.value as string, options.icons);
      if (!icon) return;
      // TinyMCE's native emoticons command already inserted into the (possibly hidden) WYSIWYG
      // doc by this point — mirror it into the CodeMirror doc if that's the visible surface.
      insertHtmlIntoSourceViewOnly(editor, e.value as string);
      trackAndInjectAsset(editor, getIconCdnFile(icon), options);
      openIconLabelDialog(editor, icon);
    });

    if (options.registerUi === false) return;

    const openIconsDialog = (): void => {
      editor.execCommand("mceEmoticons");
    };

    editor.ui.registry.addButton("pantokenIcons", {
      text: TINYMCE_STRINGS.iconsToolbarText,
      tooltip: TINYMCE_STRINGS.iconsToolbarTooltip,
      onAction: openIconsDialog,
    });

    editor.ui.registry.addMenuItem("pantokenIcons", {
      text: TINYMCE_STRINGS.iconsMenuText,
      onAction: openIconsDialog,
    });
  };
}

/**
 * Open a small dialog to edit the just-inserted icon's screen-reader label, prefilled with the
 * humanized icon name. Locates the inserted node via its transient `data-pantoken-icon` marker,
 * which is removed once this dialog closes.
 */
function openIconLabelDialog(editor: Editor, icon: TaggedIcon): void {
  const selector = `[data-pantoken-icon="${icon.source}:${icon.name}"]`;

  const clearMarker = (): void => {
    editor.dom.select(selector)[0]?.removeAttribute("data-pantoken-icon");
  };

  editor.windowManager.open({
    title: TINYMCE_STRINGS.iconLabelDialogTitle,
    body: {
      type: "panel",
      items: [
        {
          type: "input",
          name: "label",
          label: TINYMCE_STRINGS.iconLabelInputLabel,
        },
      ],
    },
    initialData: { label: humanizeIconName(icon.name) },
    buttons: [
      { type: "cancel", text: formatTinymceString(TINYMCE_STRINGS.cancelButton, {}) },
      {
        type: "submit",
        text: formatTinymceString(TINYMCE_STRINGS.insertButton, {}),
        primary: true,
      },
    ],
    onSubmit: (api) => {
      const { label } = api.getData() as { label: string };
      const node = editor.dom.select(selector)[0];
      const labelNode = node?.querySelector(".instui-screen-reader-content");
      if (labelNode) labelNode.textContent = label;
      clearMarker();
      api.close();
    },
    onCancel: clearMarker,
  });
}
