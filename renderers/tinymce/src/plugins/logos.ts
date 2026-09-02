/**
 * TinyMCE logos picker plugin.
 * Provides a dialog for selecting and inserting logos grouped by product,
 * with layout and color-mode sub-selection.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import type { LogoMeta, Product } from "../logos.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";

/**
 * Configuration options for the logos picker plugin.
 */
export interface LogosPickerOptions {
  logos: readonly LogoMeta[];
  products: readonly Product[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
}

/**
 * Create the logos picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 */
export function createLogosPlugin(options: LogosPickerOptions): (editor: Editor) => void {
  // TinyMCE always instantiates plugins with `new Plugin(editor, ...)` — must be a constructible
  // function expression, not an arrow function (arrows throw "is not a constructor").
  return function pantokenLogosPlugin(editor: Editor) {
    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenLogos", {
      text: "Logos",
      tooltip: "Insert a logo",
      onAction: () => openLogosDialog(editor, options),
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenLogos", {
      text: "Logo",
      onAction: () => openLogosDialog(editor, options),
    });
  };
}

/**
 * Open the logos picker dialog.
 */
function openLogosDialog(editor: Editor, options: LogosPickerOptions): void {
  let selectedProduct: string | undefined;
  let selectedLayout: string | undefined;
  let selectedColorMode: string | undefined;

  // Build product list for the dialog.
  const productItems = options.products.map((p) => ({
    text: p,
    value: p,
  }));

  const _dialog = editor.windowManager.open({
    title: "Insert Logo",
    body: {
      type: "panel",
      items: [
        {
          type: "selectbox",
          name: "product",
          label: "Product",
          items: productItems,
          onChange: (api: any) => {
            selectedProduct = (api?.target as HTMLSelectElement)?.value ?? selectedProduct;
          },
        } as any,
        {
          type: "selectbox",
          name: "layout",
          label: "Layout",
          items: [
            { text: "Horizontal", value: "horizontal" },
            { text: "Vertical", value: "vertical" },
            { text: "Stacked", value: "stacked" },
          ],
          onChange: (api: any) => {
            selectedLayout = (api?.target as HTMLSelectElement)?.value ?? selectedLayout;
          },
        } as any,
        {
          type: "selectbox",
          name: "colorMode",
          label: "Color Mode",
          items: [
            { text: "Color", value: "color" },
            { text: "Monochrome", value: "monochrome" },
            { text: "Light", value: "light" },
          ],
          onChange: (api: any) => {
            selectedColorMode = (api?.target as HTMLSelectElement)?.value ?? selectedColorMode;
          },
        } as any,
      ],
    },
    buttons: [
      {
        text: "Insert",
        type: "submit",
        primary: true,
        disabled: !selectedProduct,
      },
      {
        text: "Cancel",
        type: "cancel",
      },
    ],
    onSubmit: (api) => {
      if (selectedProduct && selectedLayout && selectedColorMode) {
        insertLogo(editor, selectedProduct, selectedLayout, selectedColorMode, options);
      }
      api.close();
    },
  });
}

/**
 * Insert the selected logo into the editor.
 */
export function insertLogo(
  editor: Editor,
  productId: string,
  layout: string,
  colorMode: string,
  options: LogosPickerOptions,
): void {
  // Generate the HTML snippet.
  const html = generateLogoHtml(productId, layout, colorMode);

  // Insert the HTML into the editor.
  editor.insertContent(html);

  // Compute the CSS file path for this logo variant.
  const cssFile: CdnFile = {
    package: "@pantoken/plugin-logos",
    path: `dist/${productId}-${layout}-${colorMode}.css`,
  };
  trackAndInjectAsset(editor, cssFile, options);
}

/**
 * Generate the HTML snippet for inserting a logo.
 * Uses an `<img>` tag pointing to the SVG asset with a data attribute for variant.
 */
export function generateLogoHtml(productId: string, layout: string, colorMode: string): string {
  // The data attribute encodes the variant for CSS targeting.
  return `<img class="pantoken-logo" data-product="${productId}" data-layout="${layout}" data-color-mode="${colorMode}" src="about:blank" alt="${productId} logo" style="max-width: 200px;" />`;
}
