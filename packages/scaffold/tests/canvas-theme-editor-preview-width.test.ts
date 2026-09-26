import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { scaffoldProject } from "../src/index.ts";

test("canvas theme editor supports measured presets and custom pixel widths", async () => {
  const target = join(mkdtempSync(join(tmpdir(), "pantoken-scaffold-preview-width-")), "app");
  await scaffoldProject("canvas-theme-editor", target);
  const html = readFileSync(join(target, "src/app.html"), "utf8");
  const main = readFileSync(join(target, "src/main.ts"), "utf8");
  const preferences = readFileSync(join(target, "src/preferences.ts"), "utf8");
  const pkg = readFileSync(join(target, "package.json"), "utf8");

  expect(html).toContain('id="preview-width-value"');
  expect(html).toContain('class="instui-in-place-edit preview-width-value"');
  expect(html).toContain('data-input-type="number"');
  expect(html).not.toContain("data-validation");
  expect(html).not.toContain("data-live");
  expect(main).toContain(
    "const previewWidthObserver = new ResizeObserver(() => updatePreviewWidthValue())",
  );
  expect(main).toContain("Math.round(previewFrame.getBoundingClientRect().width)");
  expect(main).toContain("selectedPreviewWidth = width;");
  expect(main).toContain("if (!/^[1-9]\\d*$/u.test(value)) return undefined;");
  expect(main).toContain("updatePreviewWidthValue(true);");
  expect(main).toContain("clearPreviewWidthButtons();");
  expect(main).toContain('typeof selectedPreviewWidth === "number"');
  expect(main).toContain("`${selectedPreviewWidth}px`");
  expect(main).toContain("previewWidth: selectedPreviewWidth,");
  expect(preferences).toContain('previewWidth: "large" | "medium" | "small" | number;');
  expect(pkg).toContain('"@pantoken/interactions": "latest"');
});
