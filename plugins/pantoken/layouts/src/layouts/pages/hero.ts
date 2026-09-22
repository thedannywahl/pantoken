import type { PageLayout } from "./page-layout.ts";

/** Full-width intro banner: heading, supporting text, and a primary call-to-action. */
export const hero: PageLayout = {
  name: "hero",
  title: "{{hero.title}}",
  html: `<div class="instui-view --padding-large --text-align-center">
  <h1 class="instui-heading">{{hero.heading}}</h1>
  <p class="instui-text">
    {{hero.intro}}
  </p>
  <a class="instui-button -color-primary" href="#">{{hero.cta}}</a>
</div>
`,
};
