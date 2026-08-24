# Working with pantoken (Instructure design tokens & icons)

This project uses **pantoken** to consume Instructure UI design tokens and icons. pantoken exports
the resolved tokens once and re-shapes them for many platforms. Reach for the smallest scoped
package that fits the task (e.g. `@pantoken/components`, `@pantoken/css`, `@pantoken/tokens`). The
unified `pantoken` package re-exports all scoped packages; only install it with
`npm i @pantoken/pantoken` when you need several of those packages together in one dependency.

## The token model

Tokens are CSS custom properties named `--instui-<group>-<name>` (e.g.
`--instui-color-background-brand`, `--instui-spacing-space-md`). Themes: `rebrand` (default, with
`light-dark()` where light ≠ dark), `canvas`, `canvasHighContrast`. Icons are `<image>` tokens
(`--instui-icon-<name>`) derived from Lucide + Instructure custom glyphs.

To activate a non-default theme, pass `--theme canvas` to the CLI or use `byTheme("canvas")` from
`@pantoken/tokens`. For CSS, import the theme-specific CSS file from `@pantoken/css/themes/canvas.css`.
To scope a theme to a subtree rather than the whole page, wrap that subtree in an element and apply
the theme CSS file or `byTheme()` output scoped to that element's selector. Nested theming is not
supported out of the box; each theme CSS file sets vars at `:root`.

## Pick the right package

**Decision order for web styling** — pick the first that matches:

1. Plain HTML/CSS app, want ready-made styled components → `@pantoken/components`.
2. Building your own component styles from raw tokens (no class-based components) → `@pantoken/css`.
3. Need token values in JS/TS logic (not just CSS) → `@pantoken/tokens`.
4. Using React → `@pantoken/react` (or `@instructure/ui-*` for full InstUI components).
5. Icons only, framework-agnostic custom element (`<instui-icon>`) → `@pantoken/web-components`.
   For raw decoded SVG markup/data instead of a custom element, use `@pantoken/icons` (`getIcon("arrow-left")`).

After selecting a base package, also consider `@pantoken/plugin-layouts` (app-shell layout) and
`@pantoken/plugin-custom-components` (extra components) when using `@pantoken/components`.

**Web (CSS / JS):**

- `@pantoken/components` — **preferred bootstrap for plain HTML/CSS web apps.** The InstUI-look
  class-based component library (`components.css`: `.instui-button`, `.instui-alert`, `.instui-badge`,
  …), plus `base.css` (document defaults + focus ring), `prose.css` (content/markdown styling),
  `utilities.css` (spacing/layout/colour utility classes), `icons.css`, and opt-in `fonts.css` /
  `select.css`. Built from the tokens with no InstUI React dependency.
- `@pantoken/plugin-layouts` — layout composition records (currently `wrapper`) that compose
  `@pantoken/components` into an app-shell structure. Use alongside `@pantoken/components` when
  bootstrapping a full page layout.
- `@pantoken/plugin-custom-components` — additional cssdoc-documented components beyond the core set
  (currently `card`, `agent-shell`). Use alongside `@pantoken/components` for extra component patterns.
- `@pantoken/css` — all tokens emitted as `--instui-*` CSS custom-property (`var()`) declarations, with
  no class-based components. `import "@pantoken/css/inject"` (side-effect) or
  `import { css } from "@pantoken/css"`. Reach for this when you're building your own component styles
  from the raw tokens rather than using `@pantoken/components`.
- `@pantoken/tokens` — the resolved token IR as JS/TS (`import { tokens, byTheme } from "@pantoken/tokens"`).
- `@pantoken/icons` — decoded SVG icon set as raw markup/data (`getIcon("arrow-left")`). Use when you
  need the SVG itself (e.g. to inline, transform, or feed to another rendering system) rather than a
  ready-made element.
