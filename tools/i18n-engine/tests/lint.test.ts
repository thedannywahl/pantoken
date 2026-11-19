import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vite-plus/test";
import { runLint } from "../src/lint.ts";
import type { I18nConfig } from "../src/config.ts";

const root = new URL("../../../", import.meta.url).pathname;
const tempDirs: string[] = [];

afterEach(() => {
  for (const directory of tempDirs.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe("runLint", () => {
  test("accepts the repository localization contract", async () => {
    const config = JSON.parse(readFileSync(join(root, "i18n.config.json"), "utf8")) as I18nConfig;
    const locales = readdirSync(join(root, "l10n"), { withFileTypes: true }).filter((entry) =>
      entry.isDirectory(),
    );
    const result = await runLint(join(root, "i18n.config.json"));
    expect(result.checkedSpaces).toBe(config.requiredSpaces.length);
    expect(result.checkedLocales).toBe(locales.length);
    expect(result.checkedCatalogs).toBe(config.requiredSpaces.length * locales.length);
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

  test("throws errors when lint finds issues with Error.isError() check", async () => {
    // This test verifies that the Error.isError() code path is used
    // by testing a scenario that causes multiple lint errors
    const directory = mkdtempSync(join(tmpdir(), "pantoken-i18n-lint-errors-"));
    tempDirs.push(directory);
    mkdirSync(join(directory, "tools/i18n-engine"), { recursive: true });

    // Create valid configuration that will then fail on PO file checks
    const config = JSON.parse(readFileSync(join(root, "i18n.config.json"), "utf8")) as I18nConfig;

    writeFileSync(join(directory, "i18n.config.json"), JSON.stringify(config));

    // Create the l10n directory structure but don't populate it with valid files
    mkdirSync(join(directory, "l10n"), { recursive: true });

    // This should fail because POT files are missing, exercising the error handling code
    await expect(runLint(join(directory, "i18n.config.json"))).rejects.toThrow(
      /i18n lint failed:/u,
    );
  });

  test("handles Error.isError() check in checkPoFiles catch block with invalid PO file", async () => {
    // This test specifically exercises the Error.isError() code path in the checkPoFiles function
    // by creating an invalid PO file that will cause msgfmt to fail
    const directory = mkdtempSync(join(tmpdir(), "pantoken-i18n-invalid-po-"));
    tempDirs.push(directory);

    const config: I18nConfig = JSON.parse(
      JSON.stringify({
        source: "en",
        requiredSpaces: ["test.space"],
        spaces: {
          "test.space": {
            kind: "messages",
            source: "i18n/source",
          },
        },
        catalogs: {
          template: "l10n/{space}.pot",
          target: "l10n/{locale}/{space}.po",
        },
        poOptions: { defaultFlags: [] },
        locales: { registry: "en", tiers: { source: ["en"] } },
        defaults: {},
        drift: { surfaces: {}, fallback: "block" },
      }),
    );

    mkdirSync(join(directory, "i18n/source"), { recursive: true });
    mkdirSync(join(directory, "l10n/fr"), { recursive: true });

    // Write a valid source file
    writeFileSync(
      join(directory, "i18n/source/i18n.json"),
      JSON.stringify({
        "test.space": [{ id: "hello", message: "Hello" }],
      }),
    );

    // Write a valid POT template
    writeFileSync(
      join(directory, "l10n/test.space.pot"),
      `# Test
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\\n"

msgid "hello"
msgstr ""
`,
    );

    // Write an invalid PO file (missing closing quote to cause msgfmt to fail)
    writeFileSync(
      join(directory, "l10n/fr/test.space.po"),
      `# French translation
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8\\n"

msgid "hello
msgstr "Bonjour
`,
    );

    writeFileSync(join(directory, "i18n.config.json"), JSON.stringify(config));

    // This should fail when msgfmt tries to validate the invalid PO file
    // The Error.isError() check in the catch block will be exercised
    await expect(runLint(join(directory, "i18n.config.json"))).rejects.toThrow(
      /i18n lint failed:/u,
    );
  });

  test("validates JSON schema and reports validation errors", async () => {
    // This test exercises the validateJson error path
    // by creating an invalid i18n.json source file that doesn't match the schema
    const directory = mkdtempSync(join(tmpdir(), "pantoken-i18n-invalid-json-"));
    tempDirs.push(directory);

    const config: I18nConfig = JSON.parse(
      JSON.stringify({
        source: "en",
        requiredSpaces: ["test.space"],
        spaces: {
          "test.space": {
            kind: "messages",
            source: "i18n/source",
          },
        },
        catalogs: {
          template: "l10n/{space}.pot",
          target: "l10n/{locale}/{space}.po",
        },
        poOptions: { defaultFlags: [] },
        locales: { registry: "en", tiers: { source: ["en"] } },
        defaults: {},
        drift: { surfaces: {}, fallback: "block" },
      }),
    );

    mkdirSync(join(directory, "i18n/source"), { recursive: true });

    // Write an invalid source file - missing required "translate" field
    // The schema requires both "message" and "translate" fields
    writeFileSync(
      join(directory, "i18n/source/i18n.json"),
      JSON.stringify({
        "test.space": {
          hello: {
            message: "Hello",
            // missing required "translate" field
          },
        },
      }),
    );

    writeFileSync(join(directory, "i18n.config.json"), JSON.stringify(config));

    // This should fail schema validation and exercise validateJson error path
    await expect(runLint(join(directory, "i18n.config.json"))).rejects.toThrow(
      /i18n lint failed:/u,
    );
  });
});
