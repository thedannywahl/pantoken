import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { ELEMENTS } from "../../../renderers/web-components/src/lib/elements-meta.ts";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = resolve(root, "ai/pantoken-ai/catalogs/pantoken-v1.json");
const outputs = [
  resolve(root, "renderers/web-components/src/generated/a2ui-catalog.json"),
  resolve(root, "docs/.vitepress/theme/generated/a2ui-catalog.json"),
  resolve(root, "docs/public/a2ui/catalog.json"),
];

const exportedComponents = new Set(
  ELEMENTS.map(
    (element) =>
      `Pantoken${element
        .split("-")
        .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
        .join("")}`,
  ),
);
const allowedReferences = new Set([
  "common_types.json#/$defs/Action",
  "common_types.json#/$defs/DynamicString",
]);
const unsafePropertyNames = new Set(["href", "src", "url", "html", "innerhtml", "outerhtml"]);

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function fail(message: string): never {
  throw new Error(`Invalid Pantoken A2UI catalog: ${message}`);
}

/** Reject catalog changes that exceed the published A2UI v1 component contract. */
export function validateCatalog(value: unknown): asserts value is JsonRecord {
  if (!isRecord(value)) fail("expected an object");
  if (value.protocolVersion !== "1.0") fail("protocolVersion must be 1.0");
  if (
    value.catalogId !== "https://pantoken.app/a2ui/catalog/v1/catalog.json" ||
    value.$id !== value.catalogId
  ) {
    fail("catalogId and $id must use the versioned v1 catalog URI");
  }
  const components = value.components;
  if (!isRecord(components)) fail("components must be an object");
  if ("functions" in value) fail("Pantoken does not publish executable catalog functions");
  if (Object.keys(components).length === 0) fail("components must not be empty");

  for (const [name, component] of Object.entries(components)) {
    if (!exportedComponents.has(name)) {
      fail(`${name} is not a component exported by @pantoken/web-components`);
    }
    if (!isRecord(component) || component.type !== "object" || !isRecord(component.properties)) {
      fail(`${name} must declare a properties object`);
    }
    if (component.additionalProperties !== false) {
      fail(`${name} must reject properties outside its allowlist`);
    }
    const properties = component.properties;
    const selector = properties.component;
    if (
      !isRecord(selector) ||
      selector.const !== name ||
      Object.keys(selector).some((key) => !["const", "description"].includes(key))
    ) {
      fail(`${name}.component must be the ${name} constant`);
    }
    for (const [property, definition] of Object.entries(properties)) {
      if (!isRecord(definition)) fail(`${name}.${property} must be a property schema`);
      if (
        property.toLowerCase() !== "component" &&
        unsafePropertyNames.has(property.toLowerCase())
      ) {
        fail(`${name}.${property} is not allowed in the A2UI catalog`);
      }
      if (property === "component") continue;
      if ("$ref" in definition) {
        if (
          Object.keys(definition).some((key) => !["$ref", "description"].includes(key)) ||
          typeof definition.$ref !== "string" ||
          !allowedReferences.has(definition.$ref) ||
          (definition.$ref === "common_types.json#/$defs/Action" && property !== "action") ||
          (definition.$ref === "common_types.json#/$defs/DynamicString" && property === "action")
        ) {
          fail(`${name}.${property} uses an unsupported A2UI reference`);
        }
        continue;
      }
      if (
        Object.keys(definition).some(
          (key) => !["type", "enum", "default", "description"].includes(key),
        ) ||
        definition.type !== "string" ||
        !Array.isArray(definition.enum) ||
        definition.enum.length === 0 ||
        !definition.enum.every((value) => typeof value === "string") ||
        new Set(definition.enum).size !== definition.enum.length
      ) {
        fail(`${name}.${property} must use a string enum or an approved A2UI reference`);
      }
      if (property === "action") {
        fail(`${name}.action must use the A2UI Action contract`);
      }
      if (
        "default" in definition &&
        (typeof definition.default !== "string" || !definition.enum.includes(definition.default))
      ) {
        fail(`${name}.${property} default must be one of its enum values`);
      }
    }
    const required = component.required;
    if (
      !Array.isArray(required) ||
      !required.every((property) => typeof property === "string" && property in properties) ||
      new Set(required).size !== required.length ||
      !required.includes("component")
    ) {
      fail(`${name}.required must contain unique declared properties, including component`);
    }
  }
}

/** Validate the canonical schema and write or verify its runtime and documentation copies. */
export function generateA2uiCatalog(check: boolean = process.argv.includes("--check")): void {
  const source = readFileSync(sourcePath, "utf8");
  const parsed: unknown = JSON.parse(source);
  validateCatalog(parsed);
  const output = `${JSON.stringify(parsed, null, 2)}\n`;

  for (const path of outputs) {
    if (check) {
      let existing: string;
      try {
        existing = readFileSync(path, "utf8");
      } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
          throw new Error(`Generated A2UI catalog is missing: ${path}`);
        }
        throw error;
      }
      if (existing !== output) throw new Error(`Generated A2UI catalog is stale: ${path}`);
      continue;
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, output);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateA2uiCatalog();
}
