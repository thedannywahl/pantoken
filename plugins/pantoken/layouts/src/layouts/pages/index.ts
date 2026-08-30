/**
 * Starter page layouts: plain compositions of existing components, no new CSS selectors.
 *
 * @module
 */
export type { PageLayout } from "./page-layout.ts";
import type { PageLayout } from "./page-layout.ts";
import { callout } from "./callout.ts";
import { hero } from "./hero.ts";
import { rubricNote } from "./rubric-note.ts";
import { testimonial } from "./testimonial.ts";
import { twoColumn } from "./two-column.ts";
export { callout, hero, rubricNote, testimonial, twoColumn };

/** All bundled starter page layouts, sorted by title. */
export const pageLayouts: readonly PageLayout[] = [
  callout,
  hero,
  rubricNote,
  testimonial,
  twoColumn,
].sort((a, b) => a.title.localeCompare(b.title));
