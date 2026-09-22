import type { PageLayout } from "./page-layout.ts";

/** Centered pull-quote attributed to a student or alum. */
export const testimonial: PageLayout = {
  name: "testimonial",
  title: "{{testimonial.title}}",
  html: `<blockquote class="instui-view --padding-medium --text-align-center">
  <p class="instui-text -style-italic">{{testimonial.quote}}</p>
  <p class="instui-text -color-secondary">{{testimonial.attribution}}</p>
</blockquote>
`,
};
