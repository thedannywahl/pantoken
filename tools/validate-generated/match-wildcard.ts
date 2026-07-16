/**
 * Match file paths against a single-star wildcard pattern, e.g. `*.css` or `foo-*.css`.
 */
export function matchWildcardFiles(files: readonly string[], pattern: string): string[] {
  const [prefix = "", suffix = ""] = pattern.split("*");
  return files.filter((file) => file.startsWith(prefix) && file.endsWith(suffix));
}
