/**
 * \@pantoken/tinymce - TinyMCE integration for pantoken design system.
 * Exports: content-CSS wiring, templates plugin, three browse+insert pickers (components/icons/logos),
 * cssdoc model for grammar validation + autocomplete, and CodeMirror extensions (lint + autocomplete).
 *
 * \@module
 */

// Phase 1: content-CSS wiring.
export { injectContentStylesheet, pantokenContentCssUrls } from "./content-css.js";

// Phase 2: templates plugin.
export { createTemplatesPlugin } from "./plugins/templates.js";

// Layouts: starter page layouts sourced from @pantoken/plugin-layouts, alongside Components/Icons/Logos.
export { type PageLayout, pageLayouts } from "./layouts.js";
export {
  createLayoutsPlugin,
  LAYOUTS_PLUGIN_NAME,
  LAYOUTS_TOOLBAR_NAME,
  type LayoutsPluginOptions,
} from "./plugins/layouts.js";

// Phase 3 prerequisites: data modules.
export type { TaggedIcon } from "./icons.js";
export {
  findEntry,
  getModifierSuggestions,
  listComponents,
  listUtilities,
  validateClassToken,
  type CssDocEntry,
} from "./cssdoc/model.js";
export { getIconCdnFile, loadAllIcons } from "./icons.js";
export type { LogoMeta, Product } from "./logos.js";
export { logos, products } from "./logos.js";

// Phase 3A/B/C: picker plugins.
export { createComponentsPlugin } from "./plugins/components.js";
export { createIconsPlugin } from "./plugins/icons.js";
export { createLogosPlugin } from "./plugins/logos.js";

// Phase 4/5: CodeMirror extensions.
export { pantokenHtmlLinter } from "./codemirror/lint.js";
export { pantokenHtmlCompletion } from "./codemirror/autocomplete.js";
