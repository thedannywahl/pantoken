#!/usr/bin/env node
import { AGENT_TOOLS, installAgentAssets } from "../dist/index.mjs";

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : undefined;
};

if (argv[0] !== "init") {
  console.error(
    `Usage: pantoken-ai init [--tool <${["all", ...AGENT_TOOLS].join("|")}>] [--dir .]`,
  );
  process.exit(1);
}

const tool = flag("tool") ?? "all";
const dir = flag("dir") ?? ".";
const written = installAgentAssets(tool, dir);
for (const path of written) console.log(`✓ wrote ${path}`);
