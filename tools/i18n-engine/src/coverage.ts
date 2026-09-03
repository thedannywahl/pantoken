import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import {
  parseDriftPolicy,
  resolveDriftSeverity,
  resolveTier,
  type DriftSeverity,
} from "@pantoken/translation-adapters";
import { loadConfig, type I18nConfig } from "./config.ts";
import { parsePo } from "./po.ts";
import { catalogUnitKey } from "./units.ts";

/** Coverage counts for one localization space and locale. */
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

/** Full localization coverage report and its applied filters. */
export interface CoverageReport {
  generatedAt: string;
  source: string;
  filters: { space: string | null; policy: DriftSeverity | "all" };
  rows: CoverageRow[];
}

/** Optional filters and destination for a localization coverage report. */
export interface CoverageOptions {
  space?: string;
  policy?: DriftSeverity | "all";
  output?: string;
}

/** Roll up all space rows into one comparable row per locale. */
export function rollupCoverageRows(rows: readonly CoverageRow[]): CoverageRow[] {
  const byLocale = new Map<string, CoverageRow[]>();
  for (const row of rows) {
    const localeRows = byLocale.get(row.locale) ?? [];
    localeRows.push(row);
    byLocale.set(row.locale, localeRows);
  }
  return [...byLocale.entries()].map(([locale, localeRows]) => {
    const total = localeRows.reduce((sum, row) => sum + row.total, 0);
    const translated = localeRows.reduce((sum, row) => sum + row.translated, 0);
    const policy = localeRows.some((row) => row.policy === "block")
      ? "block"
      : localeRows.some((row) => row.policy === "warn")
        ? "warn"
        : "off";
    const first = localeRows[0];
    return {
      space: "all",
      locale,
      tier: first.tier,
      policy,
      total,
      translated,
      untranslated: total - translated,
      percent: total === 0 ? 100 : Math.round((translated / total) * 10000) / 100,
    } satisfies CoverageRow;
  });
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
  potKeys: ReadonlySet<string>,
): CoverageRow | undefined {
  const poPath = join(root, resolvePattern(config.catalogs.target, space, locale));
  if (!existsSync(poPath)) return undefined;
  const entries = parsePo(readFileSync(poPath, "utf8")).filter(
    (entry) => !entry.obsolete && potKeys.has(catalogUnitKey(entry)),
  );
  const translated = entries.filter((entry) => entry.msgstr !== "").length;
  const total = potKeys.size;
  const severity = resolveDriftSeverity(policy, space, locale);
  return {
    space,
    locale,
    tier: resolveTier(policy, locale) ?? null,
    policy: severity,
    total,
    translated,
    untranslated: Math.max(total - translated, 0),
    percent: total === 0 ? 100 : Math.round((translated / total) * 10000) / 100,
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
    const potKeys = new Set(
      parsePo(readFileSync(potPath, "utf8"))
        .filter((entry) => !entry.obsolete)
        .map((entry) => catalogUnitKey(entry)),
    );
    for (const locale of locales) {
      if (locale === config.source) continue;
      const row = coverageRow(config, policy, root, space, locale, potKeys);
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

/** Refresh both ignored coverage artifacts after a PO or POT catalog write. */
export function refreshCoverageReports(configPath: string): void {
  if (!existsSync(configPath)) return;
  const config = loadConfig(configPath);
  const root = dirname(configPath);
  const jsonPath = join(root, ".i18n", "coverage.json");
  const htmlPath = join(root, ".i18n", "coverage.html");
  const report = writeCoverageReport(config, configPath, { output: jsonPath });
  const cssHrefs = [
    "formats/css/dist/style.css",
    "formats/components/dist/base.css",
    "formats/components/dist/components.css",
  ].map((path) => relative(dirname(htmlPath), join(root, path)).split(sep).join("/"));
  mkdirSync(dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, formatCoverageReportHtml(report, cssHrefs));
}

/** Format a coverage report as a Markdown table. */
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

/** Escape text for safe interpolation into HTML markup or a `data-*` attribute value. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function distinctSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function optionsHtml(values: readonly string[]): string {
  return values
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
    .join("");
}

/** Stylesheet hrefs for {@link formatCoverageReportHtml}, relative to wherever the HTML report is
 *  written. Default assumes the report lives at the conventional `.i18n/coverage.html` (one level
 *  below the repo root, alongside `formats/`). */
const DEFAULT_CSS_HREFS: readonly string[] = [
  "../formats/css/dist/style.css",
  "../formats/components/dist/base.css",
  "../formats/components/dist/components.css",
];

/** A policy's color axis, shared by the `pill` and `progress` modifiers — `off`/unmatched is neutral
 *  (`brand`), `warn` is `warning`, and `block` is `danger`. */
function policyColor(policy: DriftSeverity): "danger" | "warning" | "brand" {
  if (policy === "block") return "danger";
  if (policy === "warn") return "warning";
  return "brand";
}

/** Render a self-contained, sortable/filterable HTML coverage report — real `@pantoken/components`
 *  markup (`table`, `pill`, `text-input`, `simple-select`) and `@pantoken/css` tokens, styled and
 *  scripted entirely client-side (no build step) over the same rows `writeCoverageReport` persisted
 *  as JSON. `cssHrefs` lets a caller adjust the stylesheet links when the report is written somewhere
 *  other than the conventional `.i18n/coverage.html`. */
export function formatCoverageReportHtml(
  report: CoverageReport,
  cssHrefs: readonly string[] = DEFAULT_CSS_HREFS,
  coverageHref = "coverage.json",
): string {
  // The generated page polls `coverageHref` and reloads itself when the JSON report's generation timestamp changes.
  const rollupRows = rollupCoverageRows(report.rows);
  const rowsHtml = [...rollupRows, ...report.rows]
    .map((row) => {
      const tier = row.tier ?? "unmatched";
      const color = policyColor(row.policy);
      const pillClass = color === "brand" ? "instui-pill" : `instui-pill -color-${color}`;
      const progressClass =
        color === "danger"
          ? "instui-progress -color-danger -size-sm"
          : color === "warning"
            ? "instui-progress -color-warning -size-sm"
            : "instui-progress -color-brand -size-sm";
      const percent = String(row.percent);
      return `<tr data-space="${escapeHtml(row.space)}" data-locale="${escapeHtml(row.locale)}" data-tier="${escapeHtml(tier)}" data-policy="${escapeHtml(row.policy)}" data-percent="${percent}" data-translated="${String(row.translated)}" data-untranslated="${String(row.untranslated)}" data-total="${String(row.total)}">
        <td>${escapeHtml(row.space)}</td>
        <td>${escapeHtml(row.locale)}</td>
        <td>${escapeHtml(tier)}</td>
        <td><span class="${pillClass}">${escapeHtml(row.policy)}</span></td>
        <td class="num"><div class="bar"><progress class="${progressClass}" style="--value:${percent};width:4rem" value="${percent}" max="100" aria-label="${percent} percent translated"></progress><span class="value">${percent}%</span></div></td>
        <td class="num">${String(row.translated)}</td>
        <td class="num">${String(row.untranslated)}</td>
        <td class="num">${String(row.total)}</td>
      </tr>`;
    })
    .join("\n");
  const spaceOptions = optionsHtml(distinctSorted(report.rows.map((row) => row.space)));
  const localeOptions = optionsHtml(distinctSorted(report.rows.map((row) => row.locale)));
  const tierOptions = optionsHtml(
    distinctSorted(report.rows.map((row) => row.tier ?? "unmatched")),
  );
  const policyOptions = optionsHtml(distinctSorted(report.rows.map((row) => row.policy)));
  const title = `i18n coverage (${report.filters.policy}${report.filters.space ? `, ${escapeHtml(report.filters.space)}` : ""})`;
  const stylesheetLinks = cssHrefs
    .map((href) => `<link rel="stylesheet" href="${escapeHtml(href)}">`)
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${stylesheetLinks}
<style>
  body {
    margin: 0;
    padding: var(--instui-spacing-space-xl);
    background: var(--instui-color-background-page);
    color: var(--instui-color-text-base);
    font-family: var(--instui-font-family-base);
  }
  h1 { margin: 0 0 var(--instui-spacing-space2xs); font-family: var(--instui-font-family-heading); }
  .meta { margin: 0 0 var(--instui-spacing-space-lg); color: var(--instui-color-text-muted); }
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--instui-spacing-space-sm);
    margin-bottom: var(--instui-spacing-space-md);
  }
  .toolbar .instui-text-input { flex: 1 1 16rem; width: auto; }
  .toolbar .instui-simple-select { width: auto; }
  .table-wrap {
    border: var(--instui-border-width-sm, 1px) solid var(--instui-color-stroke-base);
    border-radius: var(--instui-border-radius-md);
    overflow: hidden;
  }
  td.num, th.num { text-align: end; }
  thead th {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  thead th[data-sort="asc"]::after { content: " \\25B2"; }
  thead th[data-sort="desc"]::after { content: " \\25BC"; }
  tbody tr[hidden] { display: none; }
  .bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--instui-spacing-space-xs);
  }
  .bar .instui-progress { flex: none; }
  #visible-count { font-weight: 600; }
</style>
</head>
<body>
  <h1>i18n coverage</h1>
  <p class="meta">Generated ${escapeHtml(report.generatedAt)} from source locale <strong>${escapeHtml(report.source)}</strong> &mdash; policy filter: ${escapeHtml(report.filters.policy)}${report.filters.space ? `, space: ${escapeHtml(report.filters.space)}` : ""}. Showing <span id="visible-count"></span> of <span id="total-count"></span> rows.</p>
  <div class="toolbar">
    <input class="instui-text-input" id="search" type="search" placeholder="Filter by space or locale&hellip;" aria-label="Filter rows">
    <select class="instui-simple-select" id="filter-space" aria-label="Filter by space"><option value="">All spaces</option>${spaceOptions}</select>
    <select class="instui-simple-select" id="filter-locale" aria-label="Filter by locale"><option value="">All locales</option>${localeOptions}</select>
    <select class="instui-simple-select" id="filter-tier" aria-label="Filter by tier"><option value="">All tiers</option>${tierOptions}</select>
    <select class="instui-simple-select" id="filter-policy" aria-label="Filter by policy"><option value="">All policies</option>${policyOptions}</select>
  </div>
  <div class="table-wrap">
  <table class="instui-table -hover">
    <caption>${title}</caption>
    <thead>
      <tr>
        <th scope="col" data-key="space" data-type="string">Space</th>
        <th scope="col" data-key="locale" data-type="string">Locale</th>
        <th scope="col" data-key="tier" data-type="string">Tier</th>
        <th scope="col" data-key="policy" data-type="string">Policy</th>
        <th scope="col" data-key="percent" data-type="number" class="num">Coverage</th>
        <th scope="col" data-key="translated" data-type="number" class="num">Translated</th>
        <th scope="col" data-key="untranslated" data-type="number" class="num">Untranslated</th>
        <th scope="col" data-key="total" data-type="number" class="num">Total</th>
      </tr>
    </thead>
    <tbody>
${rowsHtml}
    </tbody>
  </table>
  </div>
<script>
(function () {
  var coverageHref = ${JSON.stringify(coverageHref)};
  var generatedAt = ${JSON.stringify(report.generatedAt)};
  var table = document.querySelector("table");
  var tbody = table.tBodies[0];
  var rows = Array.prototype.slice.call(tbody.rows);
  var state = { key: null, dir: 1 };

  function compare(a, b, key, type) {
    var av = type === "number" ? Number(a.dataset[key]) : a.dataset[key].toLowerCase();
    var bv = type === "number" ? Number(b.dataset[key]) : b.dataset[key].toLowerCase();
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  }

  Array.prototype.forEach.call(table.tHead.querySelectorAll("th[data-key]"), function (th) {
    th.addEventListener("click", function () {
      var key = th.dataset.key;
      var type = th.dataset.type;
      state.dir = state.key === key ? -state.dir : 1;
      state.key = key;
      Array.prototype.forEach.call(table.tHead.querySelectorAll("th"), function (h) {
        h.removeAttribute("data-sort");
      });
      th.setAttribute("data-sort", state.dir === 1 ? "asc" : "desc");
      rows.sort(function (a, b) { return state.dir * compare(a, b, key, type); });
      rows.forEach(function (row) { tbody.appendChild(row); });
    });
  });

  var search = document.getElementById("search");
  var spaceFilter = document.getElementById("filter-space");
  var localeFilter = document.getElementById("filter-locale");
  var tierFilter = document.getElementById("filter-tier");
  var policyFilter = document.getElementById("filter-policy");
  var visibleCount = document.getElementById("visible-count");
  var totalCount = document.getElementById("total-count");

  function applyFilters() {
    var q = search.value.trim().toLowerCase();
    var space = spaceFilter.value;
    var locale = localeFilter.value;
    var tier = tierFilter.value;
    var policy = policyFilter.value;
    var visible = 0;
    rows.forEach(function (row) {
      var matchesQuery = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
      var matchesSpace = !space || row.dataset.space === space;
      var matchesLocale = !locale || row.dataset.locale === locale;
      var matchesTier = !tier || row.dataset.tier === tier;
      var matchesPolicy = !policy || row.dataset.policy === policy;
      var matchesDefault = space || row.dataset.space === "all";
      var show = matchesDefault && matchesQuery && matchesSpace && matchesLocale && matchesTier && matchesPolicy;
      row.hidden = !show;
      if (show) visible++;
    });
    visibleCount.textContent = String(visible);
    totalCount.textContent = String(rows.filter(function (row) { return !space || row.dataset.space === space; }).length);
  }

  search.addEventListener("input", applyFilters);
  spaceFilter.addEventListener("change", applyFilters);
  localeFilter.addEventListener("change", applyFilters);
  tierFilter.addEventListener("change", applyFilters);
  policyFilter.addEventListener("change", applyFilters);
  applyFilters();

  setInterval(function () {
    fetch(coverageHref, { cache: "no-store" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (next) {
        if (next && next.generatedAt && next.generatedAt !== generatedAt) window.location.reload();
      })
      .catch(function () {});
  }, 2000);
})();
</script>
</body>
</html>
`;
}
