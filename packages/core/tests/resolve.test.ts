import { expect, test } from "vite-plus/test";
import {
  collectLeaves,
  referencedVarName,
  referenceToVarName,
  resolveValue,
  varName,
} from "../src/resolve.ts";

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
  });
  expect(byPath.get("color.hover")?.type).toBe("color");
  expect(byPath.get("typography.body.fontFamily")?.value).toBe("Lato");
  expect(byPath.get("typography.body.fontSize")?.value).toBe("1rem");
  // The composite `type` sub-key is skipped.
  expect(byPath.has("typography.body.type")).toBe(false);
});

test("collectLeaves returns [] for non-object roots", () => {
  expect(collectLeaves(null)).toEqual([]);
  expect(collectLeaves("scalar")).toEqual([]);
  expect(collectLeaves(["a", "b"])).toEqual([]);
});

test("collectLeaves skips array values, metadata keys, and non-string leaf values", () => {
  const tree = {
    // Array-valued record (box-shadow list) — skipped entirely.
    shadow: { value: ["0 1px 2px"], type: "boxShadow" },
    // Record whose .value is a number, not a string/object — yields no leaf.
    opacity: { value: 0.5, type: "number" },
    // A bare array under a key is not a record — skipped.
    list: ["x", "y"],
    // A normal string leaf still comes through.
    color: { base: { value: "#fff", type: "color" } },
  };
  const leaves = collectLeaves(tree);
  const paths = leaves.map((l) => l.path.join("."));
  expect(paths).toEqual(["color.base"]);
});

test("collectLeaves reports a modify block whose type is invalid", () => {
  const tree = {
    color: {
      x: {
        value: "#fff",
        $extensions: { "studio.tokens": { modify: { type: 123, value: "0.1" } } },
      },
    },
  };
  expect(collectLeaves(tree)[0].modifyIssue?.reason).toContain("modify.type");
});

test("collectLeaves validates every modifier field", () => {
  const cases = [
    [{ type: "mix", value: "0.1", space: "hsl" }, "modify.type"],
    [{ type: "alpha", value: "", space: "hsl" }, "modify.value"],
    [{ type: "alpha", value: "1.01", space: "hsl" }, "modify.value"],
    [{ type: "alpha", value: Number.NaN, space: "hsl" }, "modify.value"],
    [{ type: "alpha", value: "0.1", space: "rgb" }, "modify.space"],
    [{ type: "alpha", value: "0.1", space: "hsl", color: "#fff" }, "unsupported"],
  ] as const;
  for (const [modify, reason] of cases) {
    const [leaf] = collectLeaves({
      color: { value: "#fff", type: "color", $extensions: { "studio.tokens": { modify } } },
    });
    expect(leaf.modify).toBeUndefined();
    expect(leaf.modifyIssue?.reason).toContain(reason);
  }
});

test("collectLeaves accepts modifier boundaries as strings and numbers", () => {
  for (const value of ["0", "0.00", "1", "1.00", 0, 1]) {
    const [leaf] = collectLeaves({
      color: {
        value: "#fff",
        type: "color",
        $extensions: { "studio.tokens": { modify: { type: "alpha", value, space: "hsl" } } },
      },
    });
    expect(leaf.modify?.value).toBe(Number(value));
    expect(leaf.modifyIssue).toBeUndefined();
  }
});

test("collectLeaves accepts HSL and LCH modifier spaces", () => {
  for (const space of ["hsl", "lch"] as const) {
    const [leaf] = collectLeaves({
      color: {
        value: "#fff",
        type: "color",
        $extensions: { "studio.tokens": { modify: { type: "darken", value: "0.1", space } } },
      },
    });
    expect(leaf.modify?.space).toBe(space);
    expect(leaf.modifyIssue).toBeUndefined();
  }
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

test("referencedVarName returns only exact Tokens Studio references", () => {
  expect(referencedVarName("{color.white}")).toBe("--instui-primitive-color-white");
  expect(referencedVarName(" #fff ")).toBeUndefined();
});

test("varName builds prefixed kebab custom-property names", () => {
  expect(varName("primitive", ["color", "white"])).toBe("--instui-primitive-color-white");
  expect(varName("", ["spacing", "spaceMd"])).toBe("--instui-spacing-space-md");
  expect(varName("component", ["baseButton", "primaryBackground"])).toBe(
    "--instui-component-base-button-primary-background",
  );
});
