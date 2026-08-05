---
name: bootstrap-pantoken
description: Set up Instructure design tokens and icons (pantoken) in this project. Use when the user wants to add Instructure/Canvas theming, InstUI design tokens, or the pantoken packages to an app — detects the framework, installs the right @pantoken/* packages, and wires the token CSS.
---

# Bootstrap pantoken

Set up [pantoken](https://www.npmjs.com/package/pantoken) — Instructure UI design tokens and icons —
in the current project. Work through these steps.

## 1. Detect the target

Inspect the repo to decide what to install:

- `package.json` dependencies → web framework (react, vue, svelte, @angular/core, react-native,
  next, vite, tailwindcss, webpack, postcss).
- If no `package.json` is found, ask the user whether this is a new web project (run `npm init -y`
  first) or a native/CMS project and proceed to step 4 accordingly.
- Native project files → iOS (`Package.swift`, `*.xcodeproj`), Android (`build.gradle`), Flutter
  (`pubspec.yaml`), WordPress/Drupal/Vanilla theme dirs.

## 2. Install

Always install the CSS layer for web projects:

```sh
npm i @pantoken/css
```

Then add the framework/tool package(s):

If multiple rows match, install all corresponding packages. Framework rows (React, Vue, etc.)
take priority for the primary install; tool rows (Tailwind, PostCSS, Vite) are additive.

| Detected                | Install                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| html                    | `@pantoken/components`;                                                                                                            |
| React                   | `@pantoken/react`; if the user also wants full InstUI components (buttons, modals, etc.), additionally install `@instructure/ui-*` |
| Vue / Svelte / Angular  | `@pantoken/vue` / `@pantoken/svelte` / `@pantoken/angular` + `@pantoken/web-components`                                            |
| React Native            | `@pantoken/react-native`                                                                                                           |
| Next.js                 | `@pantoken/next`                                                                                                                   |
| Vite                    | `@pantoken/vite`                                                                                                                   |
| Tailwind                | `@pantoken/tailwind`                                                                                                               |
| PostCSS / Webpack       | `@pantoken/postcss` / `@pantoken/webpack`                                                                                          |
| shadcn / Bootstrap      | `@pantoken/shadcn` / `@pantoken/bootstrap`                                                                                         |
| markdown-it / css-in-js | `@pantoken/markdown-it` / `@pantoken/css-in-js`                                                                                    |
| Icons anywhere          | `@pantoken/web-components`                                                                                                         |

For native / CMS targets, no install — run the CLI (step 4).

## 3. Wire it up

- Web entry: add `import "@pantoken/css/inject";` (or `@import "@pantoken/css/style.css";`).
- Next: wrap the config with `withPantoken(...)` and import the CSS in the root layout.
- Vite: add the `pantoken()` plugin. Tailwind: add `pantokenPreset()` to `presets`.
- Web components: `import "@pantoken/web-components";` then use `<instui-icon name="…">`.
- Verify the app renders and `getComputedStyle(document.documentElement).getPropertyValue('--instui-color-background-brand')` is non-empty.
  If the property is empty, check that `import "@pantoken/css/inject"` appears before any component imports in the entry file, and that the dev server was restarted after install. Report the specific failure to the user with corrective steps.

## 4. Native / other ecosystems

```sh
npx pantoken generate <swift|android|compose|flutter|rust|wordpress|vanilla|drupal|jekyll|hugo> --out <dir> [--icons a,b] [--theme rebrand]
```

## Conventions to follow afterward

- Style with `var(--instui-*)` references, not hard-coded colours, so light/dark and high-contrast
  theming keeps working.
- Resolve real token names from `@pantoken/tokens`; never invent them.
