import type { PageLayout } from "./page-layout.ts";

/** Full-width intro banner: heading, supporting text, and a primary call-to-action. */
export const hero: PageLayout = {
  name: "hero",
  title: "Hero",
  html: `<div class="instui-view --padding-large --text-align-center">
  <h1 class="instui-heading">Welcome to the course</h1>
  <p class="instui-text">
    A short introduction goes here. Replace this text and the heading above.
  </p>
  <a class="instui-button -color-primary" href="#">Get started</a>
</div>
`,
};
