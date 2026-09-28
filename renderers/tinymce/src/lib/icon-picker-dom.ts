/**
 * The icons picker's grid: search, source tabs, and a chunked, keyboard-navigable icon grid, built
 * on the shared {@link mountTilePicker}.
 *
 * \@module
 */
import { filterIcons, SOURCE_LABELS, type TaggedIcon } from "../icons.js";
import {
  element,
  mountTilePicker,
  type MountedTilePicker,
  type TilePickerStrings,
} from "./tile-picker-dom.js";

export { renderPickerShell } from "./tile-picker-dom.js";

/** Localized labels the picker renders. */
export interface IconPickerStrings extends TilePickerStrings {
  allSourcesLabel: string;
}

/** Options for {@link mountIconPicker}. */
export interface IconPickerOptions {
  strings: IconPickerStrings;
  /** Double-click (or Enter) on a tile: insert it immediately and close the dialog. */
  onPick: (icon: TaggedIcon) => void;
  /** Single click (or arrow-key navigation) on a tile: mark it selected for the Insert button. */
  onSelect?: (icon: TaggedIcon | undefined) => void;
}

/** A mounted picker; call `destroy` when the dialog closes. */
export type MountedIconPicker = MountedTilePicker<TaggedIcon>;

/**
 * Build the picker inside `root` and wire its behavior.
 *
 * @param root - The empty shell element from {@link renderPickerShell}.
 * @param icons - Every selectable icon, already sorted.
 * @param options - {@link IconPickerOptions}.
 * @returns A {@link MountedIconPicker}.
 */
export function mountIconPicker(
  root: HTMLElement,
  icons: readonly TaggedIcon[],
  options: IconPickerOptions,
): MountedIconPicker {
  const sources = [...new Set(icons.map((icon) => icon.source))];
  return mountTilePicker(root, {
    strings: options.strings,
    tabs: [
      { value: "", label: options.strings.allSourcesLabel },
      ...sources.map((source) => ({ value: source, label: SOURCE_LABELS[source] })),
    ],
    filter: (query, tab) =>
      filterIcons(icons, query, (tab || undefined) as TaggedIcon["source"] | undefined),
    renderTile: (doc, icon) => {
      const glyph = element(doc, "span", `instui-icon -icon-${icon.name}`);
      glyph.setAttribute("aria-hidden", "true");
      return glyph;
    },
    tileLabel: (icon) => `${icon.name} — ${SOURCE_LABELS[icon.source]}`,
    onPick: options.onPick,
    onSelect: options.onSelect,
  });
}
