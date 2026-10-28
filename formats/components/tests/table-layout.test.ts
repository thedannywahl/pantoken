import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { exampleHtml } from "../scripts/audit-accessibility.ts";
import { breakpointEm } from "../src/lib/breakpoints.ts";
import { withResponsiveTableLayout } from "../src/lib/table-layout.ts";
import {
  tableCss,
  tableHeadCss,
  tableBodyCss,
  tableRowCss,
  tableCellCss,
  tableRowHeaderCss,
  tableColHeaderCss,
} from "../src/index.ts";

test("breakpoint query values come from the canonical IR", () => {
  for (const name of ["sm", "md", "lg", "xl"]) {
    const token = `--instui-breakpoints-${name}`;
    expect(breakpointEm(token)).toBe(tokens.find((entry) => entry.name === token)?.value);
  }
});

test("invalid breakpoint sources fail explicitly", () => {
  expect(() => breakpointEm("--missing-breakpoint")).toThrow("missing or non-em token");
  expect(() => breakpointEm("--instui-color-text-body")).toThrow("missing or non-em token");
});

test("responsive table styles preserve explicit stacked rules and arbitrary prefixes", () => {
  const width = breakpointEm("--instui-breakpoints-md");
  for (const render of [
    tableCss,
    tableHeadCss,
    tableBodyCss,
    tableRowCss,
    tableCellCss,
    tableRowHeaderCss,
  ]) {
    for (const prefix of ["course", "Course", "_course", "-course", ""]) {
      const css = render({ prefix });
      expect(css).toContain(".-layout-stacked");
      expect(css).toContain(".-layout-responsive");
      expect(css).toContain(`@container (width < ${width})`);
      expect(css).not.toContain(".instui-table");
    }
  }
});

test("a scoped responsive root retains scope proximity", () => {
  const css = withResponsiveTableLayout(
    "@scope (.course-table) {\n&.-layout-stacked { display: block; width: auto; }\n}",
  );
  expect(css).toMatch(
    /@container[^{}]*\{\s*&\.-layout-responsive \{ display: block; width: auto; \}\s*\}\s*\}\s*$/,
  );
});

test("member clones preserve labels and declaration bodies without comment fragments", () => {
  const css = withResponsiveTableLayout(
    "/* Label {example}. */\n.course-table.-layout-stacked td[data-label]::before { content: attr(data-label); display: block; }",
  );
  const query = css.slice(css.indexOf("@container"));
  expect(query).toContain("@scope (.course-table.-layout-responsive) to (.course-table)");
  expect(query).toContain(":scope td[data-label]::before");
  expect(query).toContain("content: attr(data-label); display: block;");
  expect(query).not.toContain("example");
});

test("unrelated styles and negative modifier tests aren't cloned", () => {
  const css = ".course-table:not(.-layout-stacked) { display: table; }";
  expect(withResponsiveTableLayout(css)).toBe(css);
});

test("every table example preserves native headers in a named keyboard-scrollable region", () => {
  for (const render of [
    tableCss,
    tableHeadCss,
    tableBodyCss,
    tableRowCss,
    tableCellCss,
    tableRowHeaderCss,
    tableColHeaderCss,
  ]) {
    const [record] = parseCssDocs(render({ prefix: "instui" }));
    expect(record.examples.length).toBeGreaterThan(0);
    for (const example of record.examples) {
      const window = new Window();
      try {
        const { document } = window;
        document.body.innerHTML = exampleHtml(example);
        const region = document.querySelector('[role="region"][tabindex="0"]')!;
        expect(region.classList.contains("--overflow-x-auto")).toBe(true);
        expect(region.classList.contains("-without-focus-animation")).toBe(true);
        const table = region.querySelector("table")!;
        expect(table.caption?.id).toBe(region.getAttribute("aria-labelledby"));
        expect(table.caption?.textContent?.trim()).toBeTruthy();
        const headings = table.querySelectorAll('thead th[scope="col"]');
        expect(headings.length).toBeGreaterThanOrEqual(3);
        expect(table.querySelectorAll("tbody td")).toHaveLength(9);
        for (const row of table.querySelectorAll("tbody tr"))
          expect(row.children).toHaveLength(headings.length);
        const responsive = document.querySelector(".instui-table.-layout-responsive");
        if (responsive) {
          expect(responsive.parentElement?.classList.contains("instui-container")).toBe(true);
          const headings = [...responsive.querySelectorAll('thead th[scope="col"]')].map((cell) =>
            cell.textContent?.trim(),
          );
          for (const row of responsive.querySelectorAll("tbody tr"))
            expect([...row.children].map((cell) => cell.getAttribute("data-label"))).toEqual(
              headings,
            );
        }
      } finally {
        void window.happyDOM.abort();
      }
    }
  }
});
