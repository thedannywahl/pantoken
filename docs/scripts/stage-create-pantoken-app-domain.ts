/**
 * Publish the `create-pantoken-app` skill to the `create.pantoken.app` submodule
 * (`ai/create-pantoken-app-site`): the raw content goes to `SKILL.md` (the canonical short path,
 * `create.pantoken.app/SKILL.md`) and `create-pantoken-app.md` (parity alias with the
 * `pantoken.app/create-pantoken-app.md` path). `index.html` is a redirect stub pointing "/" at
 * `SKILL.md` (proper 200 + `text/markdown` for clients that render HTML/meta-refresh or run JS),
 * and `404.html` is a raw copy of the skill (GitHub Pages serves it for any unmatched path,
 * including "/" — no Jekyll/`permalink` frontmatter needed, this repo is `.nojekyll`) so a plain
 * non-rendering `GET /` still gets the content immediately instead of the redirect stub.
 * `404.html`'s downsides — an `.html`-typed body some agent fetch tools run through an
 * HTML-to-text pass and mangle, and an HTTP 404 status some tools refuse to read the body of —
 * are why `index.html` (proper 200 + type) stays the primary path and `404.html` is only the
 * fallback. See `stage-create-pantoken-app-skill.ts` for the sibling copy served at `pantoken.app`.
 *
 * This only stages the working tree inside the submodule; committing and pushing the submodule
 * repo (which triggers the GitHub Pages redeploy) is a separate, manual step.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const source = join(docsRoot, "../ai/pantoken-ai/skills/create-pantoken-app/SKILL.md");
const siteDir = join(docsRoot, "../ai/create-pantoken-app-site");
const target = "/SKILL.md";

const redirectHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="https://create.pantoken.app${target}" />
    <title>create-pantoken-app</title>
    <script>location.replace(${JSON.stringify(target)});</script>
  </head>
  <body>
    <p>Redirecting to <a href="${target}">${target}</a>&hellip;</p>
  </body>
</html>
`;

mkdirSync(siteDir, { recursive: true });
copyFileSync(source, join(siteDir, "SKILL.md"));
copyFileSync(source, join(siteDir, "create-pantoken-app.md"));
writeFileSync(join(siteDir, "index.html"), redirectHtml);
copyFileSync(source, join(siteDir, "404.html"));

console.log("✓ staged create-pantoken-app skill to ai/create-pantoken-app-site/");
