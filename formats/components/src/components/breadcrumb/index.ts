import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { breadcrumb as breadcrumbRaw } from "../../generated/component-styles.ts";

/** The `breadcrumb` component record: a navigation trail with `/` separators, ending on the current page. */
export const breadcrumb: Definition = defineComponent({
  name: "breadcrumb",
  css: (p) => breadcrumbRaw.replaceAll(SENTINEL, p),
});
/** Standalone `breadcrumb` stylesheet — the prefixed CSS for the breadcrumb trail, ready to ship as a `.css` file. */
export const breadcrumbCss: Definition["css"] = breadcrumb.css;
