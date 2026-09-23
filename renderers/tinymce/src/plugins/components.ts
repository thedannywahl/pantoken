/**
 * TinyMCE components picker plugin.
 * Provides a dialog for browsing and inserting pantoken components.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import type { CssDocEntry } from "../cssdoc/model.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";
import { insertHtml } from "../lib/insertion-target.js";
import { TINYMCE_STRINGS } from "../strings.js";

/**
 * Configuration options for the components picker plugin.
 */
export interface ComponentsPickerOptions {
  model: CssDocEntry[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  /** Resolve a component's CSS file to a local or CDN URL. Defaults to the default CDN provider. */
  buildAssetUrl?: (file: CdnFile) => string;
  /** Register this picker's standalone toolbar button and menu item. */
  registerUi?: boolean;
}

/** Command that opens the components picker. */
export const COMPONENTS_COMMAND = "pantokenOpenComponents";

/**
 * A component/utility record for display in the picker.
 */
interface ComponentRecord {
  name: string;
  className: string;
  kind: "component" | "utility" | "custom-component";
  description?: string;
  examples: string[];
}

const COMPONENT_PICKER_EXCLUDED_COMPONENTS = new Set([
  "agent-shell",
  "date-input",
  "date-time-input",
  "drawer-layout",
  "file-drop",
  "form-field",
  "form-field-messages",
  "in-place-edit",
  "input-group",
  "number-input",
  "range-input",
  "side-nav-bar",
  "simple-select",
  "text-area",
  "text-input",
  "tray",
]);

function normalizeExample(example: string): string {
  const fencedHtml = example.match(/```(?:html)?\s*([\s\S]*?)```/iu);
  return (fencedHtml?.[1] ?? example).trim();
}

/**
 * Create the components picker plugin factory.
 * Returns a function suitable for `tinymce.PluginManager.add()`.
 *
 * Usage:
 *   tinymce.PluginManager.add(
 *     "pantokenComponents",
 *     createComponentsPlugin(`{ model, currentAssets, onMissingAsset }`)
 *   );
 */
export function createComponentsPlugin(options: ComponentsPickerOptions): (editor: Editor) => void {
  // TinyMCE always instantiates plugins with `new Plugin(editor, ...)` — must be a constructible
  // function expression, not an arrow function (arrows throw "is not a constructor").
  return function pantokenComponentsPlugin(editor: Editor) {
    // Build a list of available components.
    const componentList = buildComponentList(options.model);
    const openDialog = (): void => openComponentsDialog(editor, componentList, options);

    if (options.registerUi === false) {
      editor.addCommand(COMPONENTS_COMMAND, openDialog);
      return;
    }

    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenComponents", {
      text: TINYMCE_STRINGS.componentsToolbarText,
      tooltip: TINYMCE_STRINGS.componentsToolbarTooltip,
      onAction: openDialog,
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenComponents", {
      text: TINYMCE_STRINGS.componentsMenuText,
      onAction: openDialog,
    });
  };
}

/**
 * Build a list of components for the picker.
 */
function buildComponentList(model: CssDocEntry[]): ComponentRecord[] {
  const list: ComponentRecord[] = [];

  for (const entry of model) {
    const kind = entry.kind as string;
    if (kind !== "component" && kind !== "custom-component") continue;
    if (COMPONENT_PICKER_EXCLUDED_COMPONENTS.has(entry.name)) continue;

    list.push({
      name: entry.name,
      className: entry.className,
      kind: entry.kind as any,
      description: (entry as any).description || "",
      examples: (entry as any).examples || [],
    });
  }

  return list.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Open the components picker dialog.
 */
function openComponentsDialog(
  editor: Editor,
  components: ComponentRecord[],
  options: ComponentsPickerOptions,
): void {
  // Dialog body: title and results list.
  const _body = editor.windowManager.open({
    title: TINYMCE_STRINGS.componentsDialogTitle,
    body: {
      type: "panel",
      items: [
        {
          type: "listbox",
          name: "component",
          label: TINYMCE_STRINGS.componentsListLabel,
          items: components.map((c) => ({
            text: c.name,
            value: c.name,
          })),
          size: 10,
        } as any,
      ],
    },
    buttons: [
      {
        text: TINYMCE_STRINGS.insertButton,
        type: "submit",
        primary: true,
      },
      {
        text: TINYMCE_STRINGS.cancelButton,
        type: "cancel",
      },
    ],
    onSubmit: (api: any) => {
      const data = api.getData() as { component: string };
      const selectedName = data.component;
      const component = components.find((c) => c.name === selectedName);

      if (component && component.examples.length > 0) {
        // Insert the first example.
        const html = normalizeExample(component.examples[0]);
        insertHtml(editor, html);

        // If this component has a CSS file, inject it into the content area.
        const cssFile: CdnFile = {
          package: "@pantoken/components",
          path: `dist/${component.name}.css`,
        };
        trackAndInjectAsset(editor, cssFile, options);
      }

      api.close();
    },
  });
}
