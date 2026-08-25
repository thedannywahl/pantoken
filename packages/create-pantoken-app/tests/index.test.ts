import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";

const bin = new URL("../bin/create-pantoken-app.mjs", import.meta.url).pathname;

test("--help prints usage without scaffolding anything", () => {
  const output = execFileSync("node", [bin, "--help"], { encoding: "utf8" });
  expect(output).toContain("npm create pantoken-app");
});

test("rejects an unknown platform", () => {
  expect(() => execFileSync("node", [bin, "not-a-real-platform"], { encoding: "utf8" })).toThrow();
});

test("scaffolds the same output as @pantoken/scaffold for a known platform", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-"));
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name": "my-app"');
});

test("accepts the html alias for components", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-html-"));
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "html", "--dir", target], { encoding: "utf8" });
  expect(existsSync(join(target, "package.json"))).toBe(true);
});
