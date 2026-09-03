import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vite-plus/test";
import { runLint } from "../src/lint.ts";

const root = new URL("../../../", import.meta.url).pathname;
const tempDirs: string[] = [];

afterEach(() => {
  for (const directory of tempDirs.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe("runLint", () => {
  test("accepts the repository localization contract", async () => {
    const result = await runLint(join(root, "i18n.config.json"));
    expect(result.checkedSpaces).toBe(8);
    expect(result.checkedLocales).toBe(44);
    expect(result.checkedCatalogs).toBe(352);
  }, 20_000);

  test("rejects a required space missing from the config", async () => {
    const directory = mkdtempSync(join(tmpdir(), "pantoken-i18n-lint-"));
    tempDirs.push(directory);
    mkdirSync(join(directory, "tools/i18n-engine"), { recursive: true });
    writeFileSync(
      join(directory, "i18n.config.json"),
      JSON.stringify({ source: "en", requiredSpaces: ["docs.chrome"], spaces: {} }),
    );
    await expect(runLint(join(directory, "i18n.config.json"))).rejects.toThrow(
      'required space "docs.chrome" is not configured',
    );
  });
});
