/**
 * Rebuild `l10n/docs.api.pot` from the current EN API tree (`docs/api/`) and refresh the coverage
 * reports off it. Extracted from `build-api-locales.ts` so any script that merges a `docs.api.po`
 * against the template — including the per-locale `translate-api-po.ts` fixer used by
 * `scripts/i18n-drift-fix.ts` — can bring the POT current first. Without this, a stale POT (e.g. after
 * new API content lands without a full `docs:api:locales` run) makes new/changed prose units
 * permanently un-mergeable: `mergePoWithTemplate` only adds entries the template already lists, so
 * `check-locale-drift.ts` keeps reporting drift that no amount of re-translating can fix.
 *
 * @module
 */
import { globSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { refreshCoverageReports, serializePot, writeCatalog } from "@pantoken/i18n-engine";
import { collectUnits, isCatalogedApiUnit, segmentMarkdown } from "./segment-markdown.ts";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const enApiDir = join(docsRoot, "api");
/** PO flag approving a deliberate source-identical translation. */
export const PANTOKEN_VERBATIM_FLAG = "pantoken-verbatim";

const VERBATIM_API_PROSE = new Set(["CA", "NY", "TX", "LH", "AI", "JS", "AB"]);

/** Locale-specific API prose that is intentionally identical to English in existing catalogs. */
const localeVerbatimApiProse = new Map<string, string[]>();
const addLocaleVerbatimSource = (source: string, sourceLocales: readonly string[]): void => {
  for (const locale of sourceLocales) {
    const current = localeVerbatimApiProse.get(locale) ?? [];
    if (!current.includes(source)) localeVerbatimApiProse.set(locale, [...current, source]);
  }
};

addLocaleVerbatimSource("Filters", ["nl"]);
addLocaleVerbatimSource(" Syllabus.pdf", ["nl", "se"]);
addLocaleVerbatimSource(" Week 1", ["nl"]);
addLocaleVerbatimSource("Navigation", ["de", "fr", "fr-CA"]);
addLocaleVerbatimSource("Sa", ["de", "fr", "fr-CA", "ga", "ht"]);
addLocaleVerbatimSource("Su", ["fi", "is"]);
addLocaleVerbatimSource("Mo", ["de"]);
addLocaleVerbatimSource("Fr", ["de"]);
addLocaleVerbatimSource("Pastel", [
  "cy",
  "es",
  "fr",
  "fr-CA",
  "id",
  "ms",
  "nl",
  "pt",
  "pt-BR",
  "tr",
]);
addLocaleVerbatimSource("Menu", ["da", "fr", "fr-CA", "id", "ms", "nl", "pl", "pt", "pt-BR"]);
addLocaleVerbatimSource("Design", ["da", "nb", "pt", "pt-BR", "sv"]);
addLocaleVerbatimSource("link", ["da", "de", "pt", "pt-BR"]);
addLocaleVerbatimSource("Guides", ["fr", "fr-CA"]);
addLocaleVerbatimSource("General", ["ca", "es"]);
addLocaleVerbatimSource("Dashboard", ["nl"]);

const latinScriptNameLocales = [
  "cy",
  "da",
  "de",
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "fi",
  "fr",
  "fr-CA",
  "ga",
  "ht",
  "hu",
  "id",
  "is",
  "it",
  "mi",
  "ms",
  "nb",
  "nl",
  "nn",
  "pl",
  "pt",
  "pt-BR",
  "se",
  "sl",
  "sv",
  "tr",
  "uk",
  "vi",
] as const;

for (const source of ["Miguel Sanchez", "Miguel", "Sanchez"])
  addLocaleVerbatimSource(source, latinScriptNameLocales);
addLocaleVerbatimSource(
  "Dr. Nguyen Van Thoc",
  latinScriptNameLocales.filter((locale) => !["fi", "it", "uk", "vi"].includes(locale)),
);

/** Approved source-identical API prose, scoped to its target locale. */
export const LOCALE_VERBATIM_API_PROSE: ReadonlyMap<string, readonly string[]> =
  localeVerbatimApiProse;

/** Rebuild `l10n/docs.api.pot` from the current `docs/api` tree and refresh its coverage reports. */
export const refreshApiPot = ({ force = false }: { force?: boolean } = {}): void => {
  const units = globSync("**/*.md", { cwd: enApiDir })
    .sort()
    .flatMap((file) =>
      collectUnits(segmentMarkdown(readFileSync(join(enApiDir, file), "utf8")))
        // Glossary units are deterministically substituted and never written to the PO catalog
        // (see segment-markdown.ts) — including them here would make 100% coverage unreachable.
        .filter(isCatalogedApiUnit)
        .map((unit) => ({
          msgid: unit.text,
          msgctxt: `docs.api:${unit.kind}`,
          reference: relative(enApiDir, join(enApiDir, file)),
          flags: VERBATIM_API_PROSE.has(unit.text) ? [PANTOKEN_VERBATIM_FLAG] : [],
          translate: "always" as const,
        })),
    );
  const catalogPath = join(repoRoot, "l10n", "docs.api.pot");
  const catalog = serializePot(units, ["no-c-format"]);
  if (force) writeFileSync(catalogPath, catalog);
  else writeCatalog(catalogPath, catalog);
  refreshCoverageReports(join(repoRoot, "i18n.config.json"));
};
