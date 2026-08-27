#!/usr/bin/env node
import { runScaffoldCli } from "../dist/cli.mjs";
import pkg from "../package.json" with { type: "json" };

await runScaffoldCli(process.argv.slice(2), {
  usageCommand: "pantoken-scaffold",
  version: pkg.version,
});
