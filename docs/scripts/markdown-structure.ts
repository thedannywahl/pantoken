/** Verify that a translated guide retained the structural elements the writer depends on. */
export const preservesMarkdownStructure = (source: string, translated: string): boolean => {
  const count = (value: string, pattern: RegExp): number => value.match(pattern)?.length ?? 0;
  return (
    count(source, /^#{1,6}\s/gm) === count(translated, /^#{1,6}\s/gm) &&
    count(source, /^```/gm) === count(translated, /^```/gm) &&
    count(source, /^\|.*\|\s*$/gm) === count(translated, /^\|.*\|\s*$/gm)
  );
};
