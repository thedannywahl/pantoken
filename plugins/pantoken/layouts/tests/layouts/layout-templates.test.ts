import { expect, test } from "vite-plus/test";
import { SENTINEL } from "../../src/lib/sentinel.ts";
import { pageLayoutRules, pageLayoutTemplate } from "../../src/layouts/page-layout/page-layout.ts";
import { rubricNoteRules, rubricNoteTemplate } from "../../src/layouts/rubric-note/rubric-note.ts";
import {
  testimonialRules,
  testimonialTemplate,
} from "../../src/layouts/testimonial/testimonial.ts";
import { twoColumnRules, twoColumnTemplate } from "../../src/layouts/two-column/two-column.ts";
import { wrapperTemplate } from "../../src/layouts/wrapper/wrapper.ts";

const cases = [
  { name: "page-layout", rules: pageLayoutRules, template: pageLayoutTemplate, cls: "page-layout" },
  { name: "rubric-note", rules: rubricNoteRules, template: rubricNoteTemplate, cls: "rubric-note" },
  {
    name: "testimonial",
    rules: testimonialRules,
    template: testimonialTemplate,
    cls: "testimonial",
  },
  { name: "two-column", rules: twoColumnRules, template: twoColumnTemplate, cls: "two-column" },
];

for (const { name, rules, template, cls } of cases) {
  test(`${name}Rules defaults to the instui- prefix and consumes the sentinel`, () => {
    const css = rules();
    expect(css).toContain(`instui-${cls}`);
    expect(css).not.toContain(SENTINEL);
  });

  test(`${name}Rules supports a custom prefix`, () => {
    expect(rules("my-")).toContain(`my-${cls}`);
  });

  test(`${name}Template renders an HTML template referencing the layout`, () => {
    const html = template();
    expect(html).toContain(`<!-- Layout: ${name} -->`);
    expect(html).toContain(`instui-`);
  });
}

test("wrapperTemplate renders an HTML template for the wrapper layout", () => {
  const html = wrapperTemplate();
  expect(html).toContain("<!-- Layout: wrapper -->");
  expect(html).toContain("<body");
});
