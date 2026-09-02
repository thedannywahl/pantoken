#!/usr/bin/env node
// Flat-name alias for @pantoken/scaffold's CLI, so `npm create pantoken-app` (or `npm init
// pantoken-app`) works the way npm's create-* convention expects. Same argv contract as
// `pantoken-scaffold` — see that package's bin for the canonical implementation.
//
// `generate <target>` is a second, unrelated entry point delegating to @pantoken/cli — it emits
// native/non-npm design-token source (Swift, Android, Compose, ...) rather than scaffolding a
// starter project. Routed here too so a native-target consumer never needs a separate install.
import { run as runGenerate } from "@pantoken/cli";
import { runScaffoldCli } from "@pantoken/scaffold/cli";
import pkg from "../package.json" with { type: "json" };

const argv = process.argv.slice(2);

if (argv[0] === "generate") {
  await runGenerate(argv);
} else {
  await runScaffoldCli(argv, {
    usageCommand: "npm create pantoken-app --",
    version: pkg.version,
  });
}
