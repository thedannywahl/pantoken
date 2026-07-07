import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { AGENTS_MD, AGENT_TOOLS, installAgentAssets } from "../src/index.ts";

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

test("installs the Claude skill + AGENTS.md", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-ai-claude-"));
  installAgentAssets("claude", dir);
  expect(existsSync(join(dir, ".claude/skills/bootstrap-pantoken/SKILL.md"))).toBe(true);
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
