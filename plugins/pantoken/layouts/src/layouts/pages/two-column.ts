import type { PageLayout } from "./page-layout.ts";

/** Two side-by-side content blocks for comparing or pairing related topics. */
export const twoColumn: PageLayout = {
  name: "two-column",
  title: "Two column",
  html: `<div class="instui-view --display-flex --gap-medium">
  <div class="instui-view">
    <h2 class="instui-heading">Left column</h2>
    <p class="instui-text">Describe the first topic here.</p>
  </div>
  <div class="instui-view">
    <h2 class="instui-heading">Right column</h2>
    <p class="instui-text">Describe the second topic here.</p>
  </div>
</div>
`,
};
