import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { toCompose } from "../src/index.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
];

test("emits a Compose Kotlin object with tokens", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "pantoken-compose-"));
  const file = await toCompose(fixture, { outDir, className: "PanTokens" });
  const kt = readFileSync(file, "utf8");
  expect(kt.toLowerCase()).toContain("color");
  expect(kt).toContain("PanTokens");
});
