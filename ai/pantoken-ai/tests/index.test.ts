import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import {
  AGENTS_MD,
  AGENT_TOOLS,
  SCAFFOLD_PLATFORMS,
  installAgentAssets,
  scaffoldAndInit,
  scaffoldProject,
} from "../src/index.ts";

test("ships a non-empty AGENTS guide and a known tool set", () => {
  expect(AGENTS_MD).toContain("pantoken");
  expect(AGENT_TOOLS).toContain("cursor");
  expect(AGENT_TOOLS).toContain("claude");
});

test("installs a single tool's asset at its conventional path", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-"));
  const written = installAgentAssets("cursor", dir);
  expect(written).toHaveLength(1);
  const rule = join(dir, ".cursor/rules/pantoken.mdc");
  expect(existsSync(rule)).toBe(true);
  expect(readFileSync(rule, "utf8")).toContain("pantoken");
});

test("installs both Claude skills + AGENTS.md", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-claude-"));
  installAgentAssets("claude", dir);
  expect(existsSync(join(dir, ".claude/skills/init-pantoken/SKILL.md"))).toBe(true);
  expect(existsSync(join(dir, ".claude/skills/create-pantoken-app/SKILL.md"))).toBe(true);
  expect(existsSync(join(dir, "AGENTS.md"))).toBe(true);
});

test("'all' writes every asset, deduped", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-all-"));
  const written = installAgentAssets("all", dir);
  expect(existsSync(join(dir, "llms.txt"))).toBe(true);
  expect(existsSync(join(dir, ".github/copilot-instructions.md"))).toBe(true);
  // AGENTS.md is referenced by both `agents` and `claude` but written once.
  expect(written.filter((p) => p.endsWith("AGENTS.md"))).toHaveLength(1);
});

test("rejects unknown tools with a clear error", () => {
  expect(() => installAgentAssets("invalid" as never)).toThrow(/Unknown tool/);
});

test("re-exports a known scaffold platform set from @pantoken/scaffold", () => {
  expect(SCAFFOLD_PLATFORMS).toContain("components");
  expect(SCAFFOLD_PLATFORMS).toContain("react");
  expect(SCAFFOLD_PLATFORMS).toContain("vue");
  expect(SCAFFOLD_PLATFORMS).toContain("angular");
  expect(SCAFFOLD_PLATFORMS).toContain("web-components");
});

test("scaffolds a platform with projectName substituted", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-scaffold-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("react", target);
  expect(written.length).toBeGreaterThan(0);
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).not.toContain("{{projectName}}");
});

test("rejects unknown platforms with a clear error", async () => {
  await expect(scaffoldProject("invalid" as never)).rejects.toThrow(/Unknown platform/);
});

test("scaffoldAndInit writes both the scaffold and the agent assets", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-scaffold-init-"));
  const target = join(dir, "my-app");
  const written = await scaffoldAndInit("components", target, "cursor");
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, ".cursor/rules/pantoken.mdc"))).toBe(true);
  expect(written.length).toBeGreaterThan(1);
});
