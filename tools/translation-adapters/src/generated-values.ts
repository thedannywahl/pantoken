/** A generated Markdown unit's stable prose template and its verbatim code bindings. */
export interface GeneratedMarkdown {
  template: string;
  values: readonly string[];
  scope?: string;
}
interface GeneratedOptions {
  tables?: boolean;
  tableValuesOnly?: boolean;
  versionValues?: boolean;
}

const PLACEHOLDER = /\{\{ptk_code_(\d+)\}\}/gu;
const RESERVED = "{{ptk_code_";
const SCOPE = /^<!-- pantoken-value-scope:([^\n]+) -->\n/u;
const CODE_SPAN = /(?<![\\`])(`+)(?!`)([^\n]*?)\1(?!`)/gu;
/** Explicit opt-in for whole-file generated translation templates. */
export const GENERATED_VALUES_MARKER = "<!-- pantoken-generated-values -->";

/** Keep existing per-page wording distinct when different machine values share a prose template. */
export function scopeGeneratedMarkdown(
  generated: GeneratedMarkdown,
  scope?: string,
): GeneratedMarkdown {
  if (scope === undefined || generated.values.length === 0) return generated;
  const encoded = encodeURIComponent(scope);
  return {
    ...generated,
    scope: encoded,
    template: `<!-- pantoken-value-scope:${encoded} -->\n${generated.template}`,
  };
}

/** Whole-file sources explicitly marked by their generator opt into code-value templates. */
export function generatedFileMarkdown(source: string): GeneratedMarkdown {
  return source.includes(GENERATED_VALUES_MARKER)
    ? generatedMarkdown(source.replace(`${GENERATED_VALUES_MARKER}\n`, ""), {
        tables: true,
        tableValuesOnly: true,
      })
    : { template: source, values: [] };
}

/** Normalize only generated GFM table padding, after code values have been removed. */
function compactTables(source: string): string {
  const lines = source.split("\n");
  let inTable = false;
  return lines
    .map((line, index) => {
      const isRow = line.startsWith("|") && line.trimEnd().endsWith("|");
      if (!isRow) {
        inTable = false;
        return line;
      }
      const cells = (value: string): string[] =>
        value
          .trim()
          .slice(1, -1)
          .split(/(?<!\\)\|/u)
          .map((cell) => cell.trim());
      const separator = (value: string): boolean =>
        value.startsWith("|") && cells(value).every((cell) => /^:?-+:?$/u.test(cell));
      if (!inTable && !separator(lines[index + 1] ?? "")) return line;
      inTable = true;
      return `| ${cells(line)
        .map((cell) => (/^:?-+:?$/u.test(cell) ? cell.replace(/-+/u, "---") : cell))
        .join(" | ")} |`;
    })
    .join("\n");
}

/**
 * Opt a generated unit into stable code-value placeholders. Callers must not use this on authored
 * prose indiscriminately. Fenced examples remain untouched; HTML/code-only segments are already
 * preserved by the segmenter.
 */
export function generatedMarkdown(
  source: string,
  options: GeneratedOptions = {},
): GeneratedMarkdown {
  if (source.includes(RESERVED))
    throw new Error("Generated Markdown contains reserved placeholders");
  if (options.tableValuesOnly) return generatedTableMarkdown(source);
  const values: string[] = [];
  let fence: { character: string; length: number } | undefined;
  const template = source
    .split("\n")
    .map((line) => {
      const marker = /^\s{0,3}(`{3,}|~{3,})/u.exec(line)?.[1];
      if (marker) {
        if (!fence) fence = { character: marker[0], length: marker.length };
        else if (
          marker[0] === fence.character &&
          marker.length >= fence.length &&
          line.trim() === marker
        )
          fence = undefined;
        return line;
      }
      if (fence) return line;
      const code = line.replace(CODE_SPAN, (span) => {
        const index = values.push(span) - 1;
        return `{{ptk_code_${index}}}`;
      });
      const links = code.replace(/\]\(([^)\n]+)\)/gu, (_, destination: string) => {
        const index = values.push(destination) - 1;
        return `]({{ptk_code_${index}}})`;
      });
      if (!options.versionValues) return links;
      return links.replace(/(?<![\w{])v?\d+(?:\.\d+)*(?![\w}])/gu, (version) => {
        const index = values.push(version) - 1;
        return `{{ptk_code_${index}}}`;
      });
    })
    .join("\n");
  return { template: options.tables ? compactTables(template) : template, values };
}

const tableCells = (line: string): string[] =>
  line
    .trim()
    .slice(1, -1)
    .split(/(?<!\\)\|/u)
    .map((cell) => cell.trim());

function generatedTableMarkdown(source: string): GeneratedMarkdown {
  const values: string[] = [];
  let versionColumn = -1;
  const template = source
    .split("\n")
    .map((line) => {
      if (!line.startsWith("|")) {
        versionColumn = -1;
        return line;
      }
      const cells = tableCells(line);
      if (cells.includes("Current format")) versionColumn = cells.indexOf("Current format");
      const rendered = cells.map((cell, index) => {
        const generated = generatedMarkdown(cell, { versionValues: index === versionColumn });
        const offset = values.length;
        values.push(...generated.values);
        return generated.template.replace(
          PLACEHOLDER,
          (_, slot: string) => `{{ptk_code_${offset + Number(slot)}}}`,
        );
      });
      return `| ${rendered.join(" | ")} |`;
    })
    .join("\n");
  return { template: compactTables(template), values };
}

/** Restore this unit's current values, rejecting lost, duplicated, unknown, or malformed slots. */
export function restoreGeneratedMarkdown(translated: string, generated: GeneratedMarkdown): string {
  if (generated.scope !== undefined) {
    const prefix = `<!-- pantoken-value-scope:${generated.scope} -->\n`;
    if (!translated.startsWith(prefix))
      throw new Error("Missing or changed generated Markdown scope");
    translated = translated.slice(prefix.length);
    if (SCOPE.test(translated)) throw new Error("Duplicated generated Markdown scope");
  }
  const seen = new Set<number>();
  const restored = translated.replace(PLACEHOLDER, (_, rawIndex: string) => {
    const index = Number(rawIndex);
    if (String(index) !== rawIndex || index >= generated.values.length || seen.has(index))
      throw new Error(`Invalid generated Markdown placeholder: ${rawIndex}`);
    seen.add(index);
    return generated.values[index];
  });
  if (seen.size !== generated.values.length || restored.includes(RESERVED))
    throw new Error("Missing or malformed generated Markdown placeholders");
  return restored;
}

/** Validate a catalog template and translation before using either with current value bindings. */
export function assertGeneratedTranslation(template: string, translation: string): void {
  const generated = {
    template,
    values: [...template.matchAll(PLACEHOLDER)].map(() => ""),
    scope: SCOPE.exec(template)?.[1],
  };
  restoreGeneratedMarkdown(template, generated);
  restoreGeneratedMarkdown(translation, generated);
}

/**
 * Convert a literal legacy translation without asking a provider. Exact code-span identity permits
 * translator reordering. Equal source spans have indistinguishable identities: refuse to guess.
 */
export function migrateGeneratedMarkdown(
  source: string,
  translation: string,
  options: GeneratedOptions = {},
): string {
  const generated = generatedMarkdown(source, options);
  if (generated.values.length === 0) return translation;
  if (source === translation) return generated.template;
  if (options.tableValuesOnly) return migrateTableValues(source, translation, generated);
  if (new Set(generated.values).size !== generated.values.length)
    throw new Error("Ambiguous repeated code values in legacy translation");
  const translated = generatedMarkdown(translation, options);
  if (
    translated.values.length !== generated.values.length ||
    translated.values.some((value) => !generated.values.includes(value))
  )
    throw new Error("Legacy translation changed or lost generated code values");
  const template = translated.template.replace(PLACEHOLDER, (_, index: string) => {
    const sourceIndex = generated.values.indexOf(translated.values[Number(index)]);
    return `{{ptk_code_${sourceIndex}}}`;
  });
  restoreGeneratedMarkdown(template, generated);
  return template;
}

/** GFM columns retain their schema during translation; row identifiers disambiguate equal versions. */
function migrateTableValues(
  source: string,
  translation: string,
  generated: GeneratedMarkdown,
): string {
  const rows = new Map<string, { cells: string[]; offset: number; versionColumn: number }>();
  let offset = 0;
  let versionColumn = -1;
  for (const line of source.split("\n")) {
    if (!line.startsWith("|")) {
      versionColumn = -1;
      continue;
    }
    const cells = tableCells(line);
    if (cells.includes("Current format")) versionColumn = cells.indexOf("Current format");
    const values = generatedMarkdown(line).values;
    if (values.length === 0) continue;
    const key = values[0];
    if (rows.has(key)) throw new Error(`Ambiguous generated table row: ${key}`);
    rows.set(key, { cells, offset, versionColumn });
    offset += cells.reduce(
      (count, cell, index) =>
        count + generatedMarkdown(cell, { versionValues: index === versionColumn }).values.length,
      0,
    );
  }
  const seen = new Set<string>();
  const template = translation
    .split("\n")
    .map((line) => {
      if (!line.startsWith("|")) return line;
      const key = generatedMarkdown(line).values[0];
      if (key === undefined) return line;
      const row = rows.get(key);
      if (!row || seen.has(key))
        throw new Error(`Unknown or duplicated translated table row: ${key}`);
      seen.add(key);
      const translatedCells = tableCells(line);
      if (translatedCells.length !== row.cells.length)
        throw new Error(`Changed generated table columns: ${key}`);
      let slot = row.offset;
      const output = row.cells.map((cell, index) => {
        const options = { versionValues: index === row.versionColumn };
        const migrated = migrateGeneratedMarkdown(cell, translatedCells[index], options);
        const rewritten = migrated.replace(
          PLACEHOLDER,
          (_, value: string) => `{{ptk_code_${slot + Number(value)}}}`,
        );
        slot += generatedMarkdown(cell, options).values.length;
        return rewritten;
      });
      return `| ${output.join(" | ")} |`;
    })
    .join("\n");
  if (seen.size !== rows.size)
    throw new Error("Missing generated table rows in legacy translation");
  const compact = compactTables(template);
  restoreGeneratedMarkdown(compact, generated);
  return compact;
}
