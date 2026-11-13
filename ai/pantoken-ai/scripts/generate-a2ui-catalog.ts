import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = resolve(root, "ai/pantoken-ai/catalogs/pantoken-v1.json");
const outputs = [
  resolve(root, "renderers/web-components/src/generated/a2ui-catalog.json"),
  resolve(root, "docs/.vitepress/theme/generated/a2ui-catalog.json"),
  resolve(root, "docs/public/a2ui/catalog.json"),
];

const allowedComponents = {
  PantokenButton: {
    properties: ["action", "component", "label", "variant"],
    required: ["component", "label"],
    enums: {
      variant: ["primary", "secondary", "tertiary", "success", "danger", "ai", "ai-secondary"],
    },
    selector: "PantokenButton",
  },
  PantokenTooltip: {
    properties: ["action", "component", "placement", "tip", "triggerLabel"],
    required: ["component", "triggerLabel", "tip", "action"],
    enums: { placement: ["top", "bottom", "start", "end"] },
    selector: "PantokenTooltip",
  },
} as const;

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

  const componentNames = Object.keys(allowedComponents);
  if (
    Object.keys(components).length !== componentNames.length ||
    componentNames.some((name) => !(name in components))
  ) {
    fail(`components must be exactly ${componentNames.join(", ")}`);
  }

  for (const [name, contract] of Object.entries(allowedComponents)) {
    const component = components[name];
    if (!isRecord(component) || !isRecord(component.properties)) {
      fail(`${name} must declare a properties object`);
    }
    if (component.additionalProperties !== false) {
      fail(`${name} must reject properties outside its allowlist`);
    }
    const properties = component.properties;
    const selector = properties.component;
    if (!isRecord(selector) || selector.const !== contract.selector) {
      fail(`${name}.component must be the ${contract.selector} constant`);
    }
    const propertyNames = Object.keys(properties).sort();
    if (propertyNames.join(",") !== [...contract.properties].sort().join(",")) {
      fail(`${name} properties must be exactly ${contract.properties.join(", ")}`);
    }
    const required = component.required;
    if (
      !Array.isArray(required) ||
      required.length !== contract.required.length ||
      !contract.required.every((property) => required.includes(property))
    ) {
      fail(`${name} required properties must be exactly ${contract.required.join(", ")}`);
    }
    for (const [property, values] of Object.entries(contract.enums)) {
      const definition = properties[property];
      if (
        !isRecord(definition) ||
        definition.type !== "string" ||
        !Array.isArray(definition.enum)
      ) {
        fail(`${name}.${property} must be an enum`);
      }
      if (definition.enum.join(",") !== values.join(",")) {
        fail(`${name}.${property} enum does not match the renderer allowlist`);
      }
    }
    for (const property of ["label", "triggerLabel", "tip"]) {
      if (!(property in properties)) continue;
      const definition = properties[property];
      if (!isRecord(definition) || definition.$ref !== "common_types.json#/$defs/DynamicString") {
        fail(`${name}.${property} must use A2UI v1.0 DynamicString`);
      }
    }
    if ("action" in properties) {
      const definition = properties.action;
      if (!isRecord(definition) || definition.$ref !== "common_types.json#/$defs/Action") {
        fail(`${name}.action must use the A2UI v1.0 Action contract`);
      }
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
