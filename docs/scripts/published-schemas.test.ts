import { Ajv2020 } from "ajv/dist/2020.js";
import { expect, test } from "vite-plus/test";
import capabilityManifest from "../../formats/interactions/component-capabilities.json" with { type: "json" };
import capabilitySchema from "../../formats/interactions/component-capabilities.schema.json" with { type: "json" };

test("component-capabilities.json conforms to its published schema", () => {
  const validate = new Ajv2020({ strict: false, validateFormats: false }).compile(capabilitySchema);
  expect(validate(capabilityManifest), JSON.stringify(validate.errors)).toBe(true);
});
