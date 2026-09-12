/**
 * AI/editor agent assets (AGENTS.md, llms.txt, Cursor/Copilot/Windsurf rules, Claude skills) for
 * projects that *use* pantoken. Moved here from `@pantoken/ai` so the base scaffold flow can offer
 * them directly, without `@pantoken/ai` depending back on `@pantoken/scaffold` (that dependency
 * already runs the other way).
 *
 * @module
 * @alpha
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ASSETS } from "../generated/assets.ts";

export { ASSETS } from "../generated/assets.ts";

/** An agent/editor tool pantoken can install assets for. */
export type AgentTool = "agents" | "llms" | "cursor" | "copilot" | "windsurf" | "claude";

interface AssetTarget {
  file: string;
  content: string;
}

/** Where each tool's asset(s) are written, relative to the target directory. */
const TARGETS: Record<AgentTool, AssetTarget[]> = {
  agents: [{ file: "AGENTS.md", content: ASSETS.agents }],
  llms: [{ file: "llms.txt", content: ASSETS.llms }],
  cursor: [{ file: ".cursor/rules/pantoken.mdc", content: ASSETS.cursor }],
  copilot: [{ file: ".github/copilot-instructions.md", content: ASSETS.copilot }],
  windsurf: [{ file: ".windsurf/rules/pantoken.md", content: ASSETS.windsurf }],
  claude: [
    { file: ".claude/skills/init-pantoken/SKILL.md", content: ASSETS.initSkill },
    { file: ".claude/skills/create-pantoken-app/SKILL.md", content: ASSETS.createAppSkill },
    { file: "AGENTS.md", content: ASSETS.agents },
  ],
};

/** Every installable tool key. */
export const AGENT_TOOLS: readonly AgentTool[] = Object.keys(TARGETS) as AgentTool[];

const AGENT_TOOL_SET = new Set<string>(AGENT_TOOLS);

function ensureAgentTool(tool: string): asserts tool is AgentTool {
  if (AGENT_TOOL_SET.has(tool)) return;
  throw new Error(`Unknown tool "${tool}". Expected one of: ${AGENT_TOOLS.join(", ")}.`);
}

/**
 * Write pantoken's agent assets for a tool into a consumer repo.
 *
 * @param tool - A specific {@link AgentTool}, or `"all"` for every asset.
 * @param dir - The target directory (default `"."`).
 * @returns The paths written.
 */
export function installAgentAssets(tool: AgentTool | "all", dir = "."): string[] {
  const tools =
    tool === "all" ? AGENT_TOOLS : ((ensureAgentTool(tool), [tool]) as readonly AgentTool[]);
  const written = new Set<string>();
  for (const t of tools) {
    for (const { file, content } of TARGETS[t]) {
      const path = join(dir, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, content);
      written.add(path);
    }
  }
  return [...written];
}
