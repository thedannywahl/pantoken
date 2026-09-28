/**
 * TinyMCE logos picker plugin: a dialog with product tabs over a searchable grid of previewed logo
 * variants, same shape as the icons picker.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import { buildLogoMarkup, getLogoCdnFile, getLogoMeta, getUsedLogoCdnFiles } from "../logos.js";
import type { LogoMeta, Product } from "../logos.js";
import type { MissingAssetHandler } from "../types.js";
import { insertHtml } from "../lib/insertion-target.js";
import { registerGlyphSync } from "../lib/glyph-assets.js";
import { mountLogoPicker, type MountedLogoPicker } from "../lib/logo-picker-dom.js";
import { injectLogoPickerStyles, LOGO_PICKER_CLASS } from "../lib/logo-picker-styles.js";
import { renderPickerShell } from "../lib/tile-picker-dom.js";
import { trackAndInjectAsset } from "../content-css.js";
import { getEditorStrings } from "../strings.js";

/**
 * Configuration options for the logos picker plugin.
 */
export interface LogosPickerOptions {
  /** The logos the picker offers; glyph sync still recognizes the full catalog. */
  logos: readonly LogoMeta[];
  /** Product tab order. */
  products: readonly Product[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  /** Resolve the selected logo's package export to a local or CDN URL. */
  buildAssetUrl?: (file: CdnFile) => string;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** Command that opens the logos picker. */
export const LOGOS_COMMAND = "pantokenOpenLogos";

/** Element id the dialog shell carries, so the mount step can find it in the top-level document. */
const PICKER_ROOT_ID = "pantoken-logo-picker";

/**
 * Create the logos picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 */
export function createLogosPlugin(options: LogosPickerOptions): (editor: Editor) => void {
  // TinyMCE always instantiates plugins with `new Plugin(editor, ...)` — must be a constructible
  // function expression, not an arrow function (arrows throw "is not a constructor").
  return function pantokenLogosPlugin(editor: Editor) {
    const strings = getEditorStrings(editor);
    const openDialog = (): void => openLogosDialog(editor, options);
    // The full catalog, not `options.logos`: a logo hidden from the picker can still arrive by paste.
    registerGlyphSync(editor, (root) => getUsedLogoCdnFiles(root), options);

    if (options.registerUi === false) {
      editor.addCommand(LOGOS_COMMAND, openDialog);
      return;
    }

    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenLogos", {
      text: strings.logosToolbarText,
      tooltip: strings.logosToolbarTooltip,
      onAction: openDialog,
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenLogos", {
      text: strings.logosMenuText,
      onAction: openDialog,
    });
  };
}

/**
 * Open the logos picker dialog.
 */
function openLogosDialog(editor: Editor, options: LogosPickerOptions): void {
  const strings = getEditorStrings(editor);
  let picker: MountedLogoPicker | undefined;

  const dialog = editor.windowManager.open({
    title: strings.logosDialogTitle,
    size: "large",
    body: {
      type: "panel",
      items: [
        {
          type: "htmlpanel",
          html: renderPickerShell(PICKER_ROOT_ID, LOGO_PICKER_CLASS),
          presets: "presentation",
        },
      ],
    },
    buttons: [
      { type: "cancel", text: strings.cancelButton },
      {
        type: "submit",
        name: "insert",
        text: strings.insertButton,
        primary: true,
        enabled: false,
      },
    ],
    onSubmit: (api) => {
      const logo = picker?.getSelected();
      if (logo) insertLogoMeta(editor, logo, options);
      api.close();
    },
    onClose: () => picker?.destroy(),
  });

  const doc = editor.getContainer().ownerDocument;
  const root = doc.getElementById(PICKER_ROOT_ID);
  if (!root) return;

  injectLogoPickerStyles(doc, options.buildAssetUrl);
  picker = mountLogoPicker(root, options.logos, options.products, {
    strings: {
      searchPlaceholder: strings.logosSearchPlaceholder,
      searchLabel: strings.logosSearchLabel,
      allProductsLabel: strings.logosAllProducts,
      resultCount: strings.logosResultCount,
      emptyMessage: strings.logosNoResults,
    },
    onSelect: (logo) => dialog.setEnabled("insert", logo !== undefined),
    onPick: (logo) => {
      insertLogoMeta(editor, logo, options);
      dialog.close();
    },
  });
}

type InsertTarget = {
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  buildAssetUrl?: (file: CdnFile) => string;
};

/**
 * Insert `meta` as a mask-painted `.-logo-<name>` glyph (same technique as `icons.ts`'s
 * `insertIcon`), tracking and injecting its stylesheet so it paints without a manual `<link>`.
 */
function insertLogoMeta(
  editor: Editor,
  meta: LogoMeta,
  options: InsertTarget = { currentAssets: [] },
): void {
  insertHtml(editor, buildLogoMarkup(meta, getEditorStrings(editor).logoAltSuffix));
  trackAndInjectAsset(editor, getLogoCdnFile(meta), options);
}

/**
 * Insert the logo for a product/layout/colorMode combination; silently no-ops if that combination
 * has no matching asset (not every product ships every layout).
 */
export function insertLogo(
  editor: Editor,
  productId: string,
  layout: string,
  colorMode: string,
  options: InsertTarget = { currentAssets: [] },
): void {
  const meta = getLogoMeta(
    productId as Product,
    layout as LogoMeta["layout"],
    colorMode as LogoMeta["colorMode"],
  );
  if (meta) insertLogoMeta(editor, meta, options);
}
