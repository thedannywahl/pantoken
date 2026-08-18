import { expect, test } from "vite-plus/test";
import { buttonCss } from "../../src/components/button.ts";
import { viewCss } from "../../src/utilities/view.ts";
import { withSpacingModifierDocs } from "../../src/lib/aliases.ts";

test("withSpacingModifierDocs injects the margin/padding/gap wildcard families", () => {
  const comment = "/**\n * @component thing\n * @summary A thing.\n */";
  const result = withSpacingModifierDocs(comment);
  expect(result).toContain("@modifier -m* —");
  expect(result).toContain("@modifier -margin* —");
  expect(result).toContain("@modifier -p* —");
  expect(result).toContain("@modifier -padding* —");
  expect(result).toContain("@modifier -gap* —");
});

test("withSpacingModifierDocs is idempotent and no-ops on an empty comment", () => {
  const comment = "/**\n * @component thing\n * @summary A thing.\n */";
  const once = withSpacingModifierDocs(comment);
  expect(withSpacingModifierDocs(once)).toBe(once);
  expect(withSpacingModifierDocs("")).toBe("");
});

test("components and the view utility document the spacing/gap wildcard families", () => {
  expect(buttonCss({ prefix: "instui" })).toContain("@modifier -m* —");
  expect(viewCss({ prefix: "instui" })).toContain("@modifier -gap* —");
});
