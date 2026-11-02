/** Verify that a translated guide retained the structural elements the writer depends on. */
export const preservesMarkdownStructure = (source: string, translated: string): boolean => {
  const count = (value: string, pattern: RegExp): number => value.match(pattern)?.length ?? 0;
  return (
    count(source, /^#{1,6}\s/gm) === count(translated, /^#{1,6}\s/gm) &&
    count(source, /^```/gm) === count(translated, /^```/gm) &&
    count(source, /^\|.*\|\s*$/gm) === count(translated, /^\|.*\|\s*$/gm)
  );
};

/** Escape bare HTML tags in prose while preserving code and attributed tags. */
export const escapeBareHtmlTags = (text: string): string => {
  const preserved: string[] = [];
  const withoutCode = text.replace(/(?<!`)(`+)(?!`)[\s\S]*?[^`]\1(?!`)/g, (match) => {
    const marker = `__PTK_HTML_SAFE_${preserved.length}__`;
    preserved.push(match);
    return marker;
  });
  const attributedTagNames = new Set(
    [...withoutCode.matchAll(/<([A-Za-z][\w-]*)\s[^>]*>/g)].map((match) => match[1]),
  );
  const pairedTagNames = new Set(
    [...withoutCode.matchAll(/<([A-Za-z][\w-]*)>[^]*?<\/\1>/g)].map((match) => match[1]),
  );
  let escaped = withoutCode.replace(/<\/?([A-Za-z][\w-]*)>/g, (match, name: string) => {
    if (attributedTagNames.has(name) || pairedTagNames.has(name)) return match;
    return match.startsWith("</") ? `&lt;/${name}&gt;` : `&lt;${name}&gt;`;
  });
  for (const [index, block] of preserved.entries()) {
    escaped = escaped.replaceAll(`__PTK_HTML_SAFE_${index}__`, block);
  }
  return escaped;
};
