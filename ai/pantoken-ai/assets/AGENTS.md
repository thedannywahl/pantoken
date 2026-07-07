# Working with pantoken (Instructure design tokens & icons)

This project uses **pantoken** to consume Instructure UI design tokens and icons. pantoken exports
the resolved tokens once and re-shapes them for many platforms. Reach for the smallest package that
fits the task; everything is also available under the unified `pantoken` package.

## The token model

Tokens are CSS custom properties named `--instui-<group>-<name>` (e.g.
`--instui-color-background-brand`, `--instui-spacing-space-md`). Themes: `rebrand` (default, with
`light-dark()` where light ≠ dark), `canvas`, `canvasHighContrast`. Icons are `<image>` tokens
(`--instui-icon-<name>`) derived from Lucide + Instructure custom glyphs.

## Pick the right package

**Web (CSS / JS):**

- `@pantoken/css` — the stylesheet. `import "@pantoken/css/inject"` (side-effect) or
  `import { css } from "@pantoken/css"`. Defines all `--instui-*` properties. Start here for any web app.
- `@pantoken/tokens` — the resolved token IR as JS/TS (`import { tokens, byTheme } from "@pantoken/tokens"`).
- `@pantoken/icons` — decoded SVG icon set (`getIcon("arrow-left")`).
- `@pantoken/web-components` — `<instui-icon name="arrow-left">` + styled primitives. Framework-agnostic.

**Frameworks:**

- React: `@pantoken/react` (`<Icon>`, `useToken`, `TokenProvider`). For InstUI's full React components use `@instructure/ui-*`.
- Vue: `@pantoken/vue` (plugin). Svelte: `@pantoken/svelte` (`icon` action). Angular: `@pantoken/angular`.
- React Native: `@pantoken/react-native` (StyleSheet-friendly objects, no CSS vars).
- Markdown: `@pantoken/react-markdown` (react-markdown → InstUI), `@pantoken/rehype` (`:icon:` tokens).

**Build tools:**

- Vite: `@pantoken/vite` (virtual modules + CSS inject). Next: `@pantoken/next` (`withPantoken` for `transpilePackages`).
- Tailwind: `@pantoken/tailwind` (preset → `bg-color-background-base`). PostCSS: `@pantoken/postcss` (`@pantoken;` at-rule). Webpack: `@pantoken/webpack`.

**Theme other systems:** `@pantoken/shadcn`, `@pantoken/bootstrap` (CSS-var bridges), `@pantoken/storybook` (theme).

**Native / other ecosystems (generated via CLI):** `pantoken generate <target>` where target is
`swift`, `android`, `compose`, `flutter`, `wordpress`, `vanilla`, or `drupal`. Add `--icons a,b` to
also emit icon assets, `--theme <name>`, `--out <dir>`.

**Design & interchange:** `@pantoken/dtcg` (W3C DTCG JSON), `@pantoken/scss` (SCSS vars),
`@pantoken/figma` (Figma Variables payload), `@pantoken/email` (inline-friendly values).

## Common recipes

- **Style a web app:** `npm i @pantoken/css` then `import "@pantoken/css/inject";`. Use
  `var(--instui-color-background-brand)` etc. in your CSS.
- **Icons anywhere:** `npm i @pantoken/web-components`, `import "@pantoken/web-components";`, then
  `<instui-icon name="check-mark"></instui-icon>`.
- **Tailwind:** add `pantokenPreset()` to `presets` and import `@pantoken/css`.
- **Native app:** `npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark`.
- **Push to Figma:** `toFigmaVariables(tokens)` → feed a Figma plugin / the Variables REST API.

## Rules

- Prefer `var(--instui-*)` references over hard-coded colours so theming (light/dark, high-contrast) keeps working.
- Don't invent token names — resolve them from `@pantoken/tokens` or the generated CSS.
- For non-React frameworks, prefer `@pantoken/web-components` over porting components.
