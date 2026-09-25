/**
 * TinyMCE "Layouts" plugin — like the Components/Icons/Logos pickers, but for whole starter page
 * layouts. Defaults to pantoken's own bundled layouts, rendered in `locale` (default `"en"`); pass
 * `layouts` to override or extend the list.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import {
  pageLayoutTemplates,
  renderPageLayout,
  type PageLayout,
  type PageLayoutImagePlaceholder,
} from "../layouts.js";
import { insertHtml, replaceContent } from "../lib/insertion-target.js";
import { formatTinymceString, TINYMCE_STRINGS } from "../strings.js";

/** Options for {@link createLayoutsPlugin}. */
export interface LayoutsPluginOptions {
  /** The page layouts offered in the "Insert layout" picker. Defaults to the bundled layouts. */
  layouts?: readonly PageLayout[];
  /** BCP47 locale to render layout text in. Defaults to `"en"`. */
  locale?: string;
  /** Resolves a layout image slot into a consumer-specific image URL. */
  resolveImage?: LayoutImageResolver;
  /** Called after a layout is inserted (e.g. to refresh a live preview). */
  onInsert?: (layout: PageLayout) => void;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** Image attributes returned by a consumer-specific layout image resolver. */
export interface LayoutImageAttributes {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

/** Resolves a provider-neutral layout image slot for a particular consumer. */
export type LayoutImageResolver = (
  placeholder: PageLayoutImagePlaceholder,
  layout: PageLayout,
) => LayoutImageAttributes | undefined;

/** Materialize declared layout image slots without embedding a provider URL in the layout. */
export function materializeLayout(layout: PageLayout, resolveImage?: LayoutImageResolver): string {
  if (!resolveImage || !layout.imagePlaceholders?.length) return layout.html;

  const parser = new DOMParser();
  const document = parser.parseFromString(`<body>${layout.html}</body>`, "text/html");
  const placeholders = new Map(
    layout.imagePlaceholders.map((placeholder) => [placeholder.key, placeholder]),
  );

  for (const image of Array.from(
    document.querySelectorAll("img[data-pantoken-image-placeholder]"),
  )) {
    const key = image.getAttribute("data-pantoken-image-placeholder");
    if (!key) continue;
    const placeholder = placeholders.get(key);
    if (!placeholder) continue;
    const attributes = resolveImage(placeholder, layout);
    if (!attributes) continue;

    image.classList.add("instui-img");
    image.setAttribute("src", attributes.src);
    image.setAttribute("alt", attributes.alt ?? placeholder.altText ?? "");
    image.setAttribute("width", String(attributes.width ?? placeholder.width));
    image.setAttribute("height", String(attributes.height ?? placeholder.height));
    image.removeAttribute("data-pantoken-image-placeholder");
  }

  return document.body.innerHTML;
}

/** The plugin name to pass in TinyMCE's `plugins`/`toolbar` init options. */
export const LAYOUTS_PLUGIN_NAME = "pantoken_layouts";
/** The toolbar button/menu item name registered by this plugin. */
export const LAYOUTS_TOOLBAR_NAME = "pantokenLayouts";
/** Command that opens the layouts picker. */
export const LAYOUTS_COMMAND = "pantokenOpenLayouts";

/** Builds the `tinymce.PluginManager.add` callback for the "Insert layout" plugin. */
export function createLayoutsPlugin(options: LayoutsPluginOptions = {}) {
  const { layouts = pageLayoutTemplates, onInsert, resolveImage, locale = "en" } = options;
  const resolvedLayouts = layouts.map((layout) => renderPageLayout(layout, locale));
  return function pantokenLayoutsPlugin(editor: Editor) {
    const openDialog = (): void => {
      editor.windowManager.open({
        title: TINYMCE_STRINGS.layoutsDialogTitle,
        body: {
          type: "panel",
          items: [
            {
              type: "selectbox",
              name: "layout",
              label: TINYMCE_STRINGS.layoutsSelectLabel,
              items: resolvedLayouts.map((l) => ({ value: l.name, text: l.title })),
            },
          ],
        },
        initialData: { layout: resolvedLayouts[0]?.name ?? "" },
        buttons: [
          { type: "cancel", text: TINYMCE_STRINGS.cancelButton },
          { type: "custom", name: "replace", text: TINYMCE_STRINGS.replaceButton },
          { type: "submit", text: TINYMCE_STRINGS.insertButton, primary: true },
        ],
        onSubmit: (api): void => {
          const { layout } = api.getData() as { layout: string };
          const chosen = resolvedLayouts.find((l) => l.name === layout);
          api.close();
          if (!chosen) return;
          insertHtml(editor, materializeLayout(chosen, resolveImage));
          onInsert?.(chosen);
        },
        onAction: (api, details): void => {
          if (details.name !== "replace") return;
          const { layout } = api.getData() as { layout: string };
          const chosen = resolvedLayouts.find((l) => l.name === layout);
          api.close();
          if (!chosen) return;
          editor.windowManager.confirm(
            formatTinymceString(TINYMCE_STRINGS.layoutsConfirmReplace, { title: chosen.title }),
            (confirmed: boolean): void => {
              if (!confirmed) return;
              replaceContent(editor, materializeLayout(chosen, resolveImage));
              onInsert?.(chosen);
            },
          );
        },
      });
    };

    if (options.registerUi === false) {
      editor.addCommand(LAYOUTS_COMMAND, openDialog);
      return {};
    }

    editor.ui.registry.addButton(LAYOUTS_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.layoutsToolbarText,
      tooltip: TINYMCE_STRINGS.layoutsToolbarTooltip,
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(LAYOUTS_TOOLBAR_NAME, {
      text: TINYMCE_STRINGS.layoutsMenuText,
      onAction: openDialog,
    });

    return {};
  };
}
