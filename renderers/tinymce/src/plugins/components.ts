/**
 * TinyMCE components picker plugin.
 * Provides a dialog for browsing and inserting pantoken components, utilities, and custom-components.
 *
 * \@module
 */
import type { Editor } from "tinymce";
import type { CdnFile } from "@pantoken/cdn";
import type { CssDocEntry } from "../cssdoc/model.js";
import { injectContentStylesheet } from "../content-css.js";

/**
 * Configuration options for the components picker plugin.
 */
export interface ComponentsPickerOptions {
  model: CssDocEntry[];
  currentAssets: CdnFile[];
  onMissingAsset?: (asset: CdnFile) => void;
}

/**
 * A component/utility record for display in the picker.
 */
export interface ComponentRecord {
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
  return (editor: Editor) => {
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

        // Track the asset and notify the callback.
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

      api.close();
    },
  });
}
