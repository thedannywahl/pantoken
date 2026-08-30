/**
 * TinyMCE components picker plugin.
 * Provides a dialog for browsing and inserting pantoken components, utilities, and custom-components.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import type { CssDocEntry } from "../cssdoc/model.js";
import type { MissingAssetHandler } from "../types.js";
import { trackAndInjectAsset } from "../content-css.js";

/**
 * Configuration options for the components picker plugin.
 */
export interface ComponentsPickerOptions {
  model: CssDocEntry[];
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
}

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
    // Build a flattened list of all available components/utilities.
    const componentList = buildComponentList(options.model);

    // Register the toolbar button.
    editor.ui.registry.addButton("pantokenComponents", {
      text: "Components",
      tooltip: "Insert a pantoken component",
      onAction: () => openComponentsDialog(editor, componentList, options),
    });

    // Register a menu item.
    editor.ui.registry.addMenuItem("pantokenComponents", {
      text: "Component",
      onAction: () => openComponentsDialog(editor, componentList, options),
    });
  };
}

/**
 * Build a searchable list of all components/utilities for the picker.
 */
function buildComponentList(model: CssDocEntry[]): ComponentRecord[] {
  const list: ComponentRecord[] = [];

  for (const entry of model) {
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
  // Filter state for search.
  let _currentFilter = "";
  let filteredComponents = components;

  // Dialog body: title, search box, results list, details pane.
  const _body = editor.windowManager.open({
    title: "Insert Component",
    body: {
      type: "panel",
      items: [
        {
          type: "input",
          name: "search",
          label: "Search",
          placeholder: "e.g., button, card, form",
        },
        {
          type: "listbox",
          name: "component",
          label: "Components",
          items: filteredComponents.map((c) => ({
            text: `${c.name} (${c.kind})`,
            value: c.name,
          })),
          size: 10,
        } as any,
      ],
    },
    buttons: [
      {
        text: "Insert",
        type: "submit",
        primary: true,
      },
      {
        text: "Cancel",
        type: "cancel",
      },
    ],
    onSubmit: (api: any) => {
      const data = api.getData() as { component: string };
      const selectedName = data.component;
      const component = components.find((c) => c.name === selectedName);

      if (component && component.examples.length > 0) {
        // Insert the first example.
        const html = component.examples[0];
        editor.insertContent(html);

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
