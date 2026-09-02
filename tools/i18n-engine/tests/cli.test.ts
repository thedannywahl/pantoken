import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

describe("stub commands", () => {
  for (const name of ["extract", "translate", "render", "check", "lint", "stats"]) {
    test(`"${name}" parses and reports not-yet-implemented`, async () => {
      await run([name]);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`"${name}" is not implemented`));
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  }

  test("translate accepts a space and every selector flag", async () => {
    await run([
      "translate",
      "docs.guides",
      "--locale",
      "hu",
      "--tier",
      "primary",
      "--provider",
      "agy",
      "--concurrency",
      "4",
      "--force",
    ]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"translate" is not implemented'));
  });

  test("check accepts --strict", async () => {
    await run(["check", "--strict"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('"check" is not implemented'));
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
    expect(process.exitCode).toBeGreaterThan(0);
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
