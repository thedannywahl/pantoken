/**
 * Emit `generated/layouts.css` — all layout CSS with the `pfx-` sentinel replaced by `instui-`.
 * Each layout's cssdoc `@layout` doc comment ships as part of its `.css` file; the `*Rules("instui-")`
 * functions produce the full sheets (comment + rules) ready for the docs parser and the published stylesheet.
 *
 * Run after `scripts/component-styles.ts` (which generates `src/generated/component-styles.ts`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { wrapperRules } from "../src/layouts/wrapper/wrapper.ts";
import { calloutRules } from "../src/layouts/callout/callout.ts";
import { heroRules } from "../src/layouts/hero/hero.ts";
import { pageLayoutRules } from "../src/layouts/page-layout/page-layout.ts";
import { rubricNoteRules } from "../src/layouts/rubric-note/rubric-note.ts";
import { testimonialRules } from "../src/layouts/testimonial/testimonial.ts";
import { twoColumnRules } from "../src/layouts/two-column/two-column.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

const allLayoutsCss = [
  wrapperRules("instui-"),
  calloutRules("instui-"),
  heroRules("instui-"),
  pageLayoutRules("instui-"),
  rubricNoteRules("instui-"),
  testimonialRules("instui-"),
  twoColumnRules("instui-"),
].join("\n\n");

writeFileSync(join(outDir, "layouts.css"), `${allLayoutsCss}\n`);
console.log(`✓ layouts: wrote layouts.css`);
