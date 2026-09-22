/**
 * TinyMCE icons picker plugin. Feeds pantoken's icons into TinyMCE's native `emoticons` plugin as
 * a custom database (categorized by provider) instead of a bespoke grid dialog.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import { buildFileUrl } from "@pantoken/cdn";
import type { CdnFile } from "@pantoken/cdn";
import {
  buildIconMarkup,
  buildEmoticonsDatabase,
  getIconCdnFile,
  ICON_BUNDLE_CDN_FILES,
  matchInsertedIcon,
  PANTOKEN_ICONS_DATABASE_ID,
  type TaggedIcon,
} from "../icons.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";
import { insertHtmlIntoSourceViewOnly } from "../lib/insertion-target.js";
import { TINYMCE_STRINGS } from "../strings.js";

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
      insertHtmlIntoSourceViewOnly(editor, buildIconMarkup(icon));
      trackAndInjectAsset(editor, getIconCdnFile(icon), options);
      const selector = `[data-pantoken-icon="${icon.source}:${icon.name}"]`;
      editor.dom.select(selector)[0]?.removeAttribute("data-pantoken-icon");
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
