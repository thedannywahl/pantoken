/** Helpers for narrowing docs translation runs from environment variables. */

const splitRequestedPaths = (requested: string): string[] =>
  requested
    .split(/[\s,]+/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

const normalizeGuidePath = (path: string): string =>
  path
    .split("\\")
    .join("/")
    .replace(/^\.\//u, "")
    .replace(/^docs\//u, "");

/**
 * Resolve `DOCS_TRANSLATION_FILE` against the known guide Markdown file list.
 * Returns every file when no scope is requested.
 */
export function parseRequestedGuideFiles(
  requested: string | undefined,
  availableFiles: readonly string[],
): string[] {
  if (requested === undefined || requested.trim() === "") return [...availableFiles];

  const available = new Set(availableFiles);
  const normalized = [...new Set(splitRequestedPaths(requested).map(normalizeGuidePath))];
  const unknown = normalized.filter((file) => !available.has(file));
  if (unknown.length > 0) {
    throw new Error(
      `Unknown DOCS_TRANSLATION_FILE value(s): ${unknown.join(", ")}. Supported files: ${availableFiles.join(", ")}`,
    );
  }
  if (normalized.length === 0) {
    throw new Error("DOCS_TRANSLATION_FILE matched no docs guide file");
  }
  return normalized;
}
