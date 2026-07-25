/**
 * Shared CLI-entry helper for the release scripts, so each doesn't repeat the
 * "run `main()` only when invoked directly" boilerplate.
 *
 * @module
 */
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

/**
 * Whether `metaUrl` is the module executed directly (rather than imported), so a script can guard its
 * `main()` — letting the same file be both a CLI entry and an importable, testable module.
 *
 * @param metaUrl - The caller's `import.meta.url`.
 * @returns True when the process entry file is this module.
 */
export function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  return Boolean(entry) && pathToFileURL(path.resolve(entry)).href === metaUrl;
}

/**
 * Run `main` only when the module is executed directly; log the error and set a non-zero exit code on
 * failure. A no-op when the module is imported (e.g. by a test).
 *
 * @param metaUrl - The caller's `import.meta.url`.
 * @param main - The script's entry point.
 */
export function runAsMain(metaUrl: string, main: () => Promise<void>): void {
  if (!isDirectExecution(metaUrl)) return;
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
