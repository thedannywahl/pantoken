import type { PageLayout } from "./page-layout.ts";

/** Centered pull-quote attributed to a student or alum. */
export const testimonial: PageLayout = {
  name: "testimonial",
  title: "Testimonial",
  html: `<blockquote class="instui-view --padding-medium --text-align-center">
  <p class="instui-text -style-italic">"Replace this with a quote from a student or alum."</p>
  <p class="instui-text -color-secondary">— Name, Program</p>
</blockquote>
`,
};
