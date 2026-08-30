/**
 * Layout rules for the layouts plugin.
 *
 * @module
 */
export { wrapperRules, wrapperTemplate } from "./wrapper/wrapper.ts";
export { calloutRules, calloutTemplate } from "./callout/callout.ts";
export { heroRules, heroTemplate } from "./hero/hero.ts";
export { pageLayoutRules, pageLayoutTemplate } from "./page-layout/page-layout.ts";
export { rubricNoteRules, rubricNoteTemplate } from "./rubric-note/rubric-note.ts";
export { testimonialRules, testimonialTemplate } from "./testimonial/testimonial.ts";
export { twoColumnRules, twoColumnTemplate } from "./two-column/two-column.ts";

// HTML template utility
export {
  htmlTemplate,
  layoutMetadata,
  type LayoutMetadata,
  type LayoutPart,
  type LayoutSlot,
} from "../lib/html-template.ts";

// Slot placeholders and i18n utilities
export {
  extractSlotPlaceholders,
  extractSlotPlaceholdersWithContext,
  makeSlotI18nKey,
  parseSlotI18nKey,
  makeSlotI18nPayload,
  type SlotPlaceholder,
} from "../lib/extract-slot-placeholders.ts";
export {
  slotLabels,
  slotLabel,
  slotLabelsByLocale,
  registerSlotLabels,
  supportedLocales,
  type SlotLabelsMap,
} from "../lib/slot-labels.ts";

// Page layouts (simple HTML compositions, kept for backwards compatibility)
export { pageLayouts, type PageLayout } from "./pages/index.ts";
