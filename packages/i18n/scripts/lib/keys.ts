/**
 * Translatable string keys and their English source values, auto-discovered
 * from every `src/i18n.json` in the monorepo. Each package that ships one
 * contributes its keys automatically — no manual registry needed.
 *
 * To add strings from a new package, create `src/i18n.json` there.
 * The keys are merged into a single flat record; use unique key names to
 * avoid collisions across packages.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { discoverStringSources } from "./discover-sources.ts";

/**
 * Content-addressed cache key for an English source string.
 * Lives here (not in translation-memory.ts) so check-bundle-drift can import it
 * without requiring the translation-adapters package to be built.
 */
export function keyFor(stringKey: string, englishValue: string): string {
  return createHash("sha256").update(`wc\0${stringKey}\0${englishValue}`).digest("hex");
}

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
