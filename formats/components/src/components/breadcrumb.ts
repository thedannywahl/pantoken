import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { breadcrumb as breadcrumbRaw } from "../generated/component-styles.ts";

export const breadcrumb = defineComponent({
  name: "breadcrumb",
  css: (p) => breadcrumbRaw.replaceAll(SENTINEL, p),
});
export const breadcrumbCss = breadcrumb.css;
