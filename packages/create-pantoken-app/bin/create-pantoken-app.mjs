#!/usr/bin/env node
// Flat-name alias for @pantoken/scaffold's CLI, so `npm create pantoken-app` (or `npm init
// pantoken-app`) works the way npm's create-* convention expects. Same argv contract as
// `pantoken-scaffold` — see that package's bin for the canonical implementation.
//
// Native/non-npm design-token source (Swift, Android, Compose, ...) lives in @pantoken/cli. Keep
// this package scaffold-only so package managers such as Deno don't have to resolve @pantoken/core's
// GitHub-only upstream dependency before the scaffolder can start.
import { buildCreateUsageCommand, runScaffoldCli } from "@pantoken/scaffold/cli";
import pkg from "../package.json" with { type: "json" };

const argv = process.argv.slice(2);

if (argv[0] === "generate") {
  console.error(
    "create-pantoken-app is scaffold-only. Use @pantoken/cli for native output: npx @pantoken/cli generate <target>",
  );
  process.exitCode = 1;
} else {
  await runScaffoldCli(argv, {
    usageCommand: buildCreateUsageCommand(),
    version: pkg.version,
  });
}
