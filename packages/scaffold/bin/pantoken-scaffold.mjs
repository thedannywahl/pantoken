#!/usr/bin/env node
import { SCAFFOLD_PLATFORMS, isScaffoldPlatform, scaffoldProject } from "../dist/index.mjs";

const argv = process.argv.slice(2);

const usage = () => `Usage: pantoken-scaffold <${SCAFFOLD_PLATFORMS.join("|")}> [--dir .]`;

const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : undefined;
};

if (argv[0] === "--help" || argv[0] === "-h") {
  console.log(usage());
  process.exit(0);
}

const platform = argv[0];
const dir = flag("dir") ?? ".";
if (!platform || !isScaffoldPlatform(platform)) {
  console.error(`Unknown platform "${platform ?? ""}".`);
  console.error(usage());
  process.exit(1);
}

try {
  const written = await scaffoldProject(platform, dir);
  for (const path of written) console.log(`✓ wrote ${path}`);
  console.log(`\nNext: cd ${dir} && npm install (or pnpm/yarn/bun install)`);
} catch (err) {
  console.error(`Error scaffolding project:`, err instanceof Error ? err.message : err);
  process.exit(1);
}
