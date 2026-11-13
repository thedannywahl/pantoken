import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  A2UI_COMPONENTS,
  SAFE_HREF_PATTERN,
  a2uiNameForElement,
  a2uiPropertiesFor,
} from "../../../renderers/web-components/src/a2ui-contracts.ts";
import { ELEMENTS } from "../../../renderers/web-components/src/lib/elements-meta.ts";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = resolve(root, "ai/pantoken-ai/catalogs/pantoken-v1.json");
const outputs = [
  sourcePath,
  resolve(root, "renderers/web-components/src/generated/a2ui-catalog.json"),
  resolve(root, "docs/.vitepress/theme/generated/a2ui-catalog.json"),
  resolve(root, "docs/public/a2ui/catalog.json"),
  resolve(root, "docs/public/a2ui/catalog/v1/catalog.json"),
];

const exportedComponents = new Set(ELEMENTS.map(a2uiNameForElement));
const allowedReferences = new Set([
  "common_types.json#/$defs/Action",
  "common_types.json#/$defs/ChildList",
  "common_types.json#/$defs/ComponentId",
  "common_types.json#/$defs/DynamicBoolean",
  "common_types.json#/$defs/DynamicNumber",
  "common_types.json#/$defs/DynamicString",
  "common_types.json#/$defs/MediaUrl",
]);
const unsafePropertyNames = new Set(["href", "html", "innerhtml", "outerhtml", "src", "url"]);
const safeIdPattern = "^[A-Za-z0-9_-]{1,64}$";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function fail(message: string): never {
  throw new Error(`Invalid Pantoken A2UI catalog: ${message}`);
}

function validateSchema(
  schema: unknown,
  component: string,
  property: string,
  path = `${component}.${property}`,
): void {
  if (!isRecord(schema)) fail(`${path} must be a schema object`);

  if ("$ref" in schema) {
    const ref = schema.$ref;
    if (typeof ref !== "string" || !allowedReferences.has(ref)) {
      fail(`${path} uses an unsupported A2UI reference`);
    }
    if (
      component === "PantokenImg" &&
      property === "src" &&
      ref !== "common_types.json#/$defs/MediaUrl"
    ) {
      fail(`${path} must use the A2UI MediaUrl contract`);
    }
    const allowedKeys = new Set(["$ref", "description"]);
    if (ref === "common_types.json#/$defs/ChildList") {
      allowedKeys.add("minItems");
      allowedKeys.add("maxItems");
      if (!["children", "trayChildren"].includes(property)) {
        fail(`${path} uses ChildList outside a child property`);
      }
    }
    if (ref === "common_types.json#/$defs/DynamicNumber") {
      allowedKeys.add("minimum");
      allowedKeys.add("maximum");
      if (
        ("minimum" in schema && typeof schema.minimum !== "number") ||
        ("maximum" in schema && typeof schema.maximum !== "number") ||
        ("minimum" in schema &&
          "maximum" in schema &&
          (schema.minimum as number) > (schema.maximum as number))
      ) {
        fail(`${path} has invalid dynamic-number bounds`);
      }
    }
    if (ref === "common_types.json#/$defs/Action" && property !== "action") {
      fail(`${path} uses Action outside the action property`);
    }
    if (
      ref === "common_types.json#/$defs/ComponentId" &&
      !["commandTarget", "popoverTarget"].includes(property)
    ) {
      fail(`${path} uses ComponentId outside an invoker target`);
    }
    if (
      ref === "common_types.json#/$defs/MediaUrl" &&
      !(component === "PantokenImg" && property === "src")
    ) {
      fail(`${path} uses MediaUrl outside the sanitized image source`);
    }
    if (Object.keys(schema).some((key) => !allowedKeys.has(key))) {
      fail(`${path} adds unsupported keywords to an A2UI reference`);
    }
    for (const key of ["minItems", "maxItems"]) {
      if (
        key in schema &&
        (typeof schema[key] !== "number" || schema[key] < 1 || schema[key] > 32)
      ) {
        fail(`${path}.${key} must be between 1 and 32`);
      }
    }
    return;
  }

  if (schema.type === "array") {
    const allowedKeys = new Set(["type", "items", "minItems", "maxItems", "description"]);
    if (Object.keys(schema).some((key) => !allowedKeys.has(key))) {
      fail(`${path} adds unsupported array schema keywords`);
    }
    if (
      !Number.isInteger(schema.minItems) ||
      !Number.isInteger(schema.maxItems) ||
      (schema.minItems as number) < 1 ||
      (schema.maxItems as number) > 64 ||
      (schema.minItems as number) > (schema.maxItems as number)
    ) {
      fail(`${path} must have bounded item counts`);
    }
    validateSchema(schema.items, component, property, `${path}[]`);
    return;
  }

  if (schema.type === "object") {
    const allowedKeys = new Set(["type", "properties", "required", "additionalProperties"]);
    const properties = schema.properties;
    if (
      Object.keys(schema).some((key) => !allowedKeys.has(key)) ||
      !isRecord(properties) ||
      schema.additionalProperties !== false
    ) {
      fail(`${path} must be a closed object schema`);
    }
    const required = schema.required;
    if (
      !Array.isArray(required) ||
      !required.every((key) => typeof key === "string" && key in properties)
    ) {
      fail(`${path}.required must name declared properties`);
    }
    for (const [nestedProperty, nestedSchema] of Object.entries(properties)) {
      if (unsafePropertyNames.has(nestedProperty.toLowerCase())) {
        fail(`${path}.${nestedProperty} is not allowed in the A2UI catalog`);
      }
      validateSchema(nestedSchema, component, nestedProperty, `${path}.${nestedProperty}`);
    }
    return;
  }

  const allowedKeys = new Set([
    "type",
    "enum",
    "default",
    "description",
    "pattern",
    "minimum",
    "maximum",
  ]);
  if (Object.keys(schema).some((key) => !allowedKeys.has(key))) {
    fail(`${path} adds unsupported scalar schema keywords`);
  }
  if (schema.type !== "string" && schema.type !== "number" && schema.type !== "boolean") {
    fail(`${path} must use an approved scalar schema`);
  }
  if (schema.type === "string") {
    if (
      "enum" in schema &&
      (!Array.isArray(schema.enum) ||
        schema.enum.length === 0 ||
        !schema.enum.every((value) => typeof value === "string") ||
        new Set(schema.enum).size !== schema.enum.length)
    ) {
      fail(`${path}.enum must contain unique strings`);
    }
    const isSafeLinkHref =
      component === "PantokenLink" && property === "href" && schema.pattern === SAFE_HREF_PATTERN;
    if (
      ("pattern" in schema && schema.pattern !== safeIdPattern && !isSafeLinkHref) ||
      (component === "PantokenLink" && property === "href" && !isSafeLinkHref)
    ) {
      fail(`${path}.pattern is not an approved identifier constraint`);
    }
    if (
      "default" in schema &&
      (typeof schema.default !== "string" ||
        !Array.isArray(schema.enum) ||
        !schema.enum.includes(schema.default))
    ) {
      fail(`${path}.default must be one of its enum values`);
    }
  }
  if (schema.type === "number") {
    if (
      ("minimum" in schema && typeof schema.minimum !== "number") ||
      ("maximum" in schema && typeof schema.maximum !== "number") ||
      ("minimum" in schema &&
        "maximum" in schema &&
        (schema.minimum as number) > (schema.maximum as number))
    ) {
      fail(`${path} has invalid numeric bounds`);
    }
  }
}

