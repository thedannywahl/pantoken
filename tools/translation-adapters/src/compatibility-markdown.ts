import {
  generatedFileMarkdown,
  restoreGeneratedMarkdown,
  scopeGeneratedMarkdown,
  type GeneratedMarkdown,
} from "./generated-values.ts";

const TABLE_SLOT = /\{\{ptk_table_(\d+)\}\}/gu;
const CODE_SLOT = /\{\{ptk_code_(\d+)\}\}/gu;
const SCAFFOLD = "<!-- pantoken-compatibility-scaffold -->\n";

interface Row {
  generated: GeneratedMarkdown;
  originalSlots: number[];
}

interface Table {
  header: string;
  separator: string;
  rows: Row[];
}

/** Independently translated prose, table headers, and identity-scoped table rows. */
export interface CompatibilityMarkdown {
  scaffold: string;
  tables: Table[];
}

const cells = (line: string): string[] =>
  line
    .trim()
    .slice(1, -1)
    .split(/(?<!\\)\|/u)
    .map((cell) => cell.trim());

function tableLines(source: string): Array<{ start: number; end: number; lines: string[] }> {
  const lines = source.split("\n");
  const tables: Array<{ start: number; end: number; lines: string[] }> = [];
  for (let index = 0; index < lines.length; index++) {
    if (
      !lines[index].startsWith("|") ||
      !lines[index + 1]?.startsWith("|") ||
      !cells(lines[index + 1]).every((cell) => /^:?-+:?$/u.test(cell))
    )
      continue;
    const start = index;
    while (index < lines.length && lines[index].startsWith("|")) index++;
    tables.push({ start, end: index, lines: lines.slice(start, index) });
    index--;
  }
  return tables;
}

