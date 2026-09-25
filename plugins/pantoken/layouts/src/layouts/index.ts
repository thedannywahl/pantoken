/**
 * Layout rules for the layouts plugin.
 *
 * @module
 */
export { wrapperRules, wrapperTemplate } from "./wrapper/wrapper.ts";
export { calloutRules, calloutTemplate, calloutLayout } from "./callout/callout.ts";
export { heroRules, heroTemplate, heroLayout } from "./hero/hero.ts";
export { pageLayoutRules, pageLayoutTemplate } from "./page-layout/page-layout.ts";
export {
  rubricNoteRules,
  rubricNoteTemplate,
  rubricNoteLayout,
} from "./rubric-note/rubric-note.ts";
export {
  testimonialRules,
  testimonialTemplate,
  testimonialLayout,
} from "./testimonial/testimonial.ts";
export { twoColumnRules, twoColumnTemplate, twoColumnLayout } from "./two-column/two-column.ts";
export type { PageLayout, PageLayoutImagePlaceholder } from "./page-layout.ts";

import type { PageLayout } from "./page-layout.ts";
import { renderPageLayout } from "../lib/render-layout.ts";
export { renderPageLayout } from "../lib/render-layout.ts";
import { aboutMe as aboutMeTemplate } from "./about-me/about-me.ts";
import { calloutLayout as calloutTemplate } from "./callout/callout.ts";
import { courseHome as courseHomeTemplate } from "./course-home/course-home.ts";
import { footer as footerTemplate } from "./footer/footer.ts";
import { header as headerTemplate } from "./header/header.ts";
import { heroLayout as heroTemplate } from "./hero/hero.ts";
import { rubricNoteLayout as rubricNoteTemplate } from "./rubric-note/rubric-note.ts";
import { syllabus as syllabusTemplate } from "./syllabus/syllabus.ts";
import { testimonialLayout as testimonialTemplate } from "./testimonial/testimonial.ts";
import { twoColumnLayout as twoColumnTemplate } from "./two-column/two-column.ts";

/** `{{key}}`-templated layouts, unresolved — pass to {@link renderPageLayout} for another locale. */
export const pageLayoutTemplates: readonly PageLayout[] = [
  aboutMeTemplate,
  calloutTemplate,
  courseHomeTemplate,
  footerTemplate,
  headerTemplate,
  heroTemplate,
  rubricNoteTemplate,
  syllabusTemplate,
  testimonialTemplate,
  twoColumnTemplate,
];

const renderedPageLayouts: readonly PageLayout[] = pageLayoutTemplates.map((layout) =>
  renderPageLayout(layout),
);

/** All bundled starter page layouts, English-rendered by default, sorted by title. */
export const pageLayouts: readonly PageLayout[] = [...renderedPageLayouts].sort((a, b) =>
  a.title.localeCompare(b.title),
);

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
