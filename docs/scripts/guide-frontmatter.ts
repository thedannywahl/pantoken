/** Utilities for translated guide Markdown frontmatter. */

const FRONTMATTER_BOUNDARY = "---";
const PLAIN_SCALAR_WITH_MAPPING_COLON = /:(?:\s|$)/u;
const FRONTMATTER_SCALAR_LINE = /^(\s*(?:-\s*)?[A-Za-z][\w-]*:\s*)(\S.*)$/u;

const isQuotedOrStructuredYamlValue = (value: string): boolean => /^["'[{|>]/u.test(value);

const quoteYamlString = (value: string): string => JSON.stringify(value);

/**
 * Quote translated frontmatter scalars that would otherwise be parsed as malformed YAML.
 *
 * Whole-guide translation can rewrite the leading frontmatter block directly, so guard the Markdown
 * writer boundary against translated strings such as `Canvas: Remote-Code-Ausfuehrung`.
 */
export function sanitizeGuideFrontmatter(source: string): string {
  const lines = source.split("\n");
  if (lines[0] !== FRONTMATTER_BOUNDARY) return source;
  const end = lines.findIndex((line, index) => index > 0 && line === FRONTMATTER_BOUNDARY);
  if (end < 0) return source;

  for (let index = 1; index < end; index += 1) {
    const match = FRONTMATTER_SCALAR_LINE.exec(lines[index]);
    if (!match) continue;
    const [, prefix, value] = match;
    if (isQuotedOrStructuredYamlValue(value) || !PLAIN_SCALAR_WITH_MAPPING_COLON.test(value)) {
      continue;
    }
    lines[index] = `${prefix}${quoteYamlString(value)}`;
  }

  return lines.join("\n");
}
