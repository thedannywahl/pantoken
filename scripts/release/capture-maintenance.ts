import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { runAsMain } from "./cli.ts";

/** Record raw Renovate metadata without loading workspace packages or executing candidate code. */
export function captureMaintenance(
  dataFile = process.env.RENOVATE_POST_UPGRADE_COMMAND_DATA_FILE,
  output = ".renovate/weekly-upgrades.json",
): void {
  assert.ok(dataFile, "Renovate must provide proposal metadata");
  const upgrades: unknown = JSON.parse(readFileSync(dataFile, "utf8"));
  assert.ok(Array.isArray(upgrades), "Renovate upgrades must be an array");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(upgrades, null, 2)}\n`);
}

runAsMain(import.meta.url, async () => captureMaintenance());
