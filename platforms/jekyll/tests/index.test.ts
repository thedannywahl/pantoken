import { expect, test } from "vite-plus/test";
import { toJekyllAssets } from "../src/index.ts";

test("emits a _sass partial, a css asset, and the prose stylesheet", () => {
  const files = toJekyllAssets();
  const paths = files.map((f) => f.path);
  expect(paths).toContain("_sass/pantoken.scss");
  expect(paths).toContain("assets/css/pantoken.css");
  expect(paths).toContain("assets/css/pantoken-prose.css");
  const prose = files.find((f) => f.path.endsWith("pantoken-prose.css"))?.content ?? "";
  expect(prose).toContain(".pantoken-prose table");
});

test("the sass partial carries scss variables and the css carries custom properties", () => {
  const files = toJekyllAssets();
  const sass = files.find((f) => f.path.endsWith(".scss"))?.content ?? "";
  const css = files.find((f) => f.path.endsWith(".css"))?.content ?? "";
  expect(sass).toContain("$instui-");
  expect(css).toContain("--instui-");
});
