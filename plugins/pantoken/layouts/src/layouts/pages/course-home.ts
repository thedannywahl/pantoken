import type { PageLayout } from "./page-layout.ts";

/** Course landing page that orients students and points to the other starter blocks. */
export const courseHome: PageLayout = {
  name: "course-home",
  title: "Course home",
  html: `<main id="course-home" class="instui-view --padding-large">
  <h1 class="instui-heading">Welcome to the course</h1>
  <p class="instui-text">Give students a warm welcome and explain what they should do first.</p>
  <div class="instui-view --display-flex --gap-medium">
    <div class="instui-view -border-width-small --padding-medium">
      <h2 class="instui-heading">Start here</h2>
      <ol class="instui-list">
        <li class="instui-list-item"><a href="#header">Review the course header and navigation</a></li>
        <li class="instui-list-item"><a href="#syllabus">Read the syllabus</a></li>
        <li class="instui-list-item"><a href="#about-me">Meet your instructor</a></li>
        <li class="instui-list-item">Open the first module or activity.</li>
      </ol>
    </div>
    <div class="instui-view -border-width-small --padding-medium">
      <h2 class="instui-heading">This week</h2>
      <p class="instui-text">Add the current focus, important dates, readings, or actions students should see first.</p>
    </div>
  </div>
  <h2 class="instui-heading">Need help?</h2>
  <p class="instui-text">Point students to the <a href="#footer">course contact and support information</a>.</p>
</main>
`,
};
