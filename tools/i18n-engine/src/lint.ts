import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { checkPoFile } from "./gettext.ts";
import { parsePo } from "./po.ts";
import { parseConfig, type I18nConfig } from "./config.ts";

/** Counts recorded after a successful localization contract validation. */
export interface LintResult {
  checkedSpaces: number;
  checkedLocales: number;
  checkedCatalogs: number;
}

function packageRoot(): string {
  return join(import.meta.dirname, "..");
}

function schema(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(packageRoot(), path), "utf8")) as Record<string, unknown>;
}

function sourceFiles(sourcePath: string): string[] {
  if (!statSync(sourcePath).isDirectory()) return [sourcePath];
  return readdirSync(sourcePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(sourcePath, entry.name, "i18n.json"));
}

function resolvePattern(pattern: string, space: string, locale?: string): string {
  return pattern.replace("{space}", space).replace("{locale}", locale ?? "{locale}");
}

function validateJson(
  ajv: Ajv2020,
  validator: ValidateFunction,
  path: string,
  errors: string[],
): void {
  const valid = validator(JSON.parse(readFileSync(path, "utf8")));
  if (!valid) {
    errors.push(`${path}: ${ajv.errorsText(validator.errors)}`);
  }
}

function validateUniqueEntries(path: string, errors: string[]): void {
  const seen = new Set<string>();
  for (const entry of parsePo(readFileSync(path, "utf8"))) {
    const key = `${entry.msgctxt ?? ""}\0${entry.msgid}`;
    if (seen.has(key)) errors.push(`${path}: duplicate catalog identity ${JSON.stringify(key)}`);
    seen.add(key);
  }
}

/** Validate the configured localization sources and catalogs. */
export async function runLint(configPath = "i18n.config.json"): Promise<LintResult> {
  const configDir = dirname(configPath);
  const raw = JSON.parse(readFileSync(configPath, "utf8")) as Record<string, unknown>;
  const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
  const configValidator = ajv.compile(schema("i18n.config.schema.json"));
  const sourceValidator = ajv.compile(schema("i18n.source.schema.json"));
  const errors: string[] = [];
  if (!configValidator(raw)) errors.push(`config: ${ajv.errorsText(configValidator.errors)}`);

  const config = parseConfig(raw) as I18nConfig;
  const requiredSpaces = config.requiredSpaces ?? [];
  for (const spaceId of requiredSpaces) {
    const space = config.spaces?.[spaceId];
    if (!space) {
      errors.push(`config: required space "${spaceId}" is not configured`);
      continue;
    }
    if (space.kind === "messages") {
      const sourcePath = join(configDir, space.source);
      if (!existsSync(sourcePath)) errors.push(`${spaceId}: source does not exist: ${sourcePath}`);
      else
        for (const file of sourceFiles(sourcePath)) {
          if (!existsSync(file)) errors.push(`${spaceId}: source does not exist: ${file}`);
          else validateJson(ajv, sourceValidator, file, errors);
        }
    }
    if (space.kind === "content") {
      for (const pattern of space.include) {
        const sourcePath = join(configDir, pattern.replace("/**/*.md", ""));
        if (!existsSync(sourcePath))
          errors.push(`${spaceId}: include path does not exist: ${sourcePath}`);
      }
    }
  }

  const l10nDir = join(configDir, "l10n");
  const locales = existsSync(l10nDir)
    ? readdirSync(l10nDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];
  let checkedCatalogs = 0;
  for (const spaceId of requiredSpaces) {
    const potPath = join(configDir, resolvePattern(config.catalogs.template, spaceId));
    if (!existsSync(potPath)) errors.push(`${spaceId}: missing POT template: ${potPath}`);
    else {
      validateUniqueEntries(potPath, errors);
      checkedCatalogs++;
    }
    for (const locale of locales.filter((value) => value !== config.source)) {
      const poPath = join(configDir, resolvePattern(config.catalogs.target, spaceId, locale));
      if (!existsSync(poPath)) errors.push(`${spaceId}: missing PO catalog: ${poPath}`);
      else {
        validateUniqueEntries(poPath, errors);
        try {
          await checkPoFile(poPath);
        } catch (error) {
          errors.push(`${poPath}: ${error instanceof Error ? error.message : String(error)}`);
        }
        checkedCatalogs++;
      }
    }
  }
  if (errors.length > 0)
    throw new Error(`i18n lint failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  return { checkedSpaces: requiredSpaces.length, checkedLocales: locales.length, checkedCatalogs };
}
