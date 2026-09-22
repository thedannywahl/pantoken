import type { PageLayout } from "./page-layout.ts";

/** Instructor profile with communication guidance and office-hour details. */
export const aboutMe: PageLayout = {
  name: "about-me",
  title: "About me",
  html: `<main id="about-me" class="instui-view --padding-large">
  <img class="instui-img" data-pantoken-image-placeholder="instructor-photo" width="240" height="240">
  <h1 class="instui-heading">About your instructor</h1>
  <p class="instui-text">Share a brief introduction, your role, and what you hope students take away from this course.</p>
  <h2 class="instui-heading">How to reach me</h2>
  <ul class="instui-list">
    <li class="instui-list-item"><strong>Email:</strong> instructor@example.edu</li>
    <li class="instui-list-item"><strong>Office:</strong> Add your office location or virtual meeting link.</li>
    <li class="instui-list-item"><strong>Response time:</strong> Add when students can expect a reply.</li>
  </ul>
  <h2 class="instui-heading">Office hours</h2>
  <p class="instui-text">Add your recurring office hours and explain how students can meet with you.</p>
</main>
`,
  imagePlaceholders: [
    {
      key: "instructor-photo",
      width: 240,
      height: 240,
      altText: "A photo of the instructor",
    },
  ],
};