- `@pantoken/interactions` — vanilla JS behavior functions for components (modal, tooltip, in-place-edit, close-button). IIFE entry points for CDN consumers; ESM for bundlers.
- `@pantoken/web-components` — `<instui-icon name="arrow-left">` + styled primitives. Framework-agnostic.
  Prefer this for drop-in icon markup; it renders `@pantoken/icons` under the hood as a custom element.

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
`swift`, `android`, `compose`, `flutter`, `rust`, `wordpress`, `vanilla`, `drupal`, `jekyll`, or
`hugo`. Add `--icons a,b` to also emit icon assets, `--theme <name>`, `--out <dir>`, and for Rust
`--format <egui|iced>`.

**Design & interchange:** `@pantoken/dtcg` (W3C DTCG JSON), `@pantoken/scss` (SCSS vars),
`@pantoken/figma` (Figma Variables payload), `@pantoken/email` (inline-friendly values).

## Common recipes

- **Bootstrap a plain web app:** `npm i @pantoken/components` then import `base.css` +
  `components.css` (+ `utilities.css` as needed). Apply classes like `class="instui-button"` to your
  markup. Add `@pantoken/plugin-layouts` for an app-shell layout and
  `@pantoken/plugin-custom-components` for extra components (`card`, `agent-shell`).
- **Style from raw tokens only (no components):** `npm i @pantoken/css` then
  `import "@pantoken/css/inject";`. Use `var(--instui-color-background-brand)` etc. in your own CSS.
- **Icons anywhere:** `npm i @pantoken/web-components`, `import "@pantoken/web-components";`, then
  `<instui-icon name="check-mark"></instui-icon>`.
- **Component behaviors (vanilla JS):** `npm i @pantoken/interactions`, then import `initModal`, `initTooltip`, `initInPlaceEdit`, or `initCloseButton` to wire behaviors. For CDN/IIFE: link `@pantoken/interactions/dist/interactions.iife.js` and check `component-capabilities.json` for per-component `.iife.js` entry points.
- **Tailwind:** add `pantokenPreset()` to `presets` and import `@pantoken/css`.
- **Native app:** `npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark`.
- **Rust app:** `npx pantoken generate rust --out ./src/tokens.rs --format egui`.
- **Push to Figma:** `toFigmaVariables(tokens)` → feed a Figma plugin / the Variables REST API.

## IDE integration

- **Class/token completion:** `npm i @pantoken/pantoken`, then point VS Code at its shipped
  custom-data JSON in workspace `.vscode/settings.json`:

  ```json
  {
    "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
    "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
  }
  ```

  Reload VS Code to pick up the new data. This gives completion/hover for `instui-*` classes
  (and `-modifier` class tokens) and `--instui-*` custom properties without a pantoken-specific
  extension.

- **cssdoc authoring support:** install the `cssdoc.cssdoc-vscode` extension for hover/completion
  on cssdoc doc-comment tags (`@component`, `@token`, `@affects`, etc.) when authoring or reading
  the `.css` records that back `@pantoken/components` and its plugins.

## Full documentation

This file is a cheatsheet and can lag behind the real API surface. For anything it doesn't cover, or
to confirm a detail, fetch the live docs at `https://pantoken.iywahl.com/`:

- `/llms.txt` — an agent-legible index of the whole site.
- `/llms-full.txt` — the entire site as one document.
- Any page as Markdown by appending `.md` to its URL (e.g. `/guide/packages.md`).
- `/.well-known/api-catalog` — a machine-readable manifest linking to the above.

## Rules

- Prefer `var(--instui-*)` references over hard-coded colours so theming (light/dark, high-contrast) keeps working.
- Don't invent token names — resolve them from `@pantoken/tokens` or the generated CSS.
- To discover available tokens, import `tokens` from `@pantoken/tokens` and inspect its keys, or open the generated CSS file and search for `--instui-`.
- For non-React frameworks that lack a dedicated pantoken package, prefer `@pantoken/web-components`
  over porting components. When a framework package exists (Vue, Svelte, Angular), use it instead.
