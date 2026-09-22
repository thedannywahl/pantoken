const CARDINALITY_PSEUDO = /:(?:one-or-more|more|many|optional|opt|max-\d+)(?=[:.#[\]\s,{)>]|$)/gu;
const CSSDOC_PLACEHOLDER_AT_RULE = /@(?:component|wrapper|variant)\b/gu;

function stripBlock(css: string, atRuleStart: number): { end: number; removed: boolean } {
  const open = css.indexOf("{", atRuleStart);
  if (open === -1) return { end: atRuleStart + 1, removed: false };

  let depth = 0;
  let inString: '"' | "'" | undefined;
  for (let i = open; i < css.length; i++) {
    const char = css[i];
    const prev = css[i - 1];

    if (inString) {
      if (char === inString && prev !== "\\") inString = undefined;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = char;
      continue;
    }
    if (char === "{") depth++;
    if (char !== "}") continue;

    depth--;
    if (depth === 0) return { end: i + 1, removed: true };
  }

  return { end: atRuleStart + 1, removed: false };
}

function stripCssdocPlaceholderAtRules(css: string): string {
  let out = "";
  let cursor = 0;
  CSSDOC_PLACEHOLDER_AT_RULE.lastIndex = 0;

  for (const match of css.matchAll(CSSDOC_PLACEHOLDER_AT_RULE)) {
    const start = match.index ?? 0;
    if (start < cursor) continue;

    const { end, removed } = stripBlock(css, start);
    if (!removed) continue;

    out += css.slice(cursor, start);
    cursor = end;
  }

  return out + css.slice(cursor);
}

/** Remove CSSDoc-only syntax from layout CSS before it ships to browsers or CSS minifiers. */
export function runtimeCss(css: string): string {
  return stripCssdocPlaceholderAtRules(css)
    .replace(/\/\*[\s\S]*?\*\//gu, "")
    .replace(CARDINALITY_PSEUDO, "");
}
