# @pantoken/scaffold

## 0.2.0

### Minor Changes

- efed45f: Initial release: `npx @pantoken/scaffold <platform>` scaffolds a starter project — `web` (plain HTML/CSS via Vite + TS), `react` (Vite + React), or `next` (Next.js App Router) — with pantoken already installed and wired in. Also usable programmatically via `scaffoldProject`/`SCAFFOLD_PLATFORMS`.
- efed45f: Renamed the `web` platform to `html`, and added two new platforms: `angular` (standalone Angular via Vite, no Angular CLI, using `@pantoken/angular`) and `web-components` (plain Vite + `@pantoken/web-components`, no framework). Every platform's entry markup is now generated at build time from `@pantoken/plugin-layouts`'s `wrapper` app-shell layout (`.container`/`.header`/`.content` parts, via `scripts/wrapper-layout.ts`), so template markup stays in sync automatically when that layout changes.

### Patch Changes

- efed45f: Every scaffold platform (`web`, `react`, `next`) now writes `.vscode/settings.json` (`html.customData`/`css.customData` pointing at `@pantoken/pantoken`'s shipped custom-data JSON) and `.vscode/extensions.json` (recommending `cssdoc.cssdoc-vscode`), and adds `@pantoken/pantoken` as a devDependency so those paths resolve after install.
