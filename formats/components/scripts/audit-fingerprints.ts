/**
 * Content fingerprints for the accessibility audit. A record's fingerprint changes only when
 * something that can change its audit result does: its own CSS and examples, its built stylesheet
 * and behavior script, or the shared inputs every page loads (tokens, base, focus, elevation, the
 * audit tool, and the audit harness). The docs build compares these with the checked-in snapshot
 * and re-audits only the records that differ.
 * @module
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DECLARATIONS } from "../src/declarations/index.ts";
import { base } from "../src/rules/base/index.ts";
import { auditRecords } from "./audit-plugin-components.ts";

const packageRoot = resolve(import.meta.dirname, "..");
const repositoryRoot = resolve(packageRoot, "../..");

const digest = (...parts: readonly (string | Buffer)[]): string => {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part).update("\0");
  return hash.digest("hex").slice(0, 16);
};

const readIfPresent = (path: string): string | Buffer =>
  existsSync(path) ? readFileSync(path) : "";

/** Hash every file directly inside `directory` that matches `suffix`, in a stable order. */
function hashDirectory(directory: string, suffix: string): string {
  if (!existsSync(directory)) return "";
  return digest(
    ...readdirSync(directory)
      .filter((file) => file.endsWith(suffix))
      .sort()
      .flatMap((file) => [file, readFileSync(join(directory, file))]),
  );
}

/** Inputs shared by every audited page; changing any of them re-audits every record. */
export function sharedAuditInput(root: string = repositoryRoot): string {
  const automatica11y = JSON.parse(
    readFileSync(
      join(
        dirname(fileURLToPath(import.meta.resolve("automatica11y/package.json"))),
        "package.json",
      ),
      "utf8",
    ),
  ) as { version: string };
  return digest(
    automatica11y.version,
    readFileSync(join(packageRoot, "scripts/audit-accessibility.ts")),
    readFileSync(join(packageRoot, "scripts/audit-matrix.ts")),
    readFileSync(join(packageRoot, "scripts/audit-plugin-components.ts")),
    hashDirectory(join(root, "formats/css/dist"), ".css"),
    base.rules("instui-"),
    ...DECLARATIONS.map((declaration) => declaration.rules("instui-")),
  );
}

/** One fingerprint per audited record name. */
export function auditFingerprints(root: string = repositoryRoot): Record<string, string> {
  const shared = sharedAuditInput(root);
  return Object.fromEntries(
    auditRecords()
      .map((record) => {
        const dist = join(root, "formats/components/dist", `${record.name}.css`);
        const behavior = join(root, "formats/interactions/dist", `${record.name}.iife.js`);
        return [
          record.name,
          digest(shared, record.rules("instui-"), readIfPresent(dist), readIfPresent(behavior)),
        ] as const;
      })
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(auditFingerprints()));
}
