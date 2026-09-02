#!/usr/bin/env node
import { runI18nCli } from "../dist/cli.mjs";

await runI18nCli(process.argv.slice(2));
