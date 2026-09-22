/**
 * \@pantoken/tinymce - TinyMCE integration for pantoken design system.
 * Exports: content-CSS wiring, templates plugin, three browse+insert pickers (components/icons/logos),
 * cssdoc model for grammar validation + autocomplete, and CodeMirror extensions (lint + autocomplete).
 *
 * \@module
 */

// Phase 1: content-CSS wiring.
export { injectContentStylesheet, pantokenContentCssUrls } from "./content-css.js";
export { PANTOKEN_ICON_PACK_NAME, registerPantokenIconPack } from "./icon-pack.js";
export { TINYMCE_STRINGS, type TinymceStrings } from "./strings.js";

// Phase 2: templates plugin.
export { createTemplatesPlugin, pageTemplates } from "./plugins/templates.js";

export {
  CONTENT_CLASSES_PLUGIN_NAME,
  createContentClassesPlugin,
  PANTOKEN_COMMANDS,
  type ContentClassesPluginOptions,
  type PantokenFontSize,
} from "./plugins/content-classes.js";

export {
  createPantokenPlugin,
  PANTOKEN_PLUGIN_NAME,
  PANTOKEN_TOOLBAR_NAME,
  type PantokenPluginOptions,
} from "./plugins/pantoken.js";

export {
  createFullscreenFooterPlugin,
  FULLSCREEN_FOOTER_PLUGIN_NAME,
  FULLSCREEN_FOOTER_STATUSBAR_NAME,
} from "./plugins/fullscreen-footer.js";

export {
  createSearchReplaceFooterPlugin,
  SEARCHREPLACE_FOOTER_PLUGIN_NAME,
  SEARCHREPLACE_FOOTER_STATUSBAR_NAME,
} from "./plugins/searchreplace-footer.js";

export {
  createVisualBlocksFooterPlugin,
  VISUALBLOCKS_FOOTER_PLUGIN_NAME,
  VISUALBLOCKS_FOOTER_STATUSBAR_NAME,
} from "./plugins/visualblocks-footer.js";

export {
  createSupSubPlugin,
  SUP_SUB_PLUGIN_NAME,
  SUP_SUB_TOOLBAR_NAME,
} from "./plugins/sup-sub.js";

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
export {
  buildIconMarkup,
  getIconCdnFile,
  humanizeIconName,
  loadAllIcons,
  PANTOKEN_ICONS_DATABASE_ID,
} from "./icons.js";
export type { LogoMeta, Product } from "./logos.js";
export { logos, products } from "./logos.js";

// Phase 3A/B/C: picker plugins.
export { createComponentsPlugin } from "./plugins/components.js";
export { createIconsPlugin } from "./plugins/icons.js";
export { createLogosPlugin } from "./plugins/logos.js";

// Phase 4/5: CodeMirror extensions.
export { pantokenHtmlLinter } from "./codemirror/lint.js";
export { pantokenHtmlCompletion } from "./codemirror/autocomplete.js";
