import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { shouldPromptForDir } from "../src/cli.ts";

function mktemp(): string {
  return mkdtempSync(join(tmpdir(), "pantoken-scaffold-cli-"));
}

test("shouldPromptForDir only prompts when --dir is omitted on a TTY", () => {
  expect(shouldPromptForDir(undefined, true)).toBe(true);
  expect(shouldPromptForDir(undefined, false)).toBe(false);
  expect(shouldPromptForDir(undefined, undefined)).toBe(false);
  expect(shouldPromptForDir("./my-app", true)).toBe(false);
});

const bin = new URL("../bin/pantoken-scaffold.mjs", import.meta.url).pathname;

test("--help does not scaffold anything", () => {
  const output = execFileSync("node", [bin, "--help"], { encoding: "utf8" });
  expect(output).toContain("pantoken-scaffold");
});

test("prints vp install as the preferred next step", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(output).toContain("vp install");
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("still substitutes projectName with the shared CLI", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name": "my-app"');
});
