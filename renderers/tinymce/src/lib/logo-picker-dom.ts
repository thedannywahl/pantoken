/**
 * The logos picker's grid: search, product tabs, and one previewed tile per logo variant, built on
 * the shared {@link mountTilePicker}.
 *
 * \@module
 */
import {
  filterLogos,
  logoVariantLabel,
  PRODUCT_LABELS,
  type LogoMeta,
  type Product,
} from "../logos.js";
import { LOGO_PICKER_CLASS } from "./logo-picker-styles.js";
import {
  element,
  mountTilePicker,
  type MountedTilePicker,
  type TilePickerStrings,
} from "./tile-picker-dom.js";

/** Localized labels the picker renders. */
export interface LogoPickerStrings extends TilePickerStrings {
  allProductsLabel: string;
}

/** Options for {@link mountLogoPicker}. */
export interface LogoPickerOptions {
  strings: LogoPickerStrings;
  /** Double-click (or Enter) on a tile: insert it immediately and close the dialog. */
  onPick: (logo: LogoMeta) => void;
  /** Single click (or arrow-key navigation) on a tile: mark it selected for the Insert button. */
  onSelect?: (logo: LogoMeta | undefined) => void;
}

/** A mounted picker; call `destroy` when the dialog closes. */
export type MountedLogoPicker = MountedTilePicker<LogoMeta>;

/**
 * Build the logos picker inside `root`.
 *
 * @param root - The empty shell element from `renderPickerShell`.
 * @param logos - Every selectable logo.
 * @param products - The product tabs, in display order; products without a logo are skipped.
 * @param options - {@link LogoPickerOptions}.
 * @returns A {@link MountedLogoPicker}.
 */
export function mountLogoPicker(
  root: HTMLElement,
  logos: readonly LogoMeta[],
  products: readonly Product[],
  options: LogoPickerOptions,
): MountedLogoPicker {
  const available = new Set(logos.map((logo) => logo.product));
  return mountTilePicker(root, {
    strings: options.strings,
    tabs: [
      { value: "", label: options.strings.allProductsLabel },
      ...products
        .filter((product) => available.has(product))
        .map((product) => ({ value: product, label: PRODUCT_LABELS[product] ?? product })),
    ],
    filter: (query, tab) => filterLogos(logos, query, (tab || undefined) as Product | undefined),
    renderTile: (doc, logo) => {
      const fragment = doc.createDocumentFragment();
      const glyph = element(doc, "span", `instui-logo -logo-${logo.name}`);
      glyph.setAttribute("aria-hidden", "true");
      const caption = element(doc, "span", `${LOGO_PICKER_CLASS}__caption`);
      caption.textContent = logoVariantLabel(logo);
      fragment.append(glyph, caption);
      return fragment;
    },
    tileLabel: (logo) =>
      `${PRODUCT_LABELS[logo.product] ?? logo.product} — ${logoVariantLabel(logo)}`,
    onPick: options.onPick,
    onSelect: options.onSelect,
  });
}
