# Engineering log

Hard-won fixes and gotchas from pantoken work. Each entry is symptom → root cause → the durable rule,
so future work doesn't re-learn the lesson. Version and PR numbers are deliberately left out; the
lesson is timeless.

## Toolchain

### oxfmt corrupts interpolated CSS-in-TS selectors

**Symptom** — After `vp fmt`/`vp check`, a component's compound selector silently changed meaning:
`${p}foo.-modifier` became `${p}foo .-modifier` (compound → descendant), and single-line rules
reflowed to multi-line.

**Root cause** — oxfmt (Prettier-based) treats ` css` `**and**` styled` ` tagged templates as
embedded CSS and reformats them. `embeddedLanguageFormatting: "off"` does **not** stop it — earlier
"it works" results were `vp` cache artifacts; verify with a clean cache. The tag name doesn't matter.

**Fix / rule** — Put a `// prettier-ignore` line immediately before each tagged template (before the
template for a direct arrow body, before `return` for a block body). oxfmt then leaves the template
verbatim and still formats the rest of the file. Don't use inline `/* prettier-ignore */` — it's
inconsistent for block bodies. When you add a record builder, tag it ` css` ``+`// prettier-ignore`
or the next format pass rewrites its selectors.

### Backticks inside a CSS comment terminate the template string

**Symptom** — A record's `css: (p) => \`…\``body failed to compile after adding a`/_ … _/` comment.

**Root cause** — The `css` body is a JS template literal, so a backtick (or `${`) inside a CSS comment
closes the string early.

**Fix / rule** — Keep CSS-comment prose backtick-free and escape `${` inside the body.

### `vp pack` doesn't resolve `?raw`

**Symptom** — A published build failed with `[UNLOADABLE_DEPENDENCY] Could not load x.css?raw`, though
Vite dev and test worked.

**Root cause** — `vp pack` (rolldown) doesn't resolve Vite's `?raw` query; only the Vite dev/test path
does.

**Fix / rule** — Don't inline CSS via `?raw`. Use a codegen that reads the `.css` files and emits
string consts (the web-components `scripts/styles.ts` pattern), run before pack/check/test.

### A nested `vp` spawn dies under `vpr docs:dev`

**Symptom** — On a cache miss, a task spawned from inside the running VitePress process failed with
`Failed to spawn process: Invalid argument (os error 22)`; cache-hit replays looked fine, so it
seemed intermittent.

**Root cause** — Under `vpr docs:dev`, VitePress runs under `vp`; a `vp run`/`vp pack` spawned from
**within** that process can't spawn.

**Fix / rule** — Spawn `node scripts/x.ts` directly from inside a `vp`-run process, never a nested `vp
run`. See `docs/conventions/build-and-docs.md`.

### `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC` after a cssdoc bump

**Symptom** — Install or the docs dev-server startup failed with a missing catalog entry.

**Root cause** — pantoken consumes `@cssdoc/*`, whose packages reference `catalog:` deps that
pantoken's own catalog must also carry.

**Fix / rule** — When cssdoc adds a catalog dependency, mirror it into pantoken's catalog.

### Moving packages deeper stales the `.bin` shims

**Symptom** — After relocating packages one directory deeper, their `node_modules/.bin` relative shims
pointed at the wrong depth; a plain reinstall reported "up to date" and didn't relink.

**Fix / rule** — `rm -rf <moved>/*/node_modules && pnpm install` to force a relink.

## Browser / bundling

### A postcss-based value import kills the browser client

**Symptom** — On doc pages, all client JS died at app init with `createRequire is not a function`
(both light/dark theme toggles broke).

**Root cause** — `@pantoken/components` and `@pantoken/web-components` ship to the browser. A
**value** import of a postcss-based `@cssdoc/*` package made rolldown inject a `createRequire` /
`node:module` shim into the ESM build, which has no meaning in the browser.

**Fix / rule** — Keep `@cssdoc/*` value imports out of these packages' `src/`. Type-only imports are
fine (erased at build); value imports belong in build scripts and tests. Do doc-comment recovery with
a regex over the source, not a runtime `parseCssDocs` call.

### VitePress runs Markdown through Vue

**Symptom** — A page module failed to compile, or custom elements rendered as unresolved Vue
components.

**Root cause** — VitePress compiles Markdown through Vue's SFC parser. It treats `<instui-x>` as an
unresolved component and tries to import a native `<img src="/local">`'s file.

**Fix / rule** — Set `vue.template.compilerOptions.isCustomElement = (tag) =>
tag.startsWith("instui-")` in `docs/.vitepress/config.ts`. In an `@example`, use an absolute/CDN/data
`src` or a custom-element `src` — avoid a native `<img>` with a local path. Escape raw `<tag>`/`&#123;&#123;` in
prose the emitter renders (an `escProse()` handles this; backticked code spans are exempt).

## CSS API surface

### A `-icon-` modifier hits the glyph painter

**Symptom** — A modifier named `-icon-position-end` rendered a solid square on the element.

**Root cause** — The generic `[class*="-icon-"]::before` mask painter matched the modifier and tried to
paint an undefined glyph.

**Fix / rule** — Never name a modifier with a `-icon-` substring unless it's a real glyph (the fix was
renaming it `-chevron-end`).

### `:scope-*` corruption from `scope()`

**Symptom** — A scoped component emitted a broken `:scope-value` / `:scope-messages` selector.

**Root cause** — `scope()` splits the body on the root token; when the root prefixes a flat sibling
class (`.instui-progress` prefixes `.instui-progress-value`), the split corrupts the sibling.

**Fix / rule** — Keep flat siblings and root-modifier-only rules (especially `-size-*`, which the alias
post-processors append at top level) **outside** the `@scope` block. See `docs/conventions/authoring.md`.
