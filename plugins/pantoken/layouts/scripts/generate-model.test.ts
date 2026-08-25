import { expect, test } from "vite-plus/test";
import { buildCssDocModel } from "./generate-model.ts";

test("buildCssDocModel includes the documented wrapper layout record", () => {
  const model = buildCssDocModel();
  const wrapper = model.find((entry) => entry.name === "wrapper");
  expect(wrapper).toBeDefined();
  expect(wrapper?.className).toBeTruthy();
});
