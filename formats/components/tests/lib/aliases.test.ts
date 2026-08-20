import { expect, test } from "vite-plus/test";
import { buttonCss } from "../../src/components/button/index.ts";
import { viewCss } from "../../src/components/view/index.ts";
import { gapCss } from "../../src/utilities/gap/index.ts";
import { spacingUtilitiesCss } from "../../src/utilities/spacing/index.ts";

test("spacing and gap utility records are marked global", () => {
  expect(spacingUtilitiesCss({ prefix: "instui" })).toContain("@global");
  expect(gapCss({ prefix: "instui" })).toContain("@global");
});

test("components and the view utility no longer carry spacing/gap wildcard families", () => {
  expect(buttonCss({ prefix: "instui" })).not.toContain("@modifier -m* —");
  expect(viewCss({ prefix: "instui" })).not.toContain("@modifier -gap* —");
});
