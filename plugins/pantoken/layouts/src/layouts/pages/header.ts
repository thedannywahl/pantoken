import type { PageLayout } from "./page-layout.ts";

/** Course identity and navigation block for the top of a Canvas page. */
export const header: PageLayout = {
  name: "header",
  title: "{{header.title}}",
  html: `<header id="header" class="instui-view --padding-medium">
  <p class="instui-text">{{header.courseCodeTerm}}</p>
  <h1 class="instui-heading">{{header.courseTitle}}</h1>
  <p class="instui-text">{{header.description}}</p>
  <nav aria-label="Course navigation">
    <a class="instui-button -color-secondary" href="#course-home">{{header.navHome}}</a>
    <a class="instui-button -color-secondary" href="#syllabus">{{header.navSyllabus}}</a>
    <a class="instui-button -color-secondary" href="#about-me">{{header.navAboutInstructor}}</a>
  </nav>
</header>
`,
};