/** Extract compatibility tables as stable, independently translatable units. */
export function compatibilityMarkdown(source: string): CompatibilityMarkdown {
  const whole = generatedFileMarkdown(source);
  const sourceTables = tableLines(source);
  const templateTables = tableLines(whole.template);
  if (sourceTables.length !== templateTables.length)
    throw new Error("Compatibility table structure changed while extracting values");
  const keys = new Set<string>();
  const tables = templateTables.map((table, tableIndex): Table => {
    const original = sourceTables[tableIndex];
    if (table.lines.length !== original.lines.length)
      throw new Error("Compatibility table row count changed while extracting values");
    const rows = table.lines.slice(2).map((line, rowIndex): Row => {
      const identity = cells(original.lines[rowIndex + 2])[0];
      if (!/^`[^`]+`$/u.test(identity))
        throw new Error(`Compatibility row lacks a code identifier: ${identity}`);
      const scope = `compatibility/${tableIndex}/${identity}`;
      if (keys.has(scope)) throw new Error(`Duplicate compatibility row: ${identity}`);
      keys.add(scope);
      const originalSlots: number[] = [];
      const template = line.replace(CODE_SLOT, (_, slot: string) => {
        const index = Number(slot);
        const local = originalSlots.push(index) - 1;
        return `{{ptk_code_${local}}}`;
      });
      return {
        generated: scopeGeneratedMarkdown(
          { template, values: originalSlots.map((slot) => whole.values[slot]) },
          scope,
        ),
        originalSlots,
      };
    });
    return { header: table.lines[0], separator: table.lines[1], rows };
  });
  const lines = whole.template.split("\n");
  for (let index = templateTables.length - 1; index >= 0; index--) {
    const table = templateTables[index];
    lines.splice(table.start, table.end - table.start, `{{ptk_table_${index}}}`);
  }
  return { scaffold: SCAFFOLD + lines.join("\n"), tables };
}

/** Validate the translated page skeleton before saving or rendering it. */
export function assertCompatibilityScaffold(source: string, translated: string): void {
  if (!source.startsWith(SCAFFOLD)) return;
  if (!translated.startsWith(SCAFFOLD)) throw new Error("Missing compatibility scaffold marker");
  const expected = [...source.matchAll(TABLE_SLOT)].map((match) => match[1]);
  const actual = [...translated.matchAll(TABLE_SLOT)].map((match) => match[1]);
  if (
    expected.length !== actual.length ||
    new Set(actual).size !== actual.length ||
    expected.some((slot) => !actual.includes(slot)) ||
    translated.replace(TABLE_SLOT, "").includes("{{ptk_table_")
  )
    throw new Error("Missing or invalid compatibility table placeholders");
}

/** Reject row translations that move machine values between table columns. */
export function assertCompatibilityRow(source: string, translated: string): void {
  if (!source.startsWith("<!-- pantoken-value-scope:compatibility%2F")) return;
  const sourceRow = source.slice(source.indexOf("\n") + 1);
  const translatedRow = translated.slice(translated.indexOf("\n") + 1).trimEnd();
  const sourceCells = cells(sourceRow);
  const translatedCells = cells(translatedRow);
  if (
    !sourceRow.startsWith("|") ||
    !translatedRow.startsWith("|") ||
    translatedRow.includes("\n") ||
    sourceCells.length !== translatedCells.length ||
    sourceCells.some((cell, index) => {
      const slots = (text: string): string[] =>
        [...text.matchAll(CODE_SLOT)].map((match) => match[1]).sort();
      return JSON.stringify(slots(cell)) !== JSON.stringify(slots(translatedCells[index]));
    })
  )
    throw new Error("Compatibility translation changed table columns or value bindings");
}

/** Reject malformed translated table headers. */
export function assertCompatibilityHeader(source: string, translated: string): void {
  const header = translated.trimEnd();
  if (
    !source.startsWith("|") ||
    !header.startsWith("|") ||
    !header.endsWith("|") ||
    header.includes("\n") ||
    cells(header).length !== cells(source).length
  )
    throw new Error("Compatibility translation changed table headers");
}

/** List the independently reviewed catalog keys for a compatibility page. */
export function compatibilityUnits(page: CompatibilityMarkdown): string[] {
  return [
    page.scaffold,
    ...page.tables.flatMap((table) => [
      table.header,
      ...table.rows.map((row) => row.generated.template),
    ]),
  ];
}

/** Compare generated pages without treating table padding as a content change. */
export function equivalentCompatibilityPages(left: string, right: string): boolean {
  const normalize = (source: string): string => {
    const lines = source.split("\n");
    for (const table of tableLines(source)) {
      for (let index = table.start; index < table.end; index++) {
        const row = cells(lines[index]);
        lines[index] = row
          .map((cell) => (index === table.start + 1 ? cell.replace(/-+/u, "---") : cell))
          .join("|");
      }
    }
    return lines.join("\n");
  };
  return normalize(left) === normalize(right);
}

/** Render current machine values into reviewed prose and row translations. */
export function renderCompatibility(
  page: CompatibilityMarkdown,
  resolve: (source: string) => string,
): string {
  const scaffold = resolve(page.scaffold);
  assertCompatibilityScaffold(page.scaffold, scaffold);
  const tables = page.tables.map((table) => {
    const header = resolve(table.header).trimEnd();
    assertCompatibilityHeader(table.header, header);
    return [
      header,
      table.separator,
      ...table.rows.map((row) => {
        const translation = resolve(row.generated.template).trimEnd();
        assertCompatibilityRow(row.generated.template, translation);
        return restoreGeneratedMarkdown(translation, row.generated);
      }),
    ].join("\n");
  });
  return scaffold.slice(SCAFFOLD.length).replace(TABLE_SLOT, (_, index: string) => {
    const table = tables[Number(index)];
    if (table === undefined) throw new Error(`Unknown compatibility table: ${index}`);
    return table;
  });
}

/** Split a reviewed whole-page translation into its independently reviewed units. */
export function migrateCompatibilityTranslation(
  source: string,
  translated: string,
): Map<string, string> {
  const whole = generatedFileMarkdown(source);
  const page = compatibilityMarkdown(source);
  restoreGeneratedMarkdown(translated, whole);
  const translatedTables = tableLines(translated);
  if (translatedTables.length !== page.tables.length)
    throw new Error("Translated compatibility table count differs");
  const output = new Map<string, string>();
  const put = (sourceUnit: string, translation: string): void => {
    const previous = output.get(sourceUnit);
    if (previous !== undefined && previous !== translation)
      throw new Error(`Conflicting compatibility translation: ${sourceUnit.slice(0, 100)}`);
    output.set(sourceUnit, translation);
  };
  const lines = translated.split("\n");
  for (let index = translatedTables.length - 1; index >= 0; index--) {
    const table = translatedTables[index];
    lines.splice(table.start, table.end - table.start, `{{ptk_table_${index}}}`);
  }
  const scaffold = SCAFFOLD + lines.join("\n");
  assertCompatibilityScaffold(page.scaffold, scaffold);
  put(page.scaffold, scaffold);
  page.tables.forEach((table, tableIndex) => {
    const translatedTable = translatedTables[tableIndex];
    if (translatedTable.lines.length !== table.rows.length + 2)
      throw new Error(`Translated compatibility table ${tableIndex} row count differs`);
    assertCompatibilityHeader(table.header, translatedTable.lines[0]);
    put(table.header, translatedTable.lines[0]);
    table.rows.forEach((row, rowIndex) => {
      const translatedRow = translatedTable.lines[rowIndex + 2];
      const mapped = translatedRow.replace(CODE_SLOT, (_, slot: string) => {
        const index = row.originalSlots.indexOf(Number(slot));
        if (index < 0) throw new Error("Translated compatibility row changed identity");
        return `{{ptk_code_${index}}}`;
      });
      const prefix = row.generated.template.match(/^<!-- pantoken-value-scope:[^\n]+ -->\n/u)?.[0];
      const translation = (prefix ?? "") + mapped;
      assertCompatibilityRow(row.generated.template, translation);
      restoreGeneratedMarkdown(translation, row.generated);
      put(row.generated.template, translation);
    });
  });
  return output;
}

/** Reuse identical, unanimously reviewed row wording within the same table. */
export function reuseCompatibilityRows(
  page: CompatibilityMarkdown,
  translations: Map<string, string>,
): void {
  for (const [tableIndex, table] of page.tables.entries()) {
    const scopePrefix = `<!-- pantoken-value-scope:compatibility%2F${tableIndex}%2F`;
    const withoutScope = (value: string): string => value.replace(/^.*\n/u, "");
    for (const row of table.rows) {
      const key = row.generated.template;
      if (translations.has(key) || !key.startsWith(scopePrefix)) continue;
      const matches = [...translations]
        .filter(
          ([candidate]) =>
            candidate.startsWith(scopePrefix) && withoutScope(candidate) === withoutScope(key),
        )
        .map(([, translation]) => withoutScope(translation));
      if (matches.length === 0 || new Set(matches).size !== 1) continue;
      const prefix = key.slice(0, key.indexOf("\n") + 1);
      const translation = prefix + matches[0];
      assertCompatibilityRow(key, translation);
      restoreGeneratedMarkdown(translation, row.generated);
      translations.set(key, translation);
    }
  }
}
