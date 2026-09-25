import { footerHtml } from "../../generated/layout-html.ts";
import type { PageLayout } from "../page-layout.ts";

/** Contact and support block for the bottom of a Canvas page. */
export const footer: PageLayout = {
  name: "footer",
  title: "{{footer.title}}",
  html: footerHtml,
};
