import { aboutMeHtml } from "../../generated/layout-html.ts";
import type { PageLayout } from "../page-layout.ts";

/** Instructor profile with communication guidance and office-hour details. */
export const aboutMe: PageLayout = {
  name: "about-me",
  title: "{{aboutMe.title}}",
  html: aboutMeHtml,
  imagePlaceholders: [
    {
      key: "instructor-photo",
      width: 240,
      height: 240,
      altText: "{{aboutMe.instructorPhotoAlt}}",
    },
  ],
};
