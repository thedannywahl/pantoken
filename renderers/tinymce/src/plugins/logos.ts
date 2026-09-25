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
import { TINYMCE_STRINGS } from "../strings.js";

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
    const openDialog = (): void => openLogosDialog(editor, options);

    if (options.registerUi === false) {
      editor.addCommand(LOGOS_COMMAND, openDialog);
      return;
    }

    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenLogos", {
      text: TINYMCE_STRINGS.logosToolbarText,
      tooltip: TINYMCE_STRINGS.logosToolbarTooltip,
      onAction: openDialog,
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenLogos", {
      text: TINYMCE_STRINGS.logosMenuText,
      onAction: openDialog,
    });
  };
}

/**
 * Open the logos picker dialog.
 */
function openLogosDialog(editor: Editor, options: LogosPickerOptions): void {
  const defaultProduct = options.products[0];
  const defaultLayout = "horizontal";
  const defaultColorMode = "color";

  // Build product list for the dialog.
  const productItems = options.products.map((p) => ({
    text: p,
    value: p,
  }));

  const _dialog = editor.windowManager.open({
    title: TINYMCE_STRINGS.logosDialogTitle,
    body: {
      type: "panel",
      items: [
        {
          type: "selectbox",
          name: "product",
          label: TINYMCE_STRINGS.logosProductLabel,
          items: productItems,
        } as any,
        {
          type: "selectbox",
          name: "layout",
          label: TINYMCE_STRINGS.logosLayoutLabel,
          items: [
            { text: TINYMCE_STRINGS.logosLayoutHorizontal, value: "horizontal" },
            { text: TINYMCE_STRINGS.logosLayoutStacked, value: "stacked" },
          ],
        } as any,
        {
          type: "selectbox",
          name: "colorMode",
          label: TINYMCE_STRINGS.logosColorModeLabel,
          items: [
            { text: TINYMCE_STRINGS.logosColorModeColor, value: "color" },
            { text: TINYMCE_STRINGS.logosColorModeLight, value: "light" },
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
        text: TINYMCE_STRINGS.insertButton,
        type: "submit",
        primary: true,
        enabled: Boolean(defaultProduct),
      },
      {
        text: TINYMCE_STRINGS.cancelButton,
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

  insertHtml(editor, buildLogoMarkup(meta));
  trackAndInjectAsset(editor, getLogoCdnFile(meta), options);
}
