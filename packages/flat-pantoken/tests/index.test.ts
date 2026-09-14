import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import * as pantoken from "../src/index.ts";

const bin = new URL("../bin/pantoken.mjs", import.meta.url).pathname;

test("re-exports targets from @pantoken/pantoken", () => {
  expect(pantoken).toBeDefined();
  expect(typeof pantoken).toBe("object");
});

test("--version prints CLI version", () => {
  const pkg = JSON.parse(
    readFileSync(new URL("../../cli/package.json", import.meta.url), "utf8"),
  ) as {
    version: string;
  };
  const output = execFileSync("node", [bin, "--version"], { encoding: "utf8" });
  expect(output.trim()).toBe(pkg.version);
});

test("bin pantoken create scaffolds project", () => {
  const dir = mkdtempSync(join(tmpdir(), "flat-pantoken-create-"));
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "create", "react", "--dir", target, "--no-install"], {
    encoding: "utf8",
  });
  expect(existsSync(join(target, "package.json"))).toBe(true);
});
