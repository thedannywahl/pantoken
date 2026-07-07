import { expect, test } from "vite-plus/test";
import { collectLeaves, referenceToVarName, resolveValue, varName } from "../src/resolve.ts";

test("collectLeaves flattens string and composite leaves, capturing modify", () => {
  const tree = {
    color: {
      white: { value: "#ffffff", type: "color" },
      hover: {
        value: "{color.white}",
        type: "color",
        $extensions: {
          "studio.tokens": { modify: { type: "darken", value: "0.1", space: "hsl" } },
        },
      },
    },
    typography: {
      body: { value: { fontFamily: "Lato", fontSize: "1rem", type: "typography" } },
    },
  };
  const leaves = collectLeaves(tree);
  const byPath = new Map(leaves.map((l) => [l.path.join("."), l]));

  expect(byPath.get("color.white")?.value).toBe("#ffffff");
  expect(byPath.get("color.hover")?.modify).toEqual({
    type: "darken",
    value: 0.1,
    space: "hsl",
    color: undefined,
  });
  expect(byPath.get("typography.body.fontFamily")?.value).toBe("Lato");
  expect(byPath.get("typography.body.fontSize")?.value).toBe("1rem");
  // The composite `type` sub-key is skipped.
  expect(byPath.has("typography.body.type")).toBe(false);
});

test("referenceToVarName discriminates semantic from primitive", () => {
  expect(referenceToVarName("color.white")).toBe("--instui-primitive-color-white");
  expect(referenceToVarName("semantic.color.background.base")).toBe(
    "--instui-color-background-base",
  );
});

test("resolveValue turns references into var() and passes concrete values through", () => {
  expect(resolveValue("{semantic.color.background.base}")).toBe(
    "var(--instui-color-background-base)",
  );
  expect(resolveValue("#ffffff")).toBe("#ffffff");
});

test("varName builds prefixed kebab custom-property names", () => {
  expect(varName("primitive", ["color", "white"])).toBe("--instui-primitive-color-white");
  expect(varName("", ["spacing", "spaceMd"])).toBe("--instui-spacing-space-md");
  expect(varName("component", ["baseButton", "primaryBackground"])).toBe(
    "--instui-component-base-button-primary-background",
  );
});
