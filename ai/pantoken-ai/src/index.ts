/**
 * `@pantoken/ai` — consumer-facing agent assets for projects that *use* pantoken (not for
 * developing pantoken itself).
 *
 * It ships an `AGENTS.md`, an `llms.txt`, editor/agent rule files (Cursor, Copilot, Windsurf), and
 * a Claude Code bootstrap skill, plus {@link installAgentAssets} / the `pantoken-ai` CLI to drop
 * them into a consumer repo at the conventional paths.
 *
 * @module
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { ASSETS } from "../generated/assets.ts";

export { ASSETS } from "../generated/assets.ts";

/**
 * The `AGENTS.md` content (consumer usage guide).
 *
 * @example Serve the guide from an app route
 * ```ts
 * import { AGENTS_MD } from "@pantoken/ai";
 *
 * export function GET() {
 *   return new Response(AGENTS_MD, { headers: { "Content-Type": "text/markdown" } });
 * }
 * ```
 */
export const AGENTS_MD = ASSETS.agents;
/**
 * The `llms.txt` content.
 *
 * @example Write it to disk yourself
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { LLMS_TXT } from "@pantoken/ai";
 *
 * writeFileSync("llms.txt", LLMS_TXT);
 * ```
 */
export const LLMS_TXT = ASSETS.llms;

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
    { file: ".claude/skills/bootstrap-pantoken/SKILL.md", content: ASSETS.skill },
    { file: "AGENTS.md", content: ASSETS.agents },
  ],
};

/**
 * Every installable tool key.
 *
 * @example Install each tool individually
 * ```ts
 * import { AGENT_TOOLS, installAgentAssets } from "@pantoken/ai";
 *
 * for (const tool of AGENT_TOOLS) installAgentAssets(tool, "./my-app");
 * ```
 */
export const AGENT_TOOLS: readonly AgentTool[] = Object.keys(TARGETS) as AgentTool[];

/**
 * Write pantoken's agent assets for a tool into a consumer repo.
 *
 * @param tool - A specific {@link AgentTool}, or `"all"` for every asset.
 * @param dir - The target directory (default `"."`).
 * @returns The paths written.
 *
 * @example Install one tool's assets into a repo
 * ```ts
 * import { installAgentAssets } from "@pantoken/ai";
 *
 * const written = installAgentAssets("cursor", "./my-app");
 * // → ["my-app/.cursor/rules/pantoken.mdc"]
 * ```
 *
 * @example Install every asset into the current directory
 * ```ts
 * import { installAgentAssets } from "@pantoken/ai";
 *
 * installAgentAssets("all");
 * // writes AGENTS.md, llms.txt, and the Cursor/Copilot/Windsurf/Claude assets
 * ```
 */
export function installAgentAssets(tool: AgentTool | "all", dir = "."): string[] {
  const tools = tool === "all" ? AGENT_TOOLS : [tool];
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
