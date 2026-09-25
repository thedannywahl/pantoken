import { headerHtml } from "../../generated/layout-html.ts";
import type { PageLayout } from "../page-layout.ts";

/** Course identity and navigation block for the top of a Canvas page. */
export const header: PageLayout = {
  name: "header",
  title: "{{header.title}}",
  html: headerHtml,
};
