import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { SCAFFOLD_PLATFORMS, scaffoldProject } from "../src/index.ts";
import { renderWrapperContainer, wrapperRootClassName } from "../scripts/wrapper-layout.ts";

test("wrapper layout root class is a real instui-* class", () => {
  expect(wrapperRootClassName()).toMatch(/^instui-/);
});

test("wrapper layout renders the container/header/content skeleton", () => {
  const html = renderWrapperContainer("html", 0);
  expect(html).toContain('class="container"');
  expect(html).toContain('class="header"');
  expect(html).toContain('class="content"');
  expect(html).toContain("{{projectName}}");
});

test("wrapper layout jsx format uses className and JS comments, not HTML comments", () => {
  const jsx = renderWrapperContainer("jsx", 0);
  expect(jsx).toContain('className="container"');
  expect(jsx).not.toContain("<!--");
  expect(jsx).toContain("{/* optional */}");
});

test("every platform's scaffolded output has the wrapper layout baked in, no leftover tokens", async () => {
  for (const platform of SCAFFOLD_PLATFORMS) {
    const dir = mkdtempSync(join(tmpdir(), `pantoken-scaffold-wrapper-${platform}-`));
    const written = await scaffoldProject(platform, join(dir, "app"));
    const entryContent = written
      .filter((path: string) => /\.(ts|tsx|html)$/.test(path))
      .map((path: string) => readFileSync(path, "utf8"))
      .join("\n");
    expect(entryContent).not.toContain("{{wrapperContainer:");
    expect(entryContent).not.toContain("{{wrapperRootClass}}");
    expect(entryContent).toContain("container");
  }
});
