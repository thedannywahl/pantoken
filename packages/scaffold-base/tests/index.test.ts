import { expect, test } from "vite-plus/test";
import { blockCssdoc, getWrapperContext } from "../src/index.ts";

test("blockCssdoc produces the shared cssdoc.json file", () => {
  const production = blockCssdoc.produce({ options: { name: "test-app", preset: "test" } });

  expect(production.files?.["cssdoc.json"]).toContain(
    '"$schema": "https://cssdoc.dev/cssdoc.schema.json"',
  );
  expect(production.files?.["cssdoc.json"]).toContain('"modifierConvention": "rscss"');
});

test("getWrapperContext derives the wrapper layout's root class and container markup", () => {
  const context = getWrapperContext();

  expect(context.wrapperRootClass).toBeTruthy();
  expect(context.wrapperContainerHtml()).toContain('class="');
  expect(context.wrapperContainerJsx()).toContain('className="');
});
