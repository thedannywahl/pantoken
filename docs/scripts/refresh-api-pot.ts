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
import { globSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { refreshCoverageReports, serializePot, writeCatalog } from "@pantoken/i18n-engine";
import { collectUnits, isCatalogedApiUnit, segmentMarkdown } from "./segment-markdown.ts";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const enApiDir = join(docsRoot, "api");

/** Rebuild `l10n/docs.api.pot` from the current `docs/api` tree and refresh its coverage reports. */
export const refreshApiPot = (): void => {
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
          translate: "always" as const,
        })),
    );
  writeCatalog(join(repoRoot, "l10n", "docs.api.pot"), serializePot(units, ["no-c-format"]));
  refreshCoverageReports(join(repoRoot, "i18n.config.json"));
};
