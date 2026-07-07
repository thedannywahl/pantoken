import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { aggregate } from "@pantoken/aggregate";

const metaDir = dirname(dirname(fileURLToPath(import.meta.url)));
const targets = aggregate({ metaDir });
console.log(`pantoken meta: aggregated ${targets.map((t) => t.key).join(", ")}`);
