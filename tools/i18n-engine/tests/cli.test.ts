import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vite-plus/test";
import { createI18nCommand, runI18nCli } from "../src/cli.ts";
import type { I18nConfig } from "../src/config.ts";

let testDir: string;
let configPath: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let warnSpy: ReturnType<typeof vi.spyOn>;

const MINIMAL_CONFIG = {
  source: "en",
  locales: {
    registry: "@pantoken/i18n#LOCALES",
    exclude: [],
    tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
  },
  spaces: { "docs.guides": { kind: "content" } },
};

beforeEach(() => {
  testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-cli-"));
  configPath = join(testDir, "i18n.config.json");
  writeFileSync(configPath, JSON.stringify(MINIMAL_CONFIG));
  exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
  vi.restoreAllMocks();
});

function readConfig(): I18nConfig {
  return JSON.parse(readFileSync(configPath, "utf8")) as I18nConfig;
}

async function run(args: string[]): Promise<void> {
  const program = createI18nCommand({ configPath });
  await program.parseAsync(args, { from: "user" });
}

describe("stub commands (lint/stats — no docs.guides implementation yet)", () => {
  for (const name of ["lint", "stats"]) {
    test(`"${name}" parses and reports not-yet-implemented`, async () => {
      await run([name]);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`"${name}" is not implemented`));
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  }
});

describe("extract/translate/render/check fall back to stub for a non-docs.guides space", () => {
  for (const name of ["extract", "translate", "render", "check"]) {
    test(`"${name} bogus.space" reports not-yet-implemented`, async () => {
      await run([name, "bogus.space"]);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`"${name}" is not implemented`));
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  }
});

describe("docs.guides: extract -> translate -> render (real, no AI provider)", () => {
  beforeEach(() => {
    mkdirSync(join(testDir, "docs", "guide"), { recursive: true });
    writeFileSync(join(testDir, "docs", "guide", "a.md"), "Hello world.\n");
  });

  test("extract writes a POT with the real prose unit", async () => {
    await run(["extract", "docs.guides"]);
    const pot = readFileSync(join(testDir, "l10n", "docs.guides.pot"), "utf8");
    expect(pot).toContain('msgid "Hello world."');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Extracted 1 unit(s)"));
  });

  test("extract with no space argument also runs for docs.guides", async () => {
    await run(["extract"]);
    expect(existsSync(join(testDir, "l10n", "docs.guides.pot"))).toBe(true);
  });

  test("translate keeps the PO current (untranslated, since no AI provider is authorized)", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    expect(existsSync(join(testDir, "l10n", "hu", "docs.guides.po"))).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("docs.guides (hu): 0 translated, 1 untranslated"),
    );
  });

  test("render falls back to the English source for an untranslated unit", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    await run(["render", "docs.guides", "--locale", "hu"]);
    const rendered = readFileSync(join(testDir, "docs", "hu", "guide", "a.md"), "utf8");
    expect(rendered).toBe("Hello world.\n");
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("docs.guides (hu): wrote 1 file(s)."),
    );
  });

  test("render reflects a hand-added translation in the PO", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    const poPath = join(testDir, "l10n", "hu", "docs.guides.po");
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Hello world."\nmsgstr ""',
        'msgid "Hello world."\nmsgstr "Szia világ."',
      ),
    );
    await run(["render", "docs.guides", "--locale", "hu"]);
    expect(readFileSync(join(testDir, "docs", "hu", "guide", "a.md"), "utf8")).toBe(
      "Szia világ.\n",
    );
  });

  test("translate/render with no --locale iterate every non-excluded locale", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides"]);
    await run(["render", "docs.guides"]);
    expect(existsSync(join(testDir, "docs", "hu", "guide", "a.md"))).toBe(true);
  });

  test("check reports untranslated drift and sets a warn (non-blocking) exit code", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    process.exitCode = undefined;
    await run(["check", "docs.guides"]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("docs.guides — translation drift"),
    );
    expect(process.exitCode).toBe(0); // primary tier defaults to "warn", not "block"
    process.exitCode = undefined;
  });

  test("check --strict escalates warn findings to blocking", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    process.exitCode = undefined;
    const originalStrict = process.env.I18N_DRIFT_STRICT;
    await run(["check", "docs.guides", "--strict"]);
    expect(process.exitCode).toBe(1);
    process.exitCode = undefined;
    if (originalStrict === undefined) delete process.env.I18N_DRIFT_STRICT;
    else process.env.I18N_DRIFT_STRICT = originalStrict;
  });

  test("check reports no drift once every unit is translated", async () => {
    await run(["extract", "docs.guides"]);
    await run(["translate", "docs.guides", "--locale", "hu"]);
    const poPath = join(testDir, "l10n", "hu", "docs.guides.po");
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Hello world."\nmsgstr ""',
        'msgid "Hello world."\nmsgstr "Szia világ."',
      ),
    );
    process.exitCode = undefined;
    await run(["check", "docs.guides"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("no translation drift"));
    expect(process.exitCode).toBe(0);
    process.exitCode = undefined;
  });
});

