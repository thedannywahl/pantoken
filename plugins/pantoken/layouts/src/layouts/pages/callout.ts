import type { PageLayout } from "./page-layout.ts";

/** Inline info alert for a short reminder or note. */
export const callout: PageLayout = {
  name: "callout",
  title: "Callout",
  html: `<div class="instui-alert -color-info">
  <p class="instui-text">
    <strong>Note:</strong> Replace this callout with an important reminder for students.
  </p>
</div>
`,
};
