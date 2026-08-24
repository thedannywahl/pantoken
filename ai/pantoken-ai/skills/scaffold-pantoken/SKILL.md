---
name: scaffold-pantoken
description: Scaffold a new project, or add Instructure design tokens and icons (pantoken) to an existing one. Use when the user wants to start a new app with pantoken already wired in, or wants to add Instructure/Canvas theming, InstUI design tokens, or the pantoken packages to an existing app — detects the framework, installs the right @pantoken/* packages, and wires the token CSS.
---

# Scaffold pantoken

Set up [pantoken](https://www.npmjs.com/package/@pantoken/pantoken) — Instructure UI design tokens and icons —
in the current project. Work through these steps.

## 1. New project or existing repo?

- **Empty directory, or no repo yet** — scaffold a starter with the CLI, then stop (steps 2-3 are
  already done for you by the template):

  ```sh
  npx @pantoken/ai scaffold <html|react|next|angular|web-components> [--dir .]
  ```

  This writes a minimal starter (`package.json`, entry file(s), README) for the chosen platform
  with pantoken already installed and wired in, and also installs pantoken's agent assets
  (AGENTS.md, editor/agent rules, skills) into the same directory. If you only want the starter
  project without the agent assets, run `npx @pantoken/scaffold <platform> [--dir .]` directly
  instead. Run `npm install` (or the detected package manager's install) in the target directory
  afterward, substituting `pnpm`/`yarn`/`bun` for `npm` as detected. More platforms land over time;
  if the desired platform is not yet supported by the scaffold CLI, skip the CLI entirely and
  proceed directly to step 2 to manually install and wire pantoken.

- **Existing repo you want to add pantoken to** — continue to step 2.

## 2. Determine the target

Ask the user what kind of project they're building, unless it's unambiguous from the repo. Offer:

- **Native web (plain HTML/CSS, no framework) — default** → `@pantoken/components`
- A JS framework (React, Vue, Svelte, Angular, React Native, Next.js)
- A build tool only, styling from raw tokens (Tailwind, PostCSS, Vite, Webpack, or plain `@pantoken/css`)
- A native/CMS ecosystem (Swift, Android, Compose, Flutter, Rust, WordPress, Drupal, Vanilla, Jekyll, Hugo)

If the user doesn't answer or has no preference, default to native web (`@pantoken/components`).

Corroborate with the repo when possible, and prefer the user's answer if it conflicts with detection:

- `package.json` dependencies → web framework (react, vue, svelte, @angular/core, react-native,
  next, vite, tailwindcss, webpack, postcss).
- If no `package.json` is found and the user wants a web project, run `npm init -y` first, then
  proceed with the native web default (or the chosen framework).
- Native project files → iOS (`Package.swift`, `*.xcodeproj`), Android (`build.gradle`), Flutter
  (`pubspec.yaml`), WordPress/Drupal/Vanilla theme dirs.

Also detect the package manager from the lockfile present in the repo, and use its equivalent
command for every install/run step below instead of assuming npm:

| Lockfile found             | Package manager | Add package(s)   | Run a package's CLI |
| -------------------------- | --------------- | ---------------- | ------------------- |
| `pnpm-lock.yaml`           | pnpm            | `pnpm add <pkg>` | `pnpm dlx <pkg>`    |
| `yarn.lock`                | yarn            | `yarn add <pkg>` | `yarn dlx <pkg>`    |
| `bun.lock`/`bun.lockb`     | bun             | `bun add <pkg>`  | `bunx <pkg>`        |
| `package-lock.json` / none | npm             | `npm i <pkg>`    | `npx <pkg>`         |

If no lockfile exists yet, default to npm (or whatever the user prefers).

## 3. Install

Use the package manager detected in step 2 for every command below (the examples use `npm i`;
substitute `pnpm add`, `yarn add`, or `bun add` as appropriate).

Follow this decision checklist in order:

1. **Is it native web** (plain HTML/CSS, no framework and no build tool detected)? Install only
   `@pantoken/components` — it ships the token CSS baked in, so no separate `@pantoken/css` install
   is needed — and stop:

   ```sh
   npm i @pantoken/components
   ```

2. **Is it Next.js?** Install `@pantoken/css` plus `@pantoken/next` (do NOT also install
   `@pantoken/react` — `@pantoken/next` includes the React integration), then add any matching tool
   packages (Tailwind, Vite, etc.) from the table below.

3. **Otherwise**, install `@pantoken/css` first:

   ```sh
   npm i @pantoken/css
   ```

   Then add the framework package and every matching tool row's package from the table. Framework
   rows (React, Vue, etc.) and tool rows (Tailwind, PostCSS, Vite, Webpack) are all additive —
   install every matching row's package alongside `@pantoken/css`.

For example:

- A Next.js project also using Tailwind installs `@pantoken/css @pantoken/next @pantoken/tailwind`.
- A React project also using Vite installs `@pantoken/css @pantoken/react @pantoken/vite`.

| Detected                | Install                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native web (default)    | `@pantoken/components`                                                                                                                                                                                                                                                             |
| React                   | `@pantoken/react`; if the user also wants full InstUI components (buttons, modals, etc.), additionally install the specific `@instructure/ui-*` packages needed, e.g. `@instructure/ui-buttons @instructure/ui-modal` (see <https://instructure.design> for the full package list) |
| Vue / Svelte / Angular  | `@pantoken/vue` / `@pantoken/svelte` / `@pantoken/angular` + `@pantoken/web-components` (always install `@pantoken/web-components` alongside the framework package — it's required for icon support, not optional)                                                                 |
| React Native            | `@pantoken/react-native`                                                                                                                                                                                                                                                           |
| Next.js                 | `@pantoken/next` — Next.js projects do NOT also need `@pantoken/react`; `@pantoken/next` includes the React integration. Do not install both.                                                                                                                                      |
| Vite                    | `@pantoken/vite`                                                                                                                                                                                                                                                                   |
| Tailwind                | `@pantoken/tailwind`                                                                                                                                                                                                                                                               |
| PostCSS / Webpack       | `@pantoken/postcss` / `@pantoken/webpack`                                                                                                                                                                                                                                          |
| shadcn / Bootstrap      | `@pantoken/shadcn` / `@pantoken/bootstrap`                                                                                                                                                                                                                                         |
| markdown-it / css-in-js | `@pantoken/markdown-it` / `@pantoken/css-in-js`                                                                                                                                                                                                                                    |
| Icons anywhere          | `@pantoken/web-components`                                                                                                                                                                                                                                                         |

For native / CMS targets, no install — run the CLI (step 5).

## 4. Wire it up

- Native web (default): import `base.css` + `components.css` from `@pantoken/components` (e.g.
  `import "@pantoken/components/base.css"; import "@pantoken/components/components.css";`), then
  apply classes like `class="instui-button"` to markup.
- Other web entry: add `import "@pantoken/css/inject";` (or `@import "@pantoken/css/style.css";`).
- Next: wrap the config with `withPantoken(...)` and import the CSS in the root layout.
- Vite: add the `pantoken()` plugin. Tailwind: add `pantokenPreset()` to `presets`.
- Web components: `import "@pantoken/web-components";` then use `<instui-icon name="…">`.
- Verify the app renders and `getComputedStyle(document.documentElement).getPropertyValue('--instui-color-background-brand')` is non-empty.
  If the property is empty, check that the token CSS import (`@pantoken/components/base.css` or
  `@pantoken/css/inject`) appears before any component imports in the entry file, and that the dev
  server was restarted after install. Report the specific failure to the user with corrective steps.

## 5. Native / other ecosystems

```sh
npx pantoken generate <swift|android|compose|flutter|rust|wordpress|vanilla|drupal|jekyll|hugo> --out <dir> [--icons a,b] [--theme rebrand]
```

Substitute `pnpm dlx`, `yarn dlx`, or `bunx` for `npx` per the package manager detected in step 1.

## Conventions to follow afterward

- Style with `var(--instui-*)` references, not hard-coded colours, so light/dark and high-contrast
  theming keeps working.
- Resolve real token names from `@pantoken/tokens`; never invent them.
