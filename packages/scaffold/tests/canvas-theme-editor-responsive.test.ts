import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { scaffoldProject } from "../src/index.ts";

test("canvas theme editor shell adapts at the canonical responsive breakpoints", async () => {
  const target = join(mkdtempSync(join(tmpdir(), "pantoken-scaffold-responsive-")), "app");
  await scaffoldProject("canvas-theme-editor", target);
  const main = readFileSync(join(target, "src/main.ts"), "utf8");
  const css = readFileSync(join(target, "src/app.css"), "utf8");

  expect(main).toContain(
    'brandText.className = "canvas-rce-shell__brand-text instui-hidden-max-sm"',
  );
  expect(main.match(/canvas-rce-shell__label instui-hidden-max-md/g)).toHaveLength(2);
  expect(main).toContain('localeSummary.setAttribute("aria-label", localeText)');
  expect(main).toContain('themeSummary.setAttribute("aria-label", activeStrings.themeLabel)');
  expect(css).toMatch(
    /@media \(max-width: 64em\)\s*{\s*body\.canvas-rce-shell-enabled #app\s*{\s*padding: 1rem 1\.5rem 1\.5rem;/,
  );
  expect(css).toMatch(
    /@media \(max-width: 48em\)\s*{\s*\.canvas-rce-shell__brand strong\s*{\s*font-size: 0\.8rem;/,
  );
});
