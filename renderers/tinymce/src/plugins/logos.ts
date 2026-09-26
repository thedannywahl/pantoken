/**
 * TinyMCE logos picker plugin.
 * Provides a dialog for selecting and inserting logos grouped by product,
 * with layout and color-mode sub-selection.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import { buildLogoMarkup, getLogoCdnFile, getLogoMeta } from "../logos.js";
import type { LogoMeta, Product } from "../logos.js";
import type { MissingAssetHandler } from "../types.js";
import { insertHtml } from "../lib/insertion-target.js";
import { trackAndInjectAsset } from "../content-css.js";
import { getEditorStrings } from "../strings.js";

/**
 * Configuration options for the logos picker plugin.
 */
export interface LogosPickerOptions {
  logos: readonly LogoMeta[];
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
  const defaultProduct = options.products[0];
  const defaultLayout = "horizontal";
  const defaultColorMode = "color";

  // Build product list for the dialog.
  const productItems = options.products.map((p) => ({
    text: p,
    value: p,
  }));

  const _dialog = editor.windowManager.open({
    title: strings.logosDialogTitle,
    body: {
      type: "panel",
      items: [
        {
          type: "selectbox",
          name: "product",
          label: strings.logosProductLabel,
          items: productItems,
        } as any,
        {
          type: "selectbox",
          name: "layout",
          label: strings.logosLayoutLabel,
          items: [
            { text: strings.logosLayoutHorizontal, value: "horizontal" },
            { text: strings.logosLayoutStacked, value: "stacked" },
          ],
        } as any,
        {
          type: "selectbox",
          name: "colorMode",
          label: strings.logosColorModeLabel,
          items: [
            { text: strings.logosColorModeColor, value: "color" },
            { text: strings.logosColorModeLight, value: "light" },
          ],
        } as any,
      ],
    },
    initialData: {
      product: defaultProduct ?? "",
      layout: defaultLayout,
      colorMode: defaultColorMode,
    },
    buttons: [
      {
        text: strings.insertButton,
        type: "submit",
        primary: true,
        enabled: Boolean(defaultProduct),
      },
      {
        text: strings.cancelButton,
        type: "cancel",
      },
    ],
    onSubmit: (api: any) => {
      const data = api.getData() as {
        product?: string;
        layout?: string;
        colorMode?: string;
      };
      const selectedProduct = data.product;
      const selectedLayout = data.layout;
      const selectedColorMode = data.colorMode;

      if (selectedProduct && selectedLayout && selectedColorMode) {
        insertLogo(editor, selectedProduct, selectedLayout, selectedColorMode, options);
      }
      api.close();
    },
  });
}

/**
 * Insert the selected logo into the editor as a mask-painted `.-logo-<name>` glyph (same technique
 * as `icons.ts`'s `insertIcon`) — the logo's stylesheet is tracked and injected via
 * `trackAndInjectAsset` so the glyph paints without a separate manual `<link>`.
 *
 * Silently no-ops if the product/layout/colorMode combination has no matching logo asset (e.g. not
 * every product ships every layout).
 */
export function insertLogo(
  editor: Editor,
  productId: string,
  layout: string,
  colorMode: string,
  options: {
    currentAssets: CdnFile[];
    onMissingAsset?: MissingAssetHandler;
    buildAssetUrl?: (file: CdnFile) => string;
  } = { currentAssets: [] },
): void {
  const meta = getLogoMeta(
    productId as Product,
    layout as LogoMeta["layout"],
    colorMode as LogoMeta["colorMode"],
  );
  if (!meta) return;

  insertHtml(editor, buildLogoMarkup(meta, getEditorStrings(editor).logoAltSuffix));
  trackAndInjectAsset(editor, getLogoCdnFile(meta), options);
}