describe("ui.strings (a messages-kind space): extract -> translate -> check", () => {
  beforeEach(() => {
    writeFileSync(
      configPath,
      JSON.stringify({
        ...MINIMAL_CONFIG,
        spaces: {
          ...MINIMAL_CONFIG.spaces,
          "ui.strings": { kind: "messages", source: "i18n.json" },
        },
      }),
    );
    writeFileSync(
      join(testDir, "i18n.json"),
      JSON.stringify({
        back: { message: "Back", translate: "always" },
        datePlaceholder: { message: "yyyy-mm-dd", translate: "optional" },
      }),
    );
  });

  test("extract writes a msgctxt-keyed POT", async () => {
    await run(["extract", "ui.strings"]);
    const pot = readFileSync(join(testDir, "l10n", "ui.strings.pot"), "utf8");
    expect(pot).toContain('msgctxt "ui.strings:back"');
    expect(pot).toContain('msgid "Back"');
    expect(pot).toContain('msgctxt "ui.strings:datePlaceholder"');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Extracted 2 unit(s)"));
  });

  test("translate keeps the PO current (untranslated, since no AI provider is authorized)", async () => {
    await run(["extract", "ui.strings"]);
    await run(["translate", "ui.strings", "--locale", "hu"]);
    expect(existsSync(join(testDir, "l10n", "hu", "ui.strings.po"))).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("ui.strings (hu): 0 translated, 2 untranslated"),
    );
  });

  test("render for a messages space is a documented no-op", async () => {
    await run(["render", "ui.strings"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("no-op"));
  });

  test("check reports untranslated drift for a messages space", async () => {
    await run(["extract", "ui.strings"]);
    await run(["translate", "ui.strings", "--locale", "hu"]);
    process.exitCode = undefined;
    await run(["check", "ui.strings"]);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("ui.strings — translation drift"));
    process.exitCode = undefined;
  });

  test("check reports no drift once every key is translated", async () => {
    await run(["extract", "ui.strings"]);
    await run(["translate", "ui.strings", "--locale", "hu"]);
    const poPath = join(testDir, "l10n", "hu", "ui.strings.po");
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8")
        .replace('msgid "Back"\nmsgstr ""', 'msgid "Back"\nmsgstr "Vissza"')
        .replace('msgid "yyyy-mm-dd"\nmsgstr ""', 'msgid "yyyy-mm-dd"\nmsgstr "éééé-hh-nn"'),
    );
    process.exitCode = undefined;
    await run(["check", "ui.strings"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("no translation drift"));
    expect(process.exitCode).toBe(0);
    process.exitCode = undefined;
  });
});

describe("locale promote/demote/exclude/include", () => {
  test("promote defaults to the primary tier", async () => {
    await run(["locale", "promote", "mi"]);
    const config = readConfig();
    expect(config.locales.tiers.primary).toContain("mi");
    expect(config.locales.tiers.secondary).not.toContain("mi");
    expect(logSpy).toHaveBeenCalledWith('Promoted "mi" to tier "primary".');
  });

  test("promote --to overrides the default tier", async () => {
    await run(["locale", "promote", "mi", "--to", "source"]);
    expect(readConfig().locales.tiers.source).toContain("mi");
  });

  test("demote defaults to the secondary tier", async () => {
    await run(["locale", "demote", "hu"]);
    const config = readConfig();
    expect(config.locales.tiers.secondary).not.toContain("hu"); // secondary is "*", never gets an exact entry added redundantly... see note
    expect(config.locales.tiers.primary).not.toContain("hu");
    expect(logSpy).toHaveBeenCalledWith('Demoted "hu" to tier "secondary".');
  });

  test("exclude removes a locale from translation/render/check entirely", async () => {
    await run(["locale", "exclude", "mi"]);
    expect(readConfig().locales.exclude).toEqual(["mi"]);
    expect(logSpy).toHaveBeenCalledWith('Excluded "mi" from the pipeline.');
  });

  test("include rejoins an excluded locale", async () => {
    writeFileSync(
      configPath,
      JSON.stringify({
        ...MINIMAL_CONFIG,
        locales: { ...MINIMAL_CONFIG.locales, exclude: ["mi"] },
      }),
    );
    await run(["locale", "include", "mi"]);
    expect(readConfig().locales.exclude).toEqual([]);
    expect(logSpy).toHaveBeenCalledWith('Included "mi" in the pipeline.');
  });

  test("an unknown --to tier fails loudly instead of silently no-opping", async () => {
    await expect(run(["locale", "promote", "mi", "--to", "pilot"])).rejects.toThrow(
      /Unknown tier "pilot"/u,
    );
  });
});

test("a missing config file reports an error and exits 1", async () => {
  rmSync(configPath);
  await run(["locale", "exclude", "mi"]);
  expect(errSpy).toHaveBeenCalledWith(expect.stringContaining("could not load"));
  expect(exitSpy).toHaveBeenCalledWith(1);
});

describe("runI18nCli (the real process entry point)", () => {
  test("an unknown command sets process.exitCode from the CommanderError", async () => {
    process.exitCode = undefined;
    await runI18nCli(["--config", configPath, "bogus-command"]);
    expect(process.exitCode).toBe(1);
    process.exitCode = undefined;
  });

  test("a thrown non-Commander error is logged and sets process.exitCode to 1", async () => {
    process.exitCode = undefined;
    await runI18nCli(["--config", configPath, "locale", "promote", "mi", "--to", "bogus-tier"]);
    expect(errSpy).toHaveBeenCalledWith(
      "Error:",
      expect.stringContaining('Unknown tier "bogus-tier"'),
    );
    expect(process.exitCode).toBe(1);
    process.exitCode = undefined;
  });
});
