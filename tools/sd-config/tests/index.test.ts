import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { PLATFORMS, buildPlatform } from "../src/index.ts";

test("PLATFORMS includes swift and the standard native targets", () => {
  expect(Object.keys(PLATFORMS)).toContain("swift");
  expect(PLATFORMS.swift.ext).toBe("swift");
});

test("buildPlatform emits a Swift file with the tokens", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-sd-"));
  const file = await buildPlatform({
    dictionary: {
      "instui-color-brand": { value: "#0374B5", type: "color" },
      "instui-size-md": { value: "16px", type: "dimension" },
    },
    platform: "swift",
    outDir,
    className: "PanTokens",
  });
  const swift = readFileSync(file, "utf8");
  expect(swift).toContain("class PanTokens");
  expect(swift.toLowerCase()).toContain("color");
});
