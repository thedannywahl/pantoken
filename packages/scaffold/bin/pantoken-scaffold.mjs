#!/usr/bin/env node
import { runScaffoldCli } from "../dist/cli.mjs";

await runScaffoldCli(process.argv.slice(2), { usageCommand: "pantoken-scaffold" });
