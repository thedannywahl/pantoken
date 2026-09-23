/**
 * TinyMCE icons picker plugin: a dialog that browses every pantoken icon source, plus an
 * autocompleter for inserting one by name without leaving the keyboard.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import {
  buildIconMarkup,
  filterIcons,
  getIconCdnFile,
  getIconImageSrc,
  SOURCE_LABELS,
  type TaggedIcon,
} from "../icons.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";
import { insertHtml } from "../lib/insertion-target.js";
import { injectPickerStyles } from "../lib/icon-picker-styles.js";
import { mountIconPicker, renderPickerShell } from "../lib/icon-picker-dom.js";
import { TINYMCE_STRINGS } from "../strings.js";

/** Command that opens the icons picker. */
export const ICONS_COMMAND = "pantokenOpenIcons";

/**
 * Autocompleter trigger. Two colons rather than one so the stock `emoticons` plugin — which claims
 * `:` and would otherwise have several thousand icons merged into its results — keeps working.
 */
export const DEFAULT_ICON_TRIGGER = "::";

/** Element id the dialog shell carries, so the mount step can find it in the top-level document. */
const PICKER_ROOT_ID = "pantoken-icon-picker";

/**
 * Configuration options for the icons picker plugin.
 */
export interface IconsPickerOptions {
  icons: TaggedIcon[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
  /** CDN provider for the glyph sheets the picker preview needs. */
  provider?: string;
  /** Resolve an icon's CSS file to a local or CDN URL. Takes precedence over `provider`. */
  buildAssetUrl?: (file: CdnFile) => string;
  /** Autocompleter trigger string (default {@link DEFAULT_ICON_TRIGGER}). */
  trigger?: string;
}

/** Insert an icon and make sure the editor's content area has the CSS to paint it. */
function insertIcon(editor: Editor, icon: TaggedIcon, options: IconsPickerOptions): void {
  insertHtml(editor, buildIconMarkup(icon));
  trackAndInjectAsset(editor, getIconCdnFile(icon), options);
}

function openIconsDialog(editor: Editor, options: IconsPickerOptions): void {
  let picker: { destroy: () => void; getSelected: () => TaggedIcon | undefined } | undefined;

  const dialog = editor.windowManager.open({
    title: TINYMCE_STRINGS.iconsDialogTitle,
    size: "large",
    body: {
      type: "panel",
      items: [
        { type: "htmlpanel", html: renderPickerShell(PICKER_ROOT_ID), presets: "presentation" },
      ],
    },
    buttons: [
      { type: "cancel", text: TINYMCE_STRINGS.cancelButton },
      {
        type: "submit",
        name: "insert",
        text: TINYMCE_STRINGS.insertButton,
        primary: true,
        enabled: false,
      },
    ],
    onSubmit: (api) => {
      const icon = picker?.getSelected();
      if (icon) insertIcon(editor, icon, options);
      api.close();
    },
    onClose: () => picker?.destroy(),
  });

  const doc = editor.getContainer().ownerDocument;
  const root = doc.getElementById(PICKER_ROOT_ID);
  if (!root) return;

  injectPickerStyles(doc, options.icons, options.provider, options.buildAssetUrl);
  picker = mountIconPicker(root, options.icons, {
    strings: {
      searchPlaceholder: TINYMCE_STRINGS.iconsSearchPlaceholder,
      searchLabel: TINYMCE_STRINGS.iconsSearchLabel,
      allSourcesLabel: TINYMCE_STRINGS.iconsAllSources,
      resultCount: TINYMCE_STRINGS.iconsResultCount,
      emptyMessage: TINYMCE_STRINGS.iconsNoResults,
    },
    onSelect: (icon) => dialog.setEnabled("insert", icon !== undefined),
    onPick: (icon) => {
      insertIcon(editor, icon, options);
      dialog.close();
    },
  });
}

/**
 * Register the `::name` autocompleter. Rows show the real glyph where one can be resolved — either
 * from this package's bundled token data or, for the CDN-backed sources, by reading the custom
 * property back off the stylesheets {@link injectPickerStyles} installed.
 */
function registerAutocompleter(editor: Editor, options: IconsPickerOptions): void {
  const byValue = new Map(options.icons.map((icon) => [`${icon.source}:${icon.name}`, icon]));

  editor.ui.registry.addAutocompleter("pantokenIcons", {
    trigger: options.trigger ?? DEFAULT_ICON_TRIGGER,
    minChars: 2,
    columns: 1,
    highlightOn: ["pantoken-icon-name"],
    fetch: (pattern, maxResults) => {
      const doc = editor.getContainer().ownerDocument;
      injectPickerStyles(doc, options.icons, options.provider, options.buildAssetUrl);
      return Promise.resolve(
        filterIcons(options.icons, pattern)
          .slice(0, maxResults)
          .map((icon) => {
            const src = getIconImageSrc(icon, doc.documentElement);
            return {
              type: "cardmenuitem" as const,
              value: `${icon.source}:${icon.name}`,
              label: icon.name,
              items: [
                {
                  type: "cardcontainer" as const,
                  direction: "horizontal" as const,
                  items: [
                    ...(src ? [{ type: "cardimage" as const, src, alt: "" }] : []),
                    { type: "cardtext" as const, text: icon.name, name: "pantoken-icon-name" },
                    { type: "cardtext" as const, text: SOURCE_LABELS[icon.source] },
                  ],
                },
              ],
            };
          }),
      );
    },
    onAction: (api, rng, value) => {
      const icon = byValue.get(value);
      if (!icon) return;
      editor.selection.setRng(rng);
      insertIcon(editor, icon, options);
      api.hide();
    },
  });
}

/**
 * Create the icons picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 */
export function createIconsPlugin(options: IconsPickerOptions): (editor: Editor) => void {
  // TinyMCE always instantiates plugins with `new Plugin(editor, ...)` — must be a constructible
  // function expression, not an arrow function (arrows throw "is not a constructor").
  return function pantokenIconsPlugin(editor: Editor) {
    const openDialog = (): void => openIconsDialog(editor, options);
    editor.addCommand(ICONS_COMMAND, openDialog);
    registerAutocompleter(editor, options);

    if (options.registerUi === false) return;

    editor.ui.registry.addButton("pantokenIcons", {
      text: TINYMCE_STRINGS.iconsToolbarText,
      tooltip: TINYMCE_STRINGS.iconsToolbarTooltip,
      onAction: openDialog,
    });

    editor.ui.registry.addMenuItem("pantokenIcons", {
      text: TINYMCE_STRINGS.iconsMenuText,
      onAction: openDialog,
    });
  };
}
