/**
 * Emit one stylesheet per custom component for per-component CSS subpath exports.
 *
 * Runs between `generate.ts` and `vp pack` as part of `build`, NOT as part of `generate`.
 * Writing individual files on every hot-reload would trigger the workspace observer and create
 * a re-render loop; keeping this step build-only avoids that.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cardRules, agentShellRules, bannerRules } from "../src/components/index.ts";

const opts = "instui-" as const;
const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

const components: Array<[string, (prefix: string) => string]> = [
  ["card", cardRules],
  ["agent-shell", agentShellRules],
  ["banner", bannerRules],
];

let count = 0;
for (const [name, rules] of components) {
  writeFileSync(join(outDir, `${name}.css`), `${rules(opts)}\n`);
  count++;
}
console.log(`✓ custom-components: wrote ${count} per-component CSS files`);
