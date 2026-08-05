#!/usr/bin/env node
import { AGENT_TOOLS, installAgentAssets } from "../dist/index.mjs";

const argv = process.argv.slice(2);
const TOOL_SET = new Set(AGENT_TOOLS);

const usage = () =>
  `Usage: pantoken-ai init [--tool <${["all", ...AGENT_TOOLS].join("|")}>] [--dir .]\n\n` +
  "Tools: all, " +
  AGENT_TOOLS.join(", ");

const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : undefined;
};

if (argv[0] === "--help" || argv[0] === "-h") {
  console.log(usage());
  process.exit(0);
}

if (argv[0] !== "init") {
  console.error(usage());
  process.exit(1);
}

const tool = flag("tool") ?? "all";
const dir = flag("dir") ?? ".";
if (tool !== "all" && !TOOL_SET.has(tool)) {
  console.error(`Unknown tool "${tool}".`);
  console.error(usage());
  process.exit(1);
}

const written = installAgentAssets(tool, dir);
for (const path of written) console.log(`✓ wrote ${path}`);
