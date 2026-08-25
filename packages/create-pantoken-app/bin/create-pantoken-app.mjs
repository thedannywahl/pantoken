#!/usr/bin/env node
// Flat-name alias for @pantoken/scaffold's CLI, so `npm create pantoken-app` (or `npm init
// pantoken-app`) works the way npm's create-* convention expects. Same argv contract as
// `pantoken-scaffold` — see that package's bin for the canonical implementation.
import { SCAFFOLD_PLATFORMS, isScaffoldPlatform, scaffoldProject } from "@pantoken/scaffold";

const argv = process.argv.slice(2);

const usage = () => `Usage: npm create pantoken-app -- <${SCAFFOLD_PLATFORMS.join("|")}> [--dir .]`;

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
