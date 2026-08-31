/**
 * Copy the committed demo snippets (`docs/demos/*.html`) into `public/demos/` so the `/play` runner can
 * fetch them. They're bare markup fragments (no `<link>` of their own — the runner injects the shared
 * sheets), so this is a plain file copy. Each non-root locale's translated clone
 * (`docs/<locale>/demos/*.html`, see `translate-demos.ts`) is staged the same way into
 * `public/<locale>/demos/`, so a locale page's `demo:self:` fence (routed there by `demoMarkdownIt`'s
 * `localePrefix` option) resolves to localized prose instead of the English source.
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on edits during `docs:dev` (the config's workspace
 * orchestrator invokes this as the `@pantoken/docs#demo-snippets` node, watching `docs/demos`). Writing
 * into `public/` triggers a Vite full reload, so an open `/play` demo refetches the updated snippet.
 *
 * @module
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const docsRoot = join(import.meta.dirname, "..");
const demosSrc = join(docsRoot, "demos");
const demosOut = join(docsRoot, "public", "demos");

/** Copy every `.html` file from `srcDir` into `outDir` (creating it if needed). Returns the count. */
function copyHtmlDir(srcDir: string, outDir: string): number {
  mkdirSync(outDir, { recursive: true });
  if (!existsSync(srcDir)) return 0;
  let count = 0;
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith(".html")) continue;
    copyFileSync(join(srcDir, file), join(outDir, file));
    count += 1;
  }
  return count;
}

/**
 * Copy every `docs/demos/*.html` into `public/demos/`, plus each non-root locale's translated clone
 * into `public/<locale>/demos/`. Returns the total number of snippets staged (root + all locales).
 */
export function stageDemoSnippets(): number {
  let count = copyHtmlDir(demosSrc, demosOut);
  for (const locale of NON_ROOT_LOCALES) {
    count += copyHtmlDir(
      join(docsRoot, locale, "demos"),
      join(docsRoot, "public", locale, "demos"),
    );
  }
  return count;
}

// Run when invoked directly (`node scripts/stage-demo-snippets.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = stageDemoSnippets();
  console.log(`✓ demo-snippets: staged ${String(count)} demo(s) to public/demos/`);
}
