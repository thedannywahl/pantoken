import { expect, test } from "vite-plus/test";
import { focusOutline } from "@pantoken/plugin-focus-outline";
import { InstUI, pantokenCss } from "../src/index.ts";

test("pantokenCss emits the token stylesheet for a theme", () => {
  const css = pantokenCss({ theme: "rebrand" });
  expect(css).toContain("@property --instui-");
  expect(css).toContain(":root {");
});

test("plugins contribute CSS to the injected sheet", () => {
  const css = pantokenCss({ plugins: [focusOutline()] });
  expect(css).toContain(":focus-visible");
});

test("InstUI is a Starlight plugin that injects a head style entry", () => {
  const plugin = InstUI();
  expect(plugin.name).toBe("@pantoken/astro");

  let injected: { tag: string; attrs: Record<string, string>; content: string }[] = [];
  plugin.hooks["config:setup"]({
    config: { head: [] },
    updateConfig: (patch) => {
      injected = patch.head;
    },
  });
  expect(injected).toHaveLength(1);
  expect(injected[0].tag).toBe("style");
  expect(injected[0].attrs["data-pantoken"]).toBe("base");
  expect(injected[0].content).toContain("--instui-");
});
