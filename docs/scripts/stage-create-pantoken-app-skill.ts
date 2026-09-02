/**
 * Publish the `create-pantoken-app` skill at `/create-pantoken-app.md`, so any agent CLI's own
 * fetch tool can pull down the exact same instructions a local Claude install reads from
 * `.claude/skills/create-pantoken-app/SKILL.md` (via `npx @pantoken/ai init`) — no install step
 * required. `public/` is served verbatim by VitePress (see `robots.txt`), so this is a plain copy
 * of the one canonical source, run before `vitepress dev`/`build`.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const source = join(docsRoot, "../ai/pantoken-ai/skills/create-pantoken-app/SKILL.md");
const publicDir = join(docsRoot, "public");

mkdirSync(publicDir, { recursive: true });
copyFileSync(source, join(publicDir, "create-pantoken-app.md"));

console.log("✓ staged create-pantoken-app skill to public/create-pantoken-app.md");
