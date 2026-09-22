import type { PageLayout } from "./page-layout.ts";

/** Course syllabus with the sections students need before they begin. */
export const syllabus: PageLayout = {
  name: "syllabus",
  title: "Syllabus",
  html: `<main id="syllabus" class="instui-view --padding-large">
  <h1 class="instui-heading">Course syllabus</h1>
  <p class="instui-text">Add a concise overview of the course, who it is for, and what students will learn.</p>
  <h2 class="instui-heading">Learning outcomes</h2>
  <ul class="instui-list">
    <li class="instui-list-item">Describe the first outcome.</li>
    <li class="instui-list-item">Apply the second outcome.</li>
    <li class="instui-list-item">Create or demonstrate the third outcome.</li>
  </ul>
  <h2 class="instui-heading">Course information</h2>
  <ul class="instui-list">
    <li class="instui-list-item"><strong>Schedule:</strong> Add meeting times or the course rhythm.</li>
    <li class="instui-list-item"><strong>Grading:</strong> Add grading categories and weights.</li>
    <li class="instui-list-item"><strong>Materials:</strong> Add required books, tools, or access notes.</li>
  </ul>
  <h2 class="instui-heading">Policies and support</h2>
  <p class="instui-text">Add attendance, late work, accessibility, academic integrity, and support information here.</p>
</main>
`,
};
