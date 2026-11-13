import { MessageProcessor } from "@a2ui/web_core";
import { basicCatalog } from "@a2ui/web_core/catalogs/basic/v1";
import documentSchema from "@pantoken/ai/a2ui/catalog-v1.json" with { type: "json" };
import {
  pantokenA2uiCatalog,
  pantokenA2uiComponents,
  registerPantokenA2uiComponents,
} from "@pantoken/web-components/a2ui";
import "@pantoken/css/style.css";

/** A surface produced by the actual A2UI processor. */
export type Surface = NonNullable<ReturnType<MessageProcessor["model"]["getSurface"]>>;

/** Framework-specific surface mounting and teardown. */
export interface RendererHost {
  render(surface: Surface): void;
  destroy(): void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sample(schema: unknown): unknown {
  if (!isRecord(schema)) throw new Error("Missing property schema.");
  if ("const" in schema) return schema.const;
  if ("default" in schema) return structuredClone(schema.default);
  if (Array.isArray(schema.enum)) return schema.enum[0];
  if (typeof schema.$ref === "string") {
    const ref = schema.$ref.split("/").at(-1);
    if (ref === "ChildList") return ["leaf"];
    if (ref === "ComponentId") return "leaf";
    if (ref === "MediaUrl") return "/fixture.svg";
    if (ref === "DynamicString") return "Example";
    if (ref === "DynamicNumber") return 1;
    if (ref === "DynamicBoolean") return false;
    throw new Error(`No fixture generator for ${schema.$ref}.`);
  }
  if (schema.type === "array") {
    const length = typeof schema.minItems === "number" ? schema.minItems : 1;
    return Array.from({ length }, () => sample(schema.items));
  }
  if (schema.type === "object") {
    if (!isRecord(schema.properties) || !Array.isArray(schema.required)) {
      throw new Error("Object fixtures require explicit properties and required keys.");
    }
    const properties = schema.properties;
    return Object.fromEntries(
      schema.required.map((key: unknown) => {
        if (typeof key !== "string") throw new Error("Invalid required property.");
        return [key, sample(properties[key])];
      }),
    );
  }
  if (schema.type === "string") return "Example";
  if (schema.type === "number" || schema.type === "integer") return schema.minimum ?? 1;
  if (schema.type === "boolean") return false;
  throw new Error(`No fixture generator for ${JSON.stringify(schema)}.`);
}

if (!isRecord(documentSchema.components)) throw new Error("Catalog has no components.");
const schemas: Record<string, unknown> = documentSchema.components;
const cases = pantokenA2uiComponents.map(({ name, tagName, schema }) => {
  const definition = schemas[name];
  if (
    !isRecord(definition) ||
    !isRecord(definition.properties) ||
    !Array.isArray(definition.required)
  ) {
    throw new Error(`Missing component contract: ${name}.`);
  }
  const properties = definition.properties;
  const props = Object.fromEntries(
    definition.required
      .filter((key) => key !== "component")
      .map((key: unknown) => {
        if (typeof key !== "string") throw new Error("Invalid required property.");
        return [key, sample(properties[key])];
      }),
  );
  schema.parse(props);
  return { name, tagName, props };
});

registerPantokenA2uiComponents();
const container = document.getElementById("app");
if (!container) throw new Error("Missing app container.");
const framework = new URLSearchParams(location.search).get("framework");
const { createHost } =
  framework === "react"
    ? await import("./react.ts")
    : framework === "angular"
      ? await import("./angular.ts")
      : (() => {
          throw new Error(`Unsupported framework: ${framework}`);
        })();
let host = await createHost(container);
let processor = new MessageProcessor([basicCatalog, pantokenA2uiCatalog]);
let surface: Surface | undefined;
const actions: unknown[] = [];

const api = {
  cases,
  basicCatalogId: basicCatalog.id,
  actions,
  show(components: Record<string, unknown>[], dataModel: Record<string, unknown> = {}) {
    processor = new MessageProcessor([basicCatalog, pantokenA2uiCatalog]);
    actions.length = 0;
    processor.processMessages([
      {
        version: "1.0",
        createSurface: { surfaceId: "test", catalogId: pantokenA2uiCatalog.id, dataModel },
      },
      { version: "1.0", updateComponents: { surfaceId: "test", components } },
    ]);
    surface = processor.model.getSurface("test");
    if (!surface) throw new Error("Surface was not created.");
    surface.onAction.subscribe((action) => {
      actions.push(action);
    });
    host.render(surface);
  },
  send(messages: Parameters<MessageProcessor["processMessages"]>[0]) {
    processor.processMessages(messages);
  },
  data(path: string) {
    if (!surface) throw new Error("No mounted surface.");
    return surface.dataModel.get(path);
  },
  unmount() {
    processor.processMessages([{ version: "1.0", deleteSurface: { surfaceId: "test" } }]);
    host.destroy();
  },
  async remount() {
    host = await createHost(container);
  },
};

declare global {
  interface Window {
    a2uiTest: typeof api;
  }
}
window.a2uiTest = api;
