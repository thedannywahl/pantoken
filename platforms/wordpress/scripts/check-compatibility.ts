import { createRequire } from "node:module";
import { Ajv } from "ajv/dist/ajv.js";
import { byTheme } from "@pantoken/tokens";
import { toThemeJson } from "../src/to-theme-json.ts";

const require = createRequire(import.meta.url);
const AjvDraft04 = require("ajv-draft-04") as typeof import("ajv-draft-04").default;

/** Validate the actual generated theme against a named WordPress release's official schema. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^\d+\.\d+$/u.test(version)) throw new Error(`Invalid WordPress release: ${version}`);
  const response = await fetch(`https://schemas.wp.org/wp/${version}/theme.json`);
  if (!response.ok) throw new Error(`WordPress ${version} schema: HTTP ${response.status}`);
  const schema = (await response.json()) as { $schema: string };
  const validator = schema.$schema.includes("draft-04")
    ? new AjvDraft04({ allErrors: true, strict: false })
    : schema.$schema.includes("draft-07")
      ? new Ajv({ allErrors: true, strict: false })
      : null;
  if (!validator) throw new Error(`Unsupported WordPress schema dialect: ${schema.$schema}`);
  const validate = validator.compile(schema);
  const theme = toThemeJson(byTheme("rebrand"));
  if (!validate(theme)) {
    throw new Error(`WordPress ${version} rejected theme.json: ${JSON.stringify(validate.errors)}`);
  }
  console.log(`✓ WordPress ${version}: theme.json v${theme.version} matches the release schema`);
}

if (process.argv[1] === import.meta.filename) {
  const versions = process.argv.slice(2);
  if (versions.length === 0) throw new Error("Provide WordPress major.minor releases");
  for (const version of versions) await checkCompatibility(version);
}
