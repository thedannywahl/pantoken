#!/usr/bin/env node
import {
  AGENT_TOOLS,
  SCAFFOLD_PLATFORMS,
  installAgentAssets,
  scaffoldAndInit,
} from "../dist/index.mjs";

const argv = process.argv.slice(2);
const TOOL_SET = new Set(AGENT_TOOLS);
const PLATFORM_SET = new Set(SCAFFOLD_PLATFORMS);

const usage = () =>
  `Usage:\n` +
  `  pantoken-ai init [--tool <${["all", ...AGENT_TOOLS].join("|")}>] [--dir .]\n` +
  `  pantoken-ai scaffold <${SCAFFOLD_PLATFORMS.join("|")}> [--dir .] [--tool <${["all", ...AGENT_TOOLS].join("|")}>]\n\n` +
  `Tools: all, ${AGENT_TOOLS.join(", ")}\n` +
  `Platforms: ${SCAFFOLD_PLATFORMS.join(", ")}\n\n` +
  `"scaffold" writes a starter project (via @pantoken/scaffold) and installs the agent assets\n` +
  `(via "init") into the same directory. Use "npx @pantoken/scaffold <platform>" directly if you\n` +
  `only want the starter project without the agent assets.`;

const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : undefined;
};

async function main() {
  if (argv[0] === "--help" || argv[0] === "-h") {
    console.log(usage());
    process.exit(0);
  }

  if (argv[0] === "init") {
    const tool = flag("tool") ?? "all";
    const dir = flag("dir") ?? ".";
    if (tool !== "all" && !TOOL_SET.has(tool)) {
      console.error(`Unknown tool "${tool}".`);
      console.error(usage());
      process.exit(1);
    }
    const written = installAgentAssets(tool, dir);
    for (const path of written) console.log(`✓ wrote ${path}`);
  } else if (argv[0] === "scaffold") {
    const platform = argv[1];
    const dir = flag("dir") ?? ".";
    const tool = flag("tool") ?? "all";
    if (!platform || !PLATFORM_SET.has(platform)) {
      console.error(`Unknown platform "${platform ?? ""}".`);
      console.error(usage());
      process.exit(1);
    }
    if (tool !== "all" && !TOOL_SET.has(tool)) {
      console.error(`Unknown tool "${tool}".`);
      console.error(usage());
      process.exit(1);
    }
    try {
      const written = await scaffoldAndInit(platform, dir, tool);
      for (const path of written) console.log(`✓ wrote ${path}`);
      console.log(`\nNext: cd ${dir} && npm install (or pnpm/yarn/bun install)`);
    } catch (err) {
      console.error("Error scaffolding project:", err);
      process.exit(1);
    }
  } else {
    console.error(usage());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
