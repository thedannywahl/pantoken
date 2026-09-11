/**
 * `@pantoken/ai` — consumer-facing agent assets for projects that *use* pantoken (not for
 * developing pantoken itself).
 *
 * It ships an `AGENTS.md`, an `llms.txt`, editor/agent rule files (Cursor, Copilot, Windsurf), and
 * Claude Code skills (`init-pantoken`, `create-pantoken-app`), plus {@link installAgentAssets} /
 * {@link scaffoldAndInit} / the `pantoken-ai` CLI to drop them into a consumer repo at the
 * conventional paths.
 *
 * Asset content and the writer function now live in `@pantoken/scaffold` (so the base scaffold
 * flow can offer them without a circular dependency); re-exported here for back-compat.
 *
 * @module
 * @alpha
 */
import { scaffoldProject, installAgentAssets, ASSETS, type AgentTool } from "@pantoken/scaffold";

export {
  installAgentAssets,
  AGENT_TOOLS,
  type AgentTool,
  SCAFFOLD_PLATFORMS,
  isScaffoldPlatform,
  scaffoldProject,
} from "@pantoken/scaffold";
export type { ScaffoldPlatform } from "@pantoken/scaffold";

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
export const AGENTS_MD: string = ASSETS.agents;
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
export const LLMS_TXT: string = ASSETS.llms;

/**
 * Scaffold a starter project for a platform (via `@pantoken/scaffold`), and install pantoken's
 * agent assets (via {@link installAgentAssets}) into the same directory.
 *
 * @param platform - A {@link ScaffoldPlatform}.
 * @param dir - The target directory (default `"."`). Its basename (or `"pantoken-app"` for `"."`)
 *   is substituted for `{{projectName}}` in the scaffold's template files.
 * @param tool - Which agent tool's assets to install alongside the scaffold (default `"all"`).
 * @returns The paths written, scaffold files first.
 *
 * @example Scaffold a React starter with every agent asset installed
 * ```ts
 * import { scaffoldAndInit } from "@pantoken/ai";
 *
 * scaffoldAndInit("react", "./my-app");
 * ```
 */
export async function scaffoldAndInit(
  platform: string,
  dir = ".",
  tool: AgentTool | "all" = "all",
): Promise<string[]> {
  const scaffoldPaths = await scaffoldProject(platform, dir);
  const assetPaths = installAgentAssets(tool, dir);
  return [...scaffoldPaths, ...assetPaths];
}
