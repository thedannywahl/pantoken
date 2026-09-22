import type { PageLayout } from "./page-layout.ts";

/** Bordered note explaining grading criteria, meant to sit above a rubric. */
export const rubricNote: PageLayout = {
  name: "rubric-note",
  title: "{{rubricNote.title}}",
  html: `<div class="instui-view -border-width-small --padding-medium">
  <h2 class="instui-heading">{{rubricNote.heading}}</h2>
  <p class="instui-text">{{rubricNote.text}}</p>
</div>
`,
};
