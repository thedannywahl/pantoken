import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { breadcrumbLink as breadcrumbLinkRaw } from "../../../../generated/component-styles.ts";

/** The `breadcrumb.link` member record: a crumb (InstUI `Breadcrumb.Link`). */
export const breadcrumbLink: Definition = defineComponent({
  name: "breadcrumb.link",
  css: (p) => breadcrumbLinkRaw.replaceAll(SENTINEL, p),
});
/** Standalone `breadcrumb.link` stylesheet. */
export const breadcrumbLinkCss: Definition["css"] = breadcrumbLink.css;