/** Build the catalog directly from the exhaustive web-component contracts. */
export function createA2uiCatalogDocument(): JsonRecord {
  const components: JsonRecord = {};
  for (const element of ELEMENTS) {
    const name = a2uiNameForElement(element);
    const contract = A2UI_COMPONENTS[element];
    const properties: JsonRecord = {
      component: { const: name },
      ...a2uiPropertiesFor(contract),
    };
    components[name] = {
      type: "object",
      description: contract.description,
      properties,
      required: ["component", ...(contract.required ?? [])],
      additionalProperties: false,
    };
  }
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://pantoken.app/a2ui/catalog/v1/catalog.json",
    catalogId: "https://pantoken.app/a2ui/catalog/v1/catalog.json",
    protocolVersion: "1.0",
    title: "Pantoken A2UI Catalog",
    description: "A constrained set of Pantoken-styled components for A2UI v1.0 web clients.",
    components,
    $defs: {
      anyComponent: {
        oneOf: Object.keys(components)
          .sort()
          .map((name) => ({
            $ref: `#/components/${name}`,
          })),
        discriminator: { propertyName: "component" },
      },
      anyFunction: { not: {} },
    },
  };
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
  for (const name of Object.keys(components)) {
    if (!exportedComponents.has(name)) {
      fail(`${name} is not a component exported by @pantoken/web-components`);
    }
  }
  const expectedNames = [...exportedComponents].sort();
  const actualNames = Object.keys(components).sort();
  if (
    actualNames.length !== expectedNames.length ||
    actualNames.some((name, index) => name !== expectedNames[index])
  ) {
    fail("components must exactly match all @pantoken/web-components exports");
  }

  for (const [name, component] of Object.entries(components)) {
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
      if (
        property.toLowerCase() !== "component" &&
        unsafePropertyNames.has(property.toLowerCase()) &&
        !(name === "PantokenImg" && property === "src") &&
        !(name === "PantokenLink" && property === "href")
      ) {
        fail(`${name}.${property} is not allowed in the A2UI catalog`);
      }
      if (property === "component") continue;
      validateSchema(definition, name, property);
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

  if (!isRecord(value.$defs) || !isRecord(value.$defs.anyComponent)) {
    fail("$defs.anyComponent must enumerate all catalog components");
  }
  const union = value.$defs.anyComponent.oneOf;
  if (
    !Array.isArray(union) ||
    union.length !== expectedNames.length ||
    !union.every(
      (entry, index) => isRecord(entry) && entry.$ref === `#/components/${expectedNames[index]}`,
    )
  ) {
    fail("$defs.anyComponent must enumerate all catalog components in name order");
  }
  if (
    !isRecord(value.$defs.anyFunction) ||
    !isRecord(value.$defs.anyFunction.not) ||
    Object.keys(value.$defs.anyFunction.not).length !== 0
  ) {
    fail("$defs.anyFunction must disallow executable catalog functions");
  }
}

/** Validate the canonical schema and write or verify its runtime and documentation copies. */
export function generateA2uiCatalog(check: boolean = process.argv.includes("--check")): void {
  const document = createA2uiCatalogDocument();
  validateCatalog(document);
  const output = `${JSON.stringify(document, null, 2)}\n`;

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
