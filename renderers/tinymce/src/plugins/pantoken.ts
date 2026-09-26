/**
 * TinyMCE pantoken meta plugin. Composes the five content plugins behind one toolbar menu button.
 *
 * \@module
 */
import type { Editor, Ui } from "tinymce";
import {
  COMPONENTS_COMMAND,
  createComponentsPlugin,
  type ComponentsPickerOptions,
} from "./components.js";
import { createIconsPlugin, ICONS_COMMAND, type IconsPickerOptions } from "./icons.js";
import { createLayoutsPlugin, LAYOUTS_COMMAND, type LayoutsPluginOptions } from "./layouts.js";
import { createLogosPlugin, LOGOS_COMMAND, type LogosPickerOptions } from "./logos.js";
import {
  createTemplatesPlugin,
  TEMPLATES_COMMAND,
  type TemplatesPluginOptions,
} from "./templates.js";
import { getEditorStrings, setEditorStrings, type TinymceStrings } from "../strings.js";

/** Plugin name to pass in TinyMCE's `plugins` init option. */
export const PANTOKEN_PLUGIN_NAME = "pantoken";
/** Toolbar menu-button name to pass in TinyMCE's `toolbar` init option. */
export const PANTOKEN_TOOLBAR_NAME = "pantoken";

/** Pantoken's own logomark, reused for the toolbar menu button and any host UI that wants it. */
export const PANTOKEN_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><svg x="4" y="4" width="16" height="16" viewBox="101.782 121.756 123.284 123.284"><path d="M222 386V589H331C400 589 442 550 442 487C442 426 400 386 331 386ZM348 267C488 267 581 359 581 488C581 616 488 709 348 709H83V0H221V267Z" transform="translate(100 238) scale(.156 -.156)"/><circle cx="200" cy="225.5" r="13.9"/></svg></svg>';

/** Configuration for the content plugins composed by {@link createPantokenPlugin}. */
export interface PantokenPluginOptions {
  /** Translated UI strings for this editor; unspecified strings remain English. */
  strings?: Partial<TinymceStrings>;
  components: ComponentsPickerOptions;
  icons: IconsPickerOptions;
  logos: LogosPickerOptions;
  layouts?: LayoutsPluginOptions;
  templates?: TemplatesPluginOptions;
}

/** Build a single pantoken toolbar menu that opens each composed plugin. */
export function createPantokenPlugin(options: PantokenPluginOptions) {
  return function pantokenPlugin(editor: Editor) {
    setEditorStrings(editor, options.strings ?? {});
    createComponentsPlugin({ ...options.components, registerUi: false })(editor);
    createIconsPlugin({ ...options.icons, registerUi: false })(editor);
    createLogosPlugin({ ...options.logos, registerUi: false })(editor);
    createLayoutsPlugin({ ...options.layouts, registerUi: false })(editor);
    if (options.templates) {
      createTemplatesPlugin({ ...options.templates, registerUi: false })(editor);
    }

    editor.ui.registry.addIcon(PANTOKEN_TOOLBAR_NAME, PANTOKEN_ICON);
    editor.ui.registry.addMenuButton(PANTOKEN_TOOLBAR_NAME, {
      icon: PANTOKEN_TOOLBAR_NAME,
      tooltip: "Pantoken",
      fetch: (success): void => {
        const items: Ui.Menu.MenuItemSpec[] = [
          {
            type: "menuitem",
            text: getEditorStrings(editor).componentsToolbarText,
            onAction: () => editor.execCommand(COMPONENTS_COMMAND),
          },
          {
            type: "menuitem",
            text: getEditorStrings(editor).iconsToolbarText,
            onAction: () => editor.execCommand(ICONS_COMMAND),
          },
          {
            type: "menuitem",
            text: getEditorStrings(editor).logosToolbarText,
            onAction: () => editor.execCommand(LOGOS_COMMAND),
          },
          {
            type: "menuitem",
            text: getEditorStrings(editor).layoutsToolbarText,
            onAction: () => editor.execCommand(LAYOUTS_COMMAND),
          },
        ];
        if (options.templates) {
          items.push({
            type: "menuitem",
            text: getEditorStrings(editor).templatesToolbarText,
            onAction: () => editor.execCommand(TEMPLATES_COMMAND),
          });
        }
        success(items);
      },
    });

    return {};
  };
}
