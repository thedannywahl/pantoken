import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vite-plus/test";
import { formatCoverageReport, writeCoverageReport } from "../src/coverage.ts";
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
      policy: "warn",
      output,
    });
    expect(report.rows).toHaveLength(43);
    expect(report.rows.every((row) => row.space === "docs.home" && row.policy === "warn")).toBe(
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
});
