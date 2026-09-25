import { syllabusHtml } from "../../generated/layout-html.ts";
import type { PageLayout } from "../page-layout.ts";

/** Course syllabus with the sections students need before they begin. */
export const syllabus: PageLayout = {
  name: "syllabus",
  title: "{{syllabus.title}}",
  html: syllabusHtml,
};
