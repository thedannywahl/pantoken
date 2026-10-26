import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dataFile = process.env.RENOVATE_POST_UPGRADE_COMMAND_DATA_FILE;
assert.ok(dataFile, "Renovate must provide proposal metadata");
const upgrades: unknown = JSON.parse(readFileSync(dataFile, "utf8"));
assert.ok(Array.isArray(upgrades), "Renovate upgrades must be an array");
mkdirSync(".renovate", { recursive: true });
writeFileSync(".renovate/weekly-upgrades.json", `${JSON.stringify(upgrades, null, 2)}\n`);
