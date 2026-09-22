/**
 * Starter page layouts: plain compositions of existing components, no new CSS selectors.
 *
 * \@module
 */
export type { PageLayout } from "./page-layout.ts";
import type { PageLayout } from "./page-layout.ts";
import { renderPageLayout } from "../../lib/render-layout.ts";
export { renderPageLayout } from "../../lib/render-layout.ts";
import { aboutMe as aboutMeTemplate } from "./about-me.ts";
import { callout as calloutTemplate } from "./callout.ts";
import { courseHome as courseHomeTemplate } from "./course-home.ts";
import { footer as footerTemplate } from "./footer.ts";
import { header as headerTemplate } from "./header.ts";
import { hero as heroTemplate } from "./hero.ts";
import { rubricNote as rubricNoteTemplate } from "./rubric-note.ts";
import { testimonial as testimonialTemplate } from "./testimonial.ts";
import { twoColumn as twoColumnTemplate } from "./two-column.ts";
import { syllabus as syllabusTemplate } from "./syllabus.ts";

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

/** "About me" layout, English-rendered, for backward-compatible direct imports. */
export const aboutMe: PageLayout = renderPageLayout(aboutMeTemplate);
/** "Callout" layout, English-rendered, for backward-compatible direct imports. */
export const callout: PageLayout = renderPageLayout(calloutTemplate);
/** "Course home" layout, English-rendered, for backward-compatible direct imports. */
export const courseHome: PageLayout = renderPageLayout(courseHomeTemplate);
/** "Footer" layout, English-rendered, for backward-compatible direct imports. */
export const footer: PageLayout = renderPageLayout(footerTemplate);
/** "Header" layout, English-rendered, for backward-compatible direct imports. */
export const header: PageLayout = renderPageLayout(headerTemplate);
/** "Hero" layout, English-rendered, for backward-compatible direct imports. */
export const hero: PageLayout = renderPageLayout(heroTemplate);
/** "Rubric note" layout, English-rendered, for backward-compatible direct imports. */
export const rubricNote: PageLayout = renderPageLayout(rubricNoteTemplate);
/** "Syllabus" layout, English-rendered, for backward-compatible direct imports. */
export const syllabus: PageLayout = renderPageLayout(syllabusTemplate);
/** "Testimonial" layout, English-rendered, for backward-compatible direct imports. */
export const testimonial: PageLayout = renderPageLayout(testimonialTemplate);
/** "Two column" layout, English-rendered, for backward-compatible direct imports. */
export const twoColumn: PageLayout = renderPageLayout(twoColumnTemplate);

/** All bundled starter page layouts, English-rendered by default, sorted by title. */
export const pageLayouts: readonly PageLayout[] = [
  aboutMe,
  callout,
  courseHome,
  footer,
  header,
  hero,
  rubricNote,
  syllabus,
  testimonial,
  twoColumn,
].sort((a, b) => a.title.localeCompare(b.title));
