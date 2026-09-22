import type { PageLayout } from "./page-layout.ts";

/** Course syllabus with the sections students need before they begin. */
export const syllabus: PageLayout = {
  name: "syllabus",
  title: "{{syllabus.title}}",
  html: `<main id="syllabus" class="instui-view --padding-large">
  <h1 class="instui-heading">{{syllabus.heading}}</h1>
  <p class="instui-text">{{syllabus.intro}}</p>
  <h2 class="instui-heading">{{syllabus.outcomesHeading}}</h2>
  <ul class="instui-list">
    <li class="instui-list-item">{{syllabus.outcome1}}</li>
    <li class="instui-list-item">{{syllabus.outcome2}}</li>
    <li class="instui-list-item">{{syllabus.outcome3}}</li>
  </ul>
  <h2 class="instui-heading">{{syllabus.infoHeading}}</h2>
  <ul class="instui-list">
    <li class="instui-list-item"><strong>{{syllabus.scheduleLabel}}</strong> {{syllabus.schedulePlaceholder}}</li>
    <li class="instui-list-item"><strong>{{syllabus.gradingLabel}}</strong> {{syllabus.gradingPlaceholder}}</li>
    <li class="instui-list-item"><strong>{{syllabus.materialsLabel}}</strong> {{syllabus.materialsPlaceholder}}</li>
  </ul>
  <h2 class="instui-heading">{{syllabus.policiesHeading}}</h2>
  <p class="instui-text">{{syllabus.policiesText}}</p>
</main>
`,
};
