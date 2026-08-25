import { fileURLToPath } from "node:url";
import { afterEach, expect, test, vi } from "vite-plus/test";

const ORIGINAL_ARGV_1 = process.argv[1];

afterEach(() => {
  process.argv[1] = ORIGINAL_ARGV_1;
  vi.resetModules();
  vi.restoreAllMocks();
});

test("executes CLI path and writes model.json", async () => {
  vi.resetModules();
  const buildCssDocModel = vi.fn(() => [{ name: "fixture" }]);
  const writeCssDocModel = vi.fn();
  vi.doMock("@pantoken/cssdoc-model", () => ({ buildCssDocModel, writeCssDocModel }));

  const moduleUrl = new URL("./generate-model.ts", import.meta.url);
  process.argv[1] = fileURLToPath(moduleUrl);
  const log = vi.spyOn(console, "log").mockImplementation(() => {});

  await import("./generate-model.ts");

  expect(buildCssDocModel).toHaveBeenCalledTimes(1);
  expect(writeCssDocModel).toHaveBeenCalledTimes(1);
  expect(log).toHaveBeenCalledWith(expect.stringContaining("layouts: wrote model.json"));
});
