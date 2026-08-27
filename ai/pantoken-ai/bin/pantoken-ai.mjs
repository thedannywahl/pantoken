#!/usr/bin/env node
import { runAiCli } from "../dist/cli.mjs";
import pkg from "../package.json" with { type: "json" };

await runAiCli(process.argv.slice(2), { version: pkg.version });
