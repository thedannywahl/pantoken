import { expect, test } from "vite-plus/test";
import { toHugoAssets } from "../src/index.ts";

test("emits an assets sass partial, a css asset, and the prose stylesheet", () => {
  const files = toHugoAssets();
  const paths = files.map((f) => f.path);
  expect(paths).toContain("assets/scss/_pantoken.scss");
  expect(paths).toContain("assets/css/pantoken.css");
  expect(paths).toContain("assets/css/pantoken-prose.css");
  const prose = files.find((f) => f.path.endsWith("pantoken-prose.css"))?.content ?? "";
  expect(prose).toContain(".pantoken-prose table");
});

test("the sass partial carries scss variables and the css carries custom properties", () => {
  const files = toHugoAssets();
  const sass = files.find((f) => f.path.endsWith(".scss"))?.content ?? "";
  const css = files.find((f) => f.path.endsWith(".css"))?.content ?? "";
  expect(sass).toContain("$instui-");
  expect(css).toContain("--instui-");
});
