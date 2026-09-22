import type { PageLayout } from "./page-layout.ts";

/** Course identity and navigation block for the top of a Canvas page. */
export const header: PageLayout = {
  name: "header",
  title: "Header",
  html: `<header id="header" class="instui-view --padding-medium">
  <p class="instui-text">COURSE CODE · TERM</p>
  <h1 class="instui-heading">Course title</h1>
  <p class="instui-text">A short description of the course or page goes here.</p>
  <nav aria-label="Course navigation">
    <a class="instui-button -color-secondary" href="#course-home">Home</a>
    <a class="instui-button -color-secondary" href="#syllabus">Syllabus</a>
    <a class="instui-button -color-secondary" href="#about-me">About the instructor</a>
  </nav>
</header>
`,
};
