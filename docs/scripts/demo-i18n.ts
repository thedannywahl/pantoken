/** Load a demo's adjacent i18n source and render its Handlebars-style placeholders. */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  parseI18nSource,
  type ParsedI18nSource,
  type RawI18nSource,
} from "@pantoken/translation-adapters";

const PLACEHOLDER = /{{([a-z][\w-]*)}}/g;
const ASSET_FILES = ["style.css", "script.js"] as const;

/** Parsed i18n data and source assets for a component demo. */
export interface DemoI18nSource {
  template: string;
  assets: Partial<Record<(typeof ASSET_FILES)[number], string>>;
  strings: ParsedI18nSource["strings"];
  verbatim: ParsedI18nSource["verbatim"];
}

/** List component names with a `demos/<component>/index.html` source. */
export function listDemoNames(demoDir: string): string[] {
  return readdirSync(demoDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();
}

/** Validate a parsed demo i18n source against its HTML template. */
export function validateDemoI18n(
  template: string,
  raw: RawI18nSource,
  assets: Partial<Record<(typeof ASSET_FILES)[number], string>> = {},
): DemoI18nSource {
  const { strings, verbatim } = parseI18nSource(raw);
  const placeholders = new Set(
    [template, ...Object.values(assets)].flatMap((source) =>
      [...source.matchAll(PLACEHOLDER)].map((match) => match[1]),
    ),
  );

  for (const key of placeholders) {
    if (!(key in strings)) throw new Error(`Missing demo i18n key '${key}'.`);
  }
  for (const key of Object.keys(strings)) {
    if (!placeholders.has(key)) throw new Error(`Unused demo i18n key '${key}'.`);
  }

  return { template, assets, strings, verbatim };
}

/** Read `demos/<component>/index.html` and its adjacent `i18n.json`. */
export function loadDemoI18n(directory: string): DemoI18nSource {
  const template = readFileSync(join(directory, "index.html"), "utf8");
  const assets = Object.fromEntries(
    ASSET_FILES.filter((file) => existsSync(join(directory, file))).map((file) => [
      file,
      readFileSync(join(directory, file), "utf8"),
    ]),
  );
  const raw = JSON.parse(readFileSync(join(directory, "i18n.json"), "utf8")) as RawI18nSource;
  return validateDemoI18n(template, raw, assets);
}

/** Replace `{{key}}` placeholders with localized strings. */
export function renderDemoI18n(template: string, strings: Record<string, string>): string {
  return template.replace(PLACEHOLDER, (_match, key: string) => strings[key] ?? `{{${key}}}`);
}
