import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { COMPONENTS } from "../../src/components/index.ts";
import { collectExamples } from "../../scripts/audit-accessibility.ts";

test.each([
  ["modal", 9],
  ["modal.header", 3],
  ["modal.body", 4],
  ["modal.footer", 3],
  ["tray", 8],
  ["mask", 3],
  ["popover", 4],
] as const)("%s isolates its %i overlay variants", (name, count) => {
  const record = COMPONENTS.find((candidate) => candidate.name === name)!;
  const examples = collectExamples(parseCssDocs(record.rules("instui-")), [name]);
  expect(examples).toHaveLength(count);
  const ids = new Set<string>();
  for (const example of examples) {
    expect(example.html).not.toMatch(/<!--|\\3c\s*!|!--/u);
    const window = new Window();
    try {
      const { document } = window;
      document.body.innerHTML = example.html;
      const selector = name.startsWith("modal") ? "dialog.instui-modal" : `.instui-${name}`;
      const surfaces = document.querySelectorAll(selector);
      expect(surfaces).toHaveLength(1);
      const surface = surfaces[0]!;
      expect(surface.getAttribute("style") ?? "").not.toMatch(
        /(?:^|;)\s*(?:position|inset|width|height|min-block-size)\s*:/u,
      );
      if (name.startsWith("modal")) {
        expect(surface.hasAttribute("open")).toBe(false);
        expect(surface.hasAttribute("data-a11y-root")).toBe(true);
        expect(surface.id).toBeTruthy();
        expect(ids.has(surface.id)).toBe(false);
        ids.add(surface.id);
        const trigger = document.querySelector('[data-a11y-trigger][command="--show"]')!;
        expect(trigger.getAttribute("commandfor")).toBe(surface.id);
        expect(surface.querySelector('[command="--close"]')?.getAttribute("commandfor")).toBe(
          surface.id,
        );
        expect(surface.hasAttribute("aria-label") || surface.hasAttribute("aria-labelledby")).toBe(
          true,
        );
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
});
