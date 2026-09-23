import { courseHomeHtml } from "../../generated/layout-html.ts";
import type { PageLayout } from "../page-layout.ts";

/** Course landing page that orients students and points to the other starter blocks. */
export const courseHome: PageLayout = {
  name: "course-home",
  title: "{{courseHome.title}}",
  html: courseHomeHtml,
};
