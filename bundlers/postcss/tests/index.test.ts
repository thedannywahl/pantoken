import postcss from "postcss";
import { expect, test } from "vite-plus/test";
import { pantoken } from "../src/index.ts";

test("expands @pantoken into the token stylesheet", async () => {
  const result = await postcss([pantoken()]).process("@pantoken;\n.a{color:red}", {
    from: undefined,
  });
  expect(result.css).toContain("--instui-");
  expect(result.css).toContain("@property");
  // The at-rule itself was replaced (no leftover `@pantoken;` statement).
  expect(result.css).not.toContain("@pantoken;");
  expect(result.css).toContain(".a{color:red}");
});

test("leaves other CSS untouched", async () => {
  const result = await postcss([pantoken()]).process(".a { color: red; }", { from: undefined });
  expect(result.css).toBe(".a { color: red; }");
});

test("supports a custom at-rule name", async () => {
  const result = await postcss([pantoken({ atRule: "instui" })]).process("@instui;", {
    from: undefined,
  });
  expect(result.css).toContain("--instui-");
});
