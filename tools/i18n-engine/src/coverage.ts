import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  parseDriftPolicy,
  resolveDriftSeverity,
  resolveTier,
  type DriftSeverity,
} from "@pantoken/translation-adapters";
import type { I18nConfig } from "./config.ts";
import { parsePo } from "./po.ts";

export interface CoverageRow {
  space: string;
  locale: string;
  tier: string | null;
  policy: DriftSeverity;
  total: number;
  translated: number;
  untranslated: number;
  percent: number;
}

export interface CoverageReport {
  generatedAt: string;
  source: string;
  filters: { space: string | null; policy: DriftSeverity | "all" };
  rows: CoverageRow[];
}

export interface CoverageOptions {
  space?: string;
  policy?: DriftSeverity | "all";
  output?: string;
}

function resolvePattern(pattern: string, space: string, locale?: string): string {
  return pattern.replace("{space}", space).replace("{locale}", locale ?? "{locale}");
}

function coverageRow(
  config: I18nConfig,
  policy: ReturnType<typeof parseDriftPolicy>,
  root: string,
  space: string,
  locale: string,
  potEntries: number,
): CoverageRow | undefined {
  const poPath = join(root, resolvePattern(config.catalogs.target, space, locale));
  if (!existsSync(poPath)) return undefined;
  const entries = parsePo(readFileSync(poPath, "utf8")).filter((entry) => !entry.obsolete);
  const translated = entries.filter((entry) => entry.msgstr !== "").length;
  const severity = resolveDriftSeverity(policy, space, locale);
  return {
    space,
    locale,
    tier: resolveTier(policy, locale) ?? null,
    policy: severity,
    total: potEntries,
    translated,
    untranslated: Math.max(potEntries - translated, 0),
    percent: potEntries === 0 ? 100 : Math.round((translated / potEntries) * 10000) / 100,
  };
}

/** Build and write an ignored language-coverage report filtered by the configured drift policy. */
export function writeCoverageReport(
  config: I18nConfig,
  configPath: string,
  options: CoverageOptions = {},
): CoverageReport {
  const root = dirname(configPath);
  const policy = parseDriftPolicy({
    tiers: config.locales.tiers,
    surfaces: config.drift.surfaces,
    fallback: config.drift.fallback,
  });
  if (options.space && !config.requiredSpaces.includes(options.space)) {
    throw new Error(`Unknown coverage space: ${options.space}`);
  }
  const spaces = options.space ? [options.space] : config.requiredSpaces;
  const l10nDir = join(root, "l10n");
  const locales = existsSync(l10nDir)
    ? readdirSync(l10nDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];
  const rows: CoverageRow[] = [];
  for (const space of spaces) {
    const potPath = join(root, resolvePattern(config.catalogs.template, space));
    if (!existsSync(potPath)) continue;
    const potEntries = parsePo(readFileSync(potPath, "utf8")).filter(
      (entry) => !entry.obsolete,
    ).length;
    for (const locale of locales) {
      if (locale === config.source) continue;
      const row = coverageRow(config, policy, root, space, locale, potEntries);
      if (
        row &&
        (options.policy === undefined || options.policy === "all" || row.policy === options.policy)
      )
        rows.push(row);
    }
  }
  const report: CoverageReport = {
    generatedAt: new Date().toISOString(),
    source: config.source,
    filters: { space: options.space ?? null, policy: options.policy ?? "all" },
    rows,
  };
  const output = options.output ?? join(root, ".i18n", "coverage.json");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

export function formatCoverageReport(report: CoverageReport): string {
  const lines = [
    `# i18n coverage (${report.filters.policy}${report.filters.space ? `, ${report.filters.space}` : ""})`,
    "",
    "| Space | Locale | Tier | Policy | Coverage | Translated | Untranslated |",
    "| --- | --- | --- | --- | ---: | ---: | ---: |",
  ];
  for (const row of report.rows) {
    lines.push(
      `| ${row.space} | ${row.locale} | ${row.tier ?? "unmatched"} | ${row.policy} | ${row.percent}% | ${row.translated}/${row.total} | ${row.untranslated} |`,
    );
  }
  return `${lines.join("\n")}\n`;
}
