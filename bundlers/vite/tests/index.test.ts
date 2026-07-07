import { expect, test } from "vite-plus/test";
import { pantoken } from "../src/index.ts";

// The plugin hooks are typed as Vite's rich hook objects; call them as plain functions in tests.
type Hook = (...args: unknown[]) => unknown;

test("exposes the plugin with a name and hooks", () => {
  const plugin = pantoken();
  expect(plugin.name).toBe("@pantoken/vite");
  expect(typeof plugin.resolveId).toBe("function");
  expect(typeof plugin.load).toBe("function");
});

test("resolves and loads the virtual css + tokens modules", () => {
  const plugin = pantoken();
  const resolveId = plugin.resolveId as Hook;
  const load = plugin.load as Hook;

  const cssId = resolveId("virtual:pantoken/css") as string;
  expect(cssId).toBe("\0virtual:pantoken/css");
  const cssMod = load(cssId) as string;
  expect(cssMod).toContain("export default");
  expect(cssMod).toContain("--instui-");

  const tokensId = resolveId("virtual:pantoken/tokens") as string;
  const tokensMod = load(tokensId) as string;
  expect(tokensMod).toContain("export const tokens");

  expect(resolveId("some/other/id")).toBeNull();
});

test("injectCss adds a style tag to the HTML entry", () => {
  const withInject = pantoken({ injectCss: true }).transformIndexHtml as Hook;
  const out = withInject("<html><head></head></html>") as { tags: { tag: string }[] };
  expect(out.tags[0].tag).toBe("style");

  const noInject = pantoken().transformIndexHtml as Hook;
  expect(noInject("<html></html>")).toBe("<html></html>");
});
