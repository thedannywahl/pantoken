#!/usr/bin/env node
// Flat-name alias for @pantoken/scaffold's CLI, so `npm create pantoken-app` (or `npm init
// pantoken-app`) works the way npm's create-* convention expects. Same argv contract as
// `pantoken-scaffold` — see that package's bin for the canonical implementation.
import { runScaffoldCli } from "@pantoken/scaffold/cli";
import pkg from "../package.json" with { type: "json" };

await runScaffoldCli(process.argv.slice(2), {
  usageCommand: "npm create pantoken-app --",
  version: pkg.version,
});
