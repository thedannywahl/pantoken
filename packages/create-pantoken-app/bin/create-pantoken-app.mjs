#!/usr/bin/env node
// Flat-name alias for @pantoken/scaffold's CLI, so `npm create pantoken-app` (or `npm init
// pantoken-app`) works the way npm's create-* convention expects. Same argv contract as
// `pantoken-scaffold` — see that package's bin for the canonical implementation.
import { SCAFFOLD_PLATFORMS, isScaffoldPlatform, scaffoldProject } from "@pantoken/scaffold";

const argv = process.argv.slice(2);

const usage = () => `Usage: npm create pantoken-app -- <${SCAFFOLD_PLATFORMS.join("|")}> [--dir .]`;

function parseArgs(args) {
  let platform;
  let dir = ".";

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") return { help: true, platform: undefined, dir };
    if (arg === "--dir") {
      dir = args[i + 1] ?? ".";
      i += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      console.error(`Unknown option "${arg}".`);
      console.error(usage());
      process.exit(1);
    }
    if (!platform) {
      platform = arg;
      continue;
    }
    console.error(`Unexpected argument "${arg}".`);
    console.error(usage());
    process.exit(1);
  }

  return { help: false, platform, dir };
}

const parsed = parseArgs(argv);
if (parsed.help) {
  console.log(usage());
  process.exit(0);
}
if (!parsed.platform || !isScaffoldPlatform(parsed.platform)) {
  console.error(`Unknown platform "${parsed.platform ?? ""}".`);
  console.error(usage());
  process.exit(1);
}

try {
  const written = await scaffoldProject(parsed.platform, parsed.dir);
  for (const path of written) console.log(`✓ wrote ${path}`);
  console.log(`\nNext: cd ${parsed.dir} && npm install (or pnpm/yarn/bun install)`);
} catch (err) {
  console.error(`Error scaffolding project:`, err instanceof Error ? err.message : err);
  process.exit(1);
}
