import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vite-plus/test";
import {
  formatCoverageReport,
  formatCoverageReportHtml,
  rollupCoverageRows,
  writeCoverageReport,
} from "../src/coverage.ts";
import { loadConfig } from "../src/config.ts";

const root = new URL("../../../", import.meta.url).pathname;
const config = loadConfig(join(root, "i18n.config.json"));
const tempDirs: string[] = [];

afterEach(() => {
  for (const directory of tempDirs.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function outputPath(): string {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-i18n-coverage-"));
  tempDirs.push(directory);
  return join(directory, "coverage.json");
}

describe("writeCoverageReport", () => {
  test("rolls all spaces into one row per locale", () => {
    const rows = rollupCoverageRows([
      {
        space: "docs.home",
        locale: "fr",
        tier: "secondary",
        policy: "block",
        total: 10,
        translated: 9,
        untranslated: 1,
        percent: 90,
      },
      {
        space: "docs.api",
        locale: "fr",
        tier: "secondary",
        policy: "warn",
        total: 90,
        translated: 45,
        untranslated: 45,
        percent: 50,
      },
    ]);
    expect(rows).toEqual([
      expect.objectContaining({
        space: "all",
        locale: "fr",
        policy: "block",
        total: 100,
        translated: 54,
        untranslated: 46,
        percent: 54,
      }),
    ]);
  });

  test("reports every configured surface and locale", () => {
    const output = outputPath();
    const report = writeCoverageReport(config, join(root, "i18n.config.json"), { output });
    expect(report.rows).toHaveLength(344);
    expect(JSON.parse(readFileSync(output, "utf8")).rows).toHaveLength(344);
  }, 20_000);

  test("filters rows by policy and surface", () => {
    const output = outputPath();
    const report = writeCoverageReport(config, join(root, "i18n.config.json"), {
      space: "docs.home",
      policy: "block",
      output,
    });
    expect(report.rows).toHaveLength(43);
    expect(report.rows.every((row) => row.space === "docs.home" && row.policy === "block")).toBe(
      true,
    );
  });

  test("formats a report as Markdown", () => {
    const report = writeCoverageReport(config, join(root, "i18n.config.json"), {
      space: "docs.home",
      output: outputPath(),
    });
    expect(formatCoverageReport(report)).toContain("| docs.home | ar | secondary |");
  });

  test("formats a report as a sortable/filterable HTML table", () => {
    const report = writeCoverageReport(config, join(root, "i18n.config.json"), {
      space: "docs.home",
      policy: "block",
      output: outputPath(),
    });
    const html = formatCoverageReportHtml(report);
    expect(html).toContain("<!doctype html>");
    expect(html).toContain('data-space="docs.home" data-locale="ar"');
    expect(html).toContain('data-space="all" data-locale="ar"');
    expect(html).toContain('<option value="docs.home">docs.home</option>');
    expect(html).toContain('<progress class="instui-progress -color-danger -size-sm"');
    expect(html).toContain('<span class="value">');
    expect(html).toContain("th.addEventListener");
    expect(html).toContain('<table class="instui-table -hover">');
    expect(html).toContain('<span class="instui-pill -color-danger">block</span>');
    expect(html).toContain('<input class="instui-text-input"');
    expect(html).toContain('<select class="instui-simple-select"');
    expect(html).toContain('<link rel="stylesheet" href="../formats/css/dist/style.css">');
  });

  test("ignores stale PO entries no longer in the POT, so coverage can't exceed 100%", () => {
    const projectRoot = mkdtempSync(join(tmpdir(), "pantoken-i18n-coverage-stale-"));
    tempDirs.push(projectRoot);
    const configPath = join(projectRoot, "i18n.config.json");
    writeFileSync(
      configPath,
      JSON.stringify({
        source: "en",
        requiredSpaces: ["testspace"],
        spaces: {},
        locales: { tiers: { source: ["en"], secondary: ["*"] } },
      }),
    );
    mkdirSync(join(projectRoot, "l10n", "xx"), { recursive: true });
    writeFileSync(join(projectRoot, "l10n", "testspace.pot"), 'msgid "kept"\nmsgstr ""\n');
    writeFileSync(
      join(projectRoot, "l10n", "xx", "testspace.po"),
      'msgid "kept"\nmsgstr "gardé"\n\nmsgid "removed from source"\nmsgstr "obsolète (non marqué)"\n',
    );

    const report = writeCoverageReport(loadConfig(configPath), configPath, {
      output: outputPath(),
    });

    expect(report.rows).toEqual([
      expect.objectContaining({ total: 1, translated: 1, untranslated: 0, percent: 100 }),
    ]);
  });
});
