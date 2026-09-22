import type { PageLayout } from "./page-layout.ts";

/** Contact and support block for the bottom of a Canvas page. */
export const footer: PageLayout = {
  name: "footer",
  title: "{{footer.title}}",
  html: `<footer id="footer" class="instui-view --padding-medium">
  <h2 class="instui-heading">{{footer.questionsHeading}}</h2>
  <p class="instui-text">{{footer.questionsText}}</p>
  <p class="instui-text"><a href="mailto:instructor@example.edu">{{footer.emailPlaceholder}}</a></p>
  <p class="instui-text">{{footer.courseInfoText}}</p>
</footer>
`,
};
