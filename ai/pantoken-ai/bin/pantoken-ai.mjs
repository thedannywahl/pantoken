#!/usr/bin/env node
import {
  AGENT_TOOLS,
  SCAFFOLD_PLATFORMS,
  installAgentAssets,
  isScaffoldPlatform,
  scaffoldAndInit,
} from "../dist/index.mjs";

const argv = process.argv.slice(2);
const ALL_TOOL_SET = new Set([...AGENT_TOOLS, "all"]);
const HELP_FLAGS = new Set(["--help", "-h"]);

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

function printUsageAndExit(code) {
  if (code === 0) {
    console.log(usage());
  } else {
    console.error(usage());
  }
  process.exit(code);
}

/** Prints an "unknown X" error plus usage, and exits 1, unless `value` is in `set`. */
function requireChoice(value, set, label) {
  if (!set.has(value)) {
    console.error(`Unknown ${label} "${value ?? ""}".`);
    console.error(usage());
    process.exit(1);
  }
}

function runInit() {
  const tool = flag("tool") ?? "all";
  const dir = flag("dir") ?? ".";
  requireChoice(tool, ALL_TOOL_SET, "tool");
  const written = installAgentAssets(tool, dir);
  for (const path of written) console.log(`✓ wrote ${path}`);
}

function resolvePlatform() {
  const platform = argv[1];
  if (!platform || !isScaffoldPlatform(platform)) {
    console.error(`Unknown platform "${platform ?? ""}".`);
    printUsageAndExit(1);
  }
  return platform;
}

async function writeScaffold(platform, dir, tool) {
  const written = await scaffoldAndInit(platform, dir, tool);
  for (const path of written) console.log(`✓ wrote ${path}`);
  console.log(`\nNext: cd ${dir} && npm install (or pnpm/yarn/bun install)`);
}

async function runScaffold() {
  const platform = resolvePlatform();
  const dir = flag("dir") ?? ".";
  const tool = flag("tool") ?? "all";
  requireChoice(tool, ALL_TOOL_SET, "tool");
  await writeScaffold(platform, dir, tool);
}

const COMMANDS = {
  init: runInit,
  scaffold: runScaffold,
};

async function main() {
  const command = argv[0];
  if (HELP_FLAGS.has(command)) printUsageAndExit(0);

  const run = COMMANDS[command];
  if (!run) printUsageAndExit(1);
  await run();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
