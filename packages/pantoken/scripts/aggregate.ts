import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { aggregate } from "@pantoken/aggregate";
import type { Target } from "@pantoken/aggregate";

/** Build the log line summarizing which meta package keys were aggregated. */
export function formatAggregateMessage(keys: string[]): string {
  return `pantoken meta: aggregated ${keys.join(", ")}`;
}

/** Aggregate the meta package targets under `metaDir`, log a summary, and return the targets. */
export function runAggregate(metaDir: string = dirname(dirname(fileURLToPath(import.meta.url)))): {
  targets: Target[];
  message: string;
} {
  const targets = aggregate({ metaDir });
  const targetKeys = targets.map((target) => target.key);
  const message = formatAggregateMessage(targetKeys);
  console.log(message);
  return { targets: targets, message: message };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runAggregate();
}
