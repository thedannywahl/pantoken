import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { parseArgs, run } from "../src/index.ts";

test("parseArgs reads the target and flags", () => {
  const args = parseArgs(["generate", "swift", "--out", "/tmp/x", "--theme", "canvas"]);
  expect(args.command).toBe("generate");
  expect(args.target).toBe("swift");
  expect(args.out).toBe("/tmp/x");
  expect(args.theme).toBe("canvas");
});

test("run generates Swift + an SPM manifest stub", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-"));
  await run(["generate", "swift", "--out", out, "--class", "PanTokens"]);
  expect(existsSync(join(out, "Sources", "PanTokens", "Tokens.swift"))).toBe(true);
  const manifest = readFileSync(join(out, "Package.swift"), "utf8");
  expect(manifest).toContain('name: "PanTokens"');
  expect(manifest).toContain("swift-tools-version");
});

test("run generates Android resource XML", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-android-"));
  await run(["generate", "android", "--out", out]);
  expect(existsSync(join(out, "res", "values", "colors.xml"))).toBe(true);
  expect(existsSync(join(out, "res", "values", "dimens.xml"))).toBe(true);
});

test("unknown targets report a clear error", async () => {
  await expect(run(["generate", "cobol", "--out", "/tmp/x"])).rejects.toThrow(/Unknown target/);
});
