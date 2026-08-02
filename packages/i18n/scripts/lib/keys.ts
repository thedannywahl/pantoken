/**
 * Translatable string keys and their English source values, auto-discovered
 * from every `src/i18n.json` in the monorepo. Each package that ships one
 * contributes its keys automatically — no manual registry needed.
 *
 * To add strings from a new package, create `src/i18n.json` there.
 * The keys are merged into a single flat record; use unique key names to
 * avoid collisions across packages.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { discoverStringSources } from "./discover-sources.ts";

const packageRoot = new URL("../..", import.meta.url).pathname;
const monoRoot = resolve(packageRoot, "../..");

const merged: Record<string, string> = {};
for (const source of discoverStringSources(monoRoot)) {
  Object.assign(
    merged,
    JSON.parse(readFileSync(source.absolutePath, "utf8")) as Record<string, string>,
  );
}

/** Merged English source values for every translatable key discovered across all registered packages. */
export const ENGLISH_SOURCES: Record<string, string> = merged;
/** Every translatable key discovered across all registered packages. */
export const TRANSLATABLE_KEYS: readonly string[] = Object.keys(merged);
