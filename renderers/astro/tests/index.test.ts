import { expect, test } from "vite-plus/test";
import { customComponents } from "@pantoken/plugin-custom-components";
import { astroCompanion, checkCompatibility } from "../scripts/check-compatibility.ts";
import { InstUI, pantokenCss } from "../src/index.ts";

test("pantokenCss emits the token stylesheet for a theme", () => {
  const css = pantokenCss({ theme: "rebrand" });
  expect(css).toContain("@property --instui-");
  expect(css).toContain(":root {");
});

test("plugins contribute CSS to the injected sheet", () => {
  const css = pantokenCss({ plugins: [customComponents()] });
  expect(css).toContain(".instui-card");
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

test("rejects malformed Astro or Starlight versions before installing", async () => {
  await expect(checkCompatibility("0.42.4", "7.0.0-beta.1")).rejects.toThrow(
    "Invalid Astro/Starlight releases",
  );
});

test("resolves maintenance Starlight candidates to their tested Astro companion", () => {
  expect(astroCompanion("0.35.0")).toBe("5.18.2");
  expect(astroCompanion("0.42.4")).toBe("7.3.5");
  expect(() => astroCompanion("0.43.0")).toThrow(
    "Missing Astro companion version for Starlight 0.43.0",
  );
});
