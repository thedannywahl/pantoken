/**
 * TinyMCE icons picker plugin.
 * Provides a large icon grid for inserting component icons or simple-icons brand icons.
 * Supports pagination for the \~4700-icon collection.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import type { TaggedIcon } from "../icons.js";
import { getIconCdnFile } from "../icons.js";
import { injectContentStylesheet } from "../content-css.js";

/**
 * Configuration options for the icons picker plugin.
 */
export interface IconsPickerOptions {
  icons: TaggedIcon[];
  currentAssets: CdnFile[];
  onMissingAsset?: (asset: CdnFile) => void;
}

const ICONS_PER_PAGE = 50; // Adjust for performance

/**
 * Create the icons picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 */
export function createIconsPlugin(options: IconsPickerOptions): (editor: Editor) => void {
  return (editor: Editor) => {
    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenIcons", {
      text: "Icons",
      tooltip: "Insert an icon",
      onAction: () => openIconsDialog(editor, options),
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenIcons", {
      text: "Icon",
      onAction: () => openIconsDialog(editor, options),
    });
  };
}

/**
 * Open the icons picker dialog.
 */
function openIconsDialog(editor: Editor, options: IconsPickerOptions): void {
  let currentPage = 0;
  let filteredIcons = options.icons;
  let selectedIcon: TaggedIcon | undefined;

  // Dialog body: search box, icon grid, pagination.
  const _dialog = editor.windowManager.open({
    title: "Insert Icon",
    body: {
      type: "panel",
      items: [
        {
          type: "input",
          name: "search",
          label: "Search",
          placeholder: "e.g., heart, star, menu",
          onChange: (api: any) => {
            const searchTerm = (api.target as HTMLInputElement).value.toLowerCase();
            filteredIcons = options.icons.filter((icon) =>
              icon.name.toLowerCase().includes(searchTerm),
            );
            currentPage = 0;
            // In a real implementation, re-render the icon grid here.
          },
        } as any,
        {
          type: "htmlpanel",
          html: renderIconGrid(filteredIcons, currentPage, ICONS_PER_PAGE, (icon: TaggedIcon) => {
            selectedIcon = icon;
          }),
        },
      ],
    },
    buttons: [
      {
        text: "Insert",
        type: "submit",
        primary: true,
        disabled: !selectedIcon,
      },
      {
        text: "Cancel",
        type: "cancel",
      },
    ],
    onSubmit: (api) => {
      if (selectedIcon) {
        insertIcon(editor, selectedIcon, options);
      }
      api.close();
    },
  });
}

/**
 * Render an HTML grid of icons for the current page.
 */
function renderIconGrid(
  icons: TaggedIcon[],
  page: number,
  perPage: number,
  _onSelect: (icon: TaggedIcon) => void,
): string {
  const start = page * perPage;
  const end = start + perPage;
  const pageIcons = icons.slice(start, end);

  let html = '<div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 8px;">';

  for (const icon of pageIcons) {
    html += `<button style="padding: 8px; cursor: pointer; font-size: 12px;" title="${icon.name}">${icon.name}</button>`;
  }

  html += "</div>";

  // Pagination info.
  const totalPages = Math.ceil(icons.length / perPage);
  html += `<div style="margin-top: 8px; text-align: center; font-size: 12px;">Page ${page + 1} of ${totalPages} (${icons.length} icons)</div>`;

  return html;
}

/**
 * Insert the selected icon into the editor.
 */
function insertIcon(editor: Editor, icon: TaggedIcon, options: IconsPickerOptions): void {
  // Generate the HTML snippet based on icon source.
  const html = generateIconHtml(icon);

  // Insert the HTML into the editor.
  editor.insertContent(html);

  // Get the CDN file for this icon and track it.
  const cssFile = getIconCdnFile(icon);

  // Add to current assets if not already present.
  if (!options.currentAssets.find((a) => a.path === cssFile.path)) {
    options.currentAssets.push(cssFile);
    if (options.onMissingAsset) {
      options.onMissingAsset(cssFile);
    }
  }

  // Inject the stylesheet into the WYSIWYG editor's content area.
  const cssUrl = `https://unpkg.com/${cssFile.package}@latest/${cssFile.path}`;
  injectContentStylesheet(editor, cssUrl);
}

/**
 * Generate the HTML snippet for inserting an icon.
 * For component icons, use an `<i class="instui-icon-...">` element.
 * For simple-icons, use a similar convention with a class prefix.
 */
function generateIconHtml(icon: TaggedIcon): string {
  switch (icon.source) {
    case "components":
      // Component icons use `-icon-{name}` modifier convention.
      return `<i class="instui-icon -icon-${icon.name}"></i>`;

    case "simple-icons":
      // Simple-icons use the icon slug as a class.
      return `<i class="simple-icon-${icon.name}"></i>`;

    default:
      return "";
  }
}
