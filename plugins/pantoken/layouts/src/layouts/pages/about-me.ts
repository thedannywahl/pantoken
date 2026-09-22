import type { PageLayout } from "./page-layout.ts";

/** Instructor profile with communication guidance and office-hour details. */
export const aboutMe: PageLayout = {
  name: "about-me",
  title: "{{aboutMe.title}}",
  html: `<main id="about-me" class="instui-view --padding-large">
  <img class="instui-img" data-pantoken-image-placeholder="instructor-photo" width="240" height="240">
  <h1 class="instui-heading">{{aboutMe.heading}}</h1>
  <p class="instui-text">{{aboutMe.intro}}</p>
  <h2 class="instui-heading">{{aboutMe.reachHeading}}</h2>
  <ul class="instui-list">
    <li class="instui-list-item"><strong>{{aboutMe.emailLabel}}</strong> {{aboutMe.emailPlaceholder}}</li>
    <li class="instui-list-item"><strong>{{aboutMe.officeLabel}}</strong> {{aboutMe.officePlaceholder}}</li>
    <li class="instui-list-item"><strong>{{aboutMe.responseLabel}}</strong> {{aboutMe.responsePlaceholder}}</li>
  </ul>
  <h2 class="instui-heading">{{aboutMe.officeHoursHeading}}</h2>
  <p class="instui-text">{{aboutMe.officeHoursText}}</p>
</main>
`,
  imagePlaceholders: [
    {
      key: "instructor-photo",
      width: 240,
      height: 240,
      altText: "{{aboutMe.instructorPhotoAlt}}",
    },
  ],
};
