/**
 * Copy the committed demo snippets (`docs/demos/*.html`) into `public/demos/` so the `/play` runner can
 * fetch them. They're bare markup fragments (no `<link>` of their own — the runner injects the shared
 * sheets), so this is a plain file copy.
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on edits during `docs:dev` (the config's workspace
 * orchestrator invokes this as the `@pantoken/docs#demo-snippets` node, watching `docs/demos`). Writing
 * into `public/` triggers a Vite full reload, so an open `/play` demo refetches the updated snippet.
 *
 * @module
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const demosSrc = join(docsRoot, "demos");
const demosOut = join(docsRoot, "public", "demos");

/** Copy every `docs/demos/*.html` into `public/demos/`. Returns the number of snippets staged. */
export function stageDemoSnippets(): number {
  mkdirSync(demosOut, { recursive: true });
  if (!existsSync(demosSrc)) return 0;
  let count = 0;
  for (const file of readdirSync(demosSrc)) {
    if (!file.endsWith(".html")) continue;
    copyFileSync(join(demosSrc, file), join(demosOut, file));
    count += 1;
  }
  return count;
}

// Run when invoked directly (`node scripts/stage-demo-snippets.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = stageDemoSnippets();
  console.log(`✓ demo-snippets: staged ${String(count)} demo(s) to public/demos/`);
}
