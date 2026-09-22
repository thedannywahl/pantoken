import type { PageLayout } from "./page-layout.ts";

/** Inline info alert for a short reminder or note. */
export const callout: PageLayout = {
  name: "callout",
  title: "{{callout.title}}",
  html: `<div class="instui-alert -color-info">
  <p class="instui-text">
    <strong>{{callout.noteLabel}}</strong> {{callout.noteText}}
  </p>
</div>
`,
};
