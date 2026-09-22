/**
 * Starter page layouts: plain compositions of existing components, no new CSS selectors.
 *
 * @module
 */
export type { PageLayout } from "./page-layout.ts";
import type { PageLayout } from "./page-layout.ts";
import { aboutMe } from "./about-me.ts";
import { callout } from "./callout.ts";
import { courseHome } from "./course-home.ts";
import { footer } from "./footer.ts";
import { header } from "./header.ts";
import { hero } from "./hero.ts";
import { rubricNote } from "./rubric-note.ts";
import { testimonial } from "./testimonial.ts";
import { twoColumn } from "./two-column.ts";
import { syllabus } from "./syllabus.ts";
export {
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
};

/** All bundled starter page layouts, sorted by title. */
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
