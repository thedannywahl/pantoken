import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";

const bin = new URL("../bin/create-pantoken-app.mjs", import.meta.url).pathname;

test("--help prints usage without scaffolding anything", () => {
  const output = execFileSync("node", [bin, "--help"], {
    encoding: "utf8",
    env: { ...process.env, npm_config_user_agent: "npm/10.0.0 node/22" },
  });
  expect(output).toContain("npm create pantoken-app");
});

test("--help shows the invoking package manager's own create invocation", () => {
  const output = execFileSync("node", [bin, "--help"], {
    encoding: "utf8",
    env: { ...process.env, npm_config_user_agent: "pnpm/9.0.0 node/22" },
  });
  expect(output).toContain("pnpm create pantoken-app");
});

test("--version prints this package's own version", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
    version: string;
  };
  const output = execFileSync("node", [bin, "--version"], { encoding: "utf8" });
  expect(output.trim()).toBe(pkg.version);
});

test("rejects an unknown platform", () => {
  expect(() => execFileSync("node", [bin, "not-a-real-platform"], { encoding: "utf8" })).toThrow();
});

test("requires a platform argument under --yes", () => {
  expect(() => execFileSync("node", [bin, "--yes"], { encoding: "utf8" })).toThrow();
});

test("scaffolds the same output as @pantoken/scaffold for a known platform", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-"));
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "react", "--dir", target, "--no-install"], {
    encoding: "utf8",
  });
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name": "my-app"');
  expect(output).toContain("install");
});

test("accepts the html alias for components", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-html-"));
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "html", "--dir", target, "--no-install"], { encoding: "utf8" });
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("bun-created apps use bun commands and omit pnpm workspace config", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-bun-"));
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "html", "--dir", target, "--no-install"], {
    encoding: "utf8",
    env: { ...process.env, npm_config_user_agent: "bun/1.2.0 npm/? node/22" },
  });
  const readme = readFileSync(join(target, "README.md"), "utf8");

  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, "pnpm-workspace.yaml"))).toBe(false);
  expect(output).toContain("bun install");
  expect(output).toContain("bun run dev");
  expect(output).not.toContain("npm run dev");
  expect(readme).toContain("bun install");
  expect(readme).toContain("bun run dev");
});

test("yarn-created apps use yarn commands and omit pnpm workspace config", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-yarn-"));
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "html", "--dir", target, "--no-install"], {
    encoding: "utf8",
    env: { ...process.env, npm_config_user_agent: "yarn/4.18.0 npm/? node/22" },
  });
  const readme = readFileSync(join(target, "README.md"), "utf8");

  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, "pnpm-workspace.yaml"))).toBe(false);
  expect(output).toContain("yarn install");
  expect(output).toContain("yarn run dev");
  expect(output).not.toContain("npm run dev");
  expect(readme).toContain("yarn install");
  expect(readme).toContain("yarn run dev");
});

test("published runtime dependency graph stays package-manager safe", () => {
  const createPkg = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  ) as {
    dependencies?: Record<string, string>;
  };
  const scaffoldPkg = JSON.parse(
    readFileSync(new URL("../../scaffold/package.json", import.meta.url), "utf8"),
  ) as { dependencies?: Record<string, string> };

  expect(Object.keys(createPkg.dependencies ?? {})).toEqual(["@pantoken/scaffold"]);
  expect(Object.keys(scaffoldPkg.dependencies ?? {}).sort()).toEqual([
    "@bomb.sh/tab",
    "@clack/prompts",
    "commander",
  ]);
});

test("generate <target> points users to @pantoken/cli instead of scaffolding", () => {
  const dir = mkdtempSync(join(tmpdir(), "create-pantoken-app-generate-"));
  expect(() =>
    execFileSync("node", [bin, "generate", "vanilla", "--out", dir], { encoding: "utf8" }),
  ).toThrow(/@pantoken\/cli/);
  expect(existsSync(join(dir, "package.json"))).toBe(false);
});
