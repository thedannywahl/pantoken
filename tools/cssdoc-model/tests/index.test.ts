import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { buildCssDocModel, writeCssDocModel } from "../src/index.ts";

const FIXTURE = `/**\n * @component widget\n * @modifier -color-danger — Danger.\n */\n.widget {}\n.widget.-color-danger {}`;

test("buildCssDocModel parses one or more generated CSS files with the given convention", () => {
  const dir = mkdtempSync(join(tmpdir(), "cssdoc-model-"));
  const file = join(dir, "generated.css");
  writeFileSync(file, FIXTURE);

  const model = buildCssDocModel([file], { modifierConvention: "rscss" });
  expect(model).toHaveLength(1);
  expect(model[0].name).toBe("widget");
  expect(model[0].modifiers.map((m) => m.name)).toContain("-color-danger");
});

test("writeCssDocModel writes pretty JSON, creating the destination directory", () => {
  const dir = mkdtempSync(join(tmpdir(), "cssdoc-model-out-"));
  const outPath = join(dir, "nested", "model.json");
  writeCssDocModel([{ name: "widget" } as never], outPath);
  const written = JSON.parse(readFileSync(outPath, "utf8"));
  expect(written).toEqual([{ name: "widget" }]);
});
