import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { paginationPage as paginationPageRaw } from "../../../../generated/component-styles.ts";

/** The `pagination.page` member record: a page link or button (InstUI `Pagination.Page`). */
export const paginationPage: Definition = defineComponent({
  name: "pagination.page",
  css: (p) => paginationPageRaw.replaceAll(SENTINEL, p),
});
/** Standalone `pagination.page` stylesheet. */
export const paginationPageCss: Definition["css"] = paginationPage.css;
