import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tokens } from "@pantoken/tokens";
import { COMPONENTS } from "../../../formats/components/src/components/index.ts";
import { DECLARATIONS } from "../../../formats/components/src/declarations/index.ts";
import type { Definition } from "../../../formats/components/src/lib/define.ts";
import { RULES } from "../../../formats/components/src/rules/index.ts";
import { UTILITIES } from "../../../formats/components/src/utilities/index.ts";

const CUSTOM_DATA_VERSION = 1.1;
const PREFIX = "instui";
const PREFIX_NS = `${PREFIX}-`;

interface CustomDataValue {
  name: string;
  description?: string;
}

interface HtmlCustomData {
  version: number;
  globalAttributes: Array<{
    name: string;
    description?: string;
    values: CustomDataValue[];
  }>;
}

interface CssCustomData {
  version: number;
  properties: Array<{
    name: string;
    description?: string;
    syntax?: string;
  }>;
  atDirectives: Array<{ name: string; description?: string }>;
  pseudoClasses: Array<{ name: string; description?: string }>;
  pseudoElements: Array<{ name: string; description?: string }>;
}

const DEFINITIONS: readonly Definition[] = [...COMPONENTS, ...UTILITIES, ...RULES, ...DECLARATIONS];

function normalizeClassName(token: string): string | undefined {
  const normalized = token.trim().replace(/^\./u, "");
  if (!normalized) return undefined;
  if (normalized.startsWith(PREFIX_NS) || normalized.startsWith("-")) return normalized;
  return undefined;
}

function extractClassNames(css: string): string[] {
  const found = new Set<string>();
  for (const match of css.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/gu)) {
    const normalized = normalizeClassName(match[1]);
    if (normalized) found.add(normalized);
  }
  return [...found];
}

function classesFromTagLine(tagContent: string): string[] {
  const selectors = new Set<string>();
  for (const token of tagContent.split(/\s+|,/u)) {
    const normalized = normalizeClassName(token);
    if (normalized) selectors.add(normalized);
  }
  return [...selectors];
}

function extractTaggedClasses(css: string): string[] {
  const tagged = new Set<string>();
  for (const match of css.matchAll(/@class\s+([^\n*]+)/gu)) {
    for (const className of classesFromTagLine(match[1])) tagged.add(className);
  }
  for (const match of css.matchAll(/@modifier\s+(-[A-Za-z0-9_-]+)/gu)) {
    const normalized = normalizeClassName(match[1]);
    if (normalized) tagged.add(normalized);
  }
  return [...tagged];
}

function classDescription(definition: Definition, className: string): string {
  const recordLabel = `${definition.kind} ${definition.name}`;
  if (className.startsWith("-")) {
    return `Pantoken modifier class used with ${recordLabel}.`;
  }
  return `Pantoken class from ${recordLabel}.`;
}

function collectClassValues(definitions: readonly Definition[]): CustomDataValue[] {
  const entries = new Map<string, string>();
  for (const definition of definitions) {
    const rendered = definition.rules(PREFIX_NS, { theme: "rebrand" });
    const classes = [...extractClassNames(rendered), ...extractTaggedClasses(rendered)];
    for (const className of classes) {
      if (entries.has(className)) continue;
      entries.set(className, classDescription(definition, className));
    }
  }

  return [...entries.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, description]) => ({ name, description }));
}

/** Build the VS Code HTML custom-data payload: every component/utility class + modifier as a `class` attribute value. */
export function buildHtmlCustomData(
  definitions: readonly Definition[] = DEFINITIONS,
): HtmlCustomData {
  const values = collectClassValues(definitions);
  return {
    version: CUSTOM_DATA_VERSION,
    globalAttributes: [
      {
        name: "class",
        description:
          "Pantoken class and modifier tokens for InstUI-compatible component and utility styling.",
        values,
      },
    ],
  };
}

/** Build the VS Code CSS custom-data payload: every `--instui-*` token as a documented custom property. */
export function buildCssCustomData(): CssCustomData {
  const properties = tokens
    .filter((token) => token.name.startsWith("--instui-"))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((token) => ({
      name: token.name,
      description: `Pantoken token from the ${token.themed ? "themed" : "resolved"} token IR.`,
      syntax: token.syntax !== "*" ? token.syntax : undefined,
    }));

  return {
    version: CUSTOM_DATA_VERSION,
    properties,
    atDirectives: [],
    pseudoClasses: [],
    pseudoElements: [],
  };
}

/** Build and write both VS Code custom-data JSON files to `distDir`, returning their paths and counts. */
export function emitCustomData(distDir: string = join(import.meta.dirname, "..", "dist")): {
  htmlPath: string;
  cssPath: string;
  cssdocPath: string;
  classCount: number;
  propertyCount: number;
} {
  const htmlData = buildHtmlCustomData();
  const cssData = buildCssCustomData();

  const htmlPath = join(distDir, "html-custom-data.json");
  const cssPath = join(distDir, "css-custom-data.json");
  const cssdocPath = join(distDir, "cssdoc-base.json");
  const cssdocTemplatePath = join(import.meta.dirname, "..", "src", "cssdoc-base.json");

  mkdirSync(dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, `${JSON.stringify(htmlData, null, 2)}\n`);
  writeFileSync(cssPath, `${JSON.stringify(cssData, null, 2)}\n`);
  writeFileSync(cssdocPath, readFileSync(cssdocTemplatePath, "utf8"));

  const classValues = htmlData.globalAttributes.find((attr) => attr.name === "class")?.values ?? [];
  return {
    htmlPath,
    cssPath,
    cssdocPath,
    classCount: classValues.length,
    propertyCount: cssData.properties.length,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { classCount, propertyCount } = emitCustomData();
  console.log(
    `pantoken meta: generated VS Code custom data (${classCount} class entries, ${propertyCount} token properties)`,
  );
}
