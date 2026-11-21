/** WCAG references contain identifiers, not prose to translate. */
export const isWcagReference = (source: string): boolean =>
  /^WCAG 2\.\d+ \d+\.\d+\.\d+(?:,\s*\d+\.\d+\.\d+)*$/u.test(source.trim());
