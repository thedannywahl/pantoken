/**
 * Collapse a multi-run fallow SARIF file into a single run in place.
 *
 * Fallow emits one SARIF `run` per analysis (dead-code, health, duplication). GitHub code scanning
 * rejects multiple runs uploaded under the same category, so this merges them into one run before
 * upload — concatenating results and de-duplicating rules by `id`. Fallow's results reference rules by
 * `ruleId` (not `ruleIndex`), so concatenation is safe. If the input is missing or unparseable (the
 * generation step tolerates a fallow failure), it writes a valid empty SARIF so the upload step still
 * has a file to send.
 *
 * Usage: `node scripts/quality/merge-fallow-sarif.ts <path-to.sarif>`
 *
 * @module
 */
import { readFileSync, writeFileSync } from "node:fs";

interface SarifRule {
  id: string;
}
interface SarifResult {
  locations?: { physicalLocation?: { artifactLocation?: { uri?: string } } }[];
}
interface SarifRun {
  tool: { driver: { rules?: SarifRule[] } };
  results?: SarifResult[];
}

/**
 * Whether a result carries a code location. Code scanning rejects any result without one, and fallow
 * emits project-level findings (e.g. unused dependencies) that have none.
 */
function hasLocation(result: SarifResult): boolean {
  return (result.locations ?? []).some((loc) => loc.physicalLocation?.artifactLocation?.uri);
}
interface Sarif {
  version?: string;
  $schema?: string;
  runs?: SarifRun[];
}

const EMPTY: Sarif = {
  version: "2.1.0",
  $schema: "https://json.schemastore.org/sarif-2.1.0.json",
  runs: [],
};

const file = process.argv[2];
if (!file) {
  console.error("usage: merge-fallow-sarif.ts <path-to.sarif>");
  process.exit(1);
}

let doc: Sarif;
try {
  doc = JSON.parse(readFileSync(file, "utf8")) as Sarif;
} catch {
  writeFileSync(file, JSON.stringify(EMPTY));
  process.exit(0);
}

const runs = doc.runs ?? [];
if (runs.length > 0) {
  // Collapse every analysis into one run (code scanning rejects multiple runs under one category),
  // de-duplicating rules by id and dropping results with no code location (unuploadable).
  const seen = new Set<string>();
  const rules: SarifRule[] = [];
  for (const run of runs) {
    for (const rule of run.tool.driver.rules ?? []) {
      if (!seen.has(rule.id)) {
        seen.add(rule.id);
        rules.push(rule);
      }
    }
  }
  const base = runs[0];
  doc.runs = [
    {
      ...base,
      tool: { ...base.tool, driver: { ...base.tool.driver, rules } },
      results: runs.flatMap((run) => (run.results ?? []).filter(hasLocation)),
    },
  ];
}

writeFileSync(file, JSON.stringify(doc));
