import type { PageLayout } from "./page-layout.ts";

/** Bordered note explaining grading criteria, meant to sit above a rubric. */
export const rubricNote: PageLayout = {
  name: "rubric-note",
  title: "Rubric note",
  html: `<div class="instui-view -border-width-small --padding-medium">
  <h2 class="instui-heading">Grading note</h2>
  <p class="instui-text">Explain how this assignment is graded, referencing the rubric below.</p>
</div>
`,
};
