import type { PageLayout } from "./page-layout.ts";

/** Two side-by-side content blocks for comparing or pairing related topics. */
export const twoColumn: PageLayout = {
  name: "two-column",
  title: "{{twoColumn.title}}",
  html: `<div class="instui-view --display-flex --gap-medium">
  <div class="instui-view">
    <h2 class="instui-heading">{{twoColumn.leftHeading}}</h2>
    <p class="instui-text">{{twoColumn.leftText}}</p>
  </div>
  <div class="instui-view">
    <h2 class="instui-heading">{{twoColumn.rightHeading}}</h2>
    <p class="instui-text">{{twoColumn.rightText}}</p>
  </div>
</div>
`,
};
