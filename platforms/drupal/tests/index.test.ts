import { expect, test } from "vite-plus/test";
import { machineName, toDrupalTheme } from "../src/index.ts";

test("machineName sanitizes to lower_snake", () => {
  expect(machineName("Instructure Canvas")).toBe("instructure_canvas");
});

test("emits info.yml, libraries.yml, and the token CSS", () => {
  const files = toDrupalTheme({ name: "Instructure" });
  const byPath = new Map(files.map((f) => [f.path, f.content]));

  expect(byPath.get("instructure.info.yml")).toContain("type: theme");
  expect(byPath.get("instructure.info.yml")).toContain("- instructure/tokens");
  expect(byPath.get("instructure.libraries.yml")).toContain("css/tokens.css: {}");
  expect(byPath.get("css/tokens.css")).toContain("--instui-");
});

test("emits the prose stylesheet and registers it in the library", () => {
  const files = toDrupalTheme({ name: "Instructure" });
  const byPath = new Map(files.map((f) => [f.path, f.content]));

  expect(byPath.get("instructure.libraries.yml")).toContain("css/pantoken-prose.css: {}");
  expect(byPath.get("css/pantoken-prose.css")).toContain(".pantoken-prose table");
});
