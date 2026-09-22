import type { PageLayout } from "./page-layout.ts";

/** Contact and support block for the bottom of a Canvas page. */
export const footer: PageLayout = {
  name: "footer",
  title: "Footer",
  html: `<footer id="footer" class="instui-view --padding-medium">
  <h2 class="instui-heading">Questions or need help?</h2>
  <p class="instui-text">Add office hours, contact details, support links, or accessibility information here.</p>
  <p class="instui-text"><a href="mailto:instructor@example.edu">instructor@example.edu</a></p>
  <p class="instui-text">Course code · Term · Department</p>
</footer>
`,
};
