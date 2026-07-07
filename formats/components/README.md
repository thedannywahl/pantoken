# @pantoken/components

An InstUI-look CSS component library, built from the `--instui-*` tokens. Two layers:

- **Prose** — styles rendered markdown/prose HTML (tables, headings, links, lists, code) scoped to a
  content root, so a docs page or content region looks like InstUI. This is what the site renderers
  ship as their `components.css`.
- **Components** — class-based component styles you apply to your own markup
  (`<button class="instui-button">`), for the InstUI look outside a component framework.

It's pure CSS derived from the tokens, so it tracks InstUI through the token IR with no dependency on
the InstUI React packages. For the real, interactive components, use `@pantoken/react-markdown`
(content) or `@instructure/ui-*` (apps).

## Install

```sh
npm i @pantoken/components
```

Also available as `pantoken/components`.

## Usage

Import the ready stylesheets:

```ts
import "@pantoken/components/components.css"; // .instui-button, .instui-alert, .instui-badge
import "@pantoken/components/prose.css"; // styles content in a .pantoken-prose region
```

```html
<button class="instui-button">Save</button>
<button class="instui-button -color-secondary">Cancel</button>
<div class="instui-alert -color-success">Saved.</div>
<span class="instui-badge -color-danger">3</span>
```

Or build a stylesheet with a custom prefix or scope:

```ts
import { componentsCss, proseCss } from "@pantoken/components";

writeFileSync("ui.css", componentsCss({ prefix: "ui" })); // .ui-button, …
writeFileSync("bare.css", componentsCss({ prefix: null })); // .button, .alert — no prefix
writeFileSync("content.css", proseCss({ scope: ".markdown" }));
```

The builders drop the class prefix on any falsy value (`null`, `undefined`, `""`, or omitting the
option), so `componentsCss({ prefix: null })` yields `.button`, `.alert`, and you can author
`class="heading -h1"`. Pass a truthy prefix — as the shipped `components.css` does with `"instui"` — to
namespace every class.

## API

- **`componentsCss(options?): string`** — every class-based component (button, alert, badge).
  `options.prefix` sets the class prefix; any falsy value drops it (`.button`).
- **`buttonCss` / `alertCss` / `badgeCss` (options?)** — one component's stylesheet.
- **`proseCss(options?): string`** — the prose/content stylesheet. `options.scope` sets the
  content-root selector (default `".pantoken-prose"`).
- **`ComponentOptions`, `ProseOptions`** — the option types.
- **`./components.css`** — the components at the default `instui` prefix.
- **`./prose.css`** — the prose layer at the default `.pantoken-prose` scope.

## Components

| Class                     | Modifiers / parts                                                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.instui-button`          | `-color-secondary`/`-tertiary`/`-success`/`-danger`/`-ai`/`-ai-secondary`/`-primary-inverse`, `-size-sm`/`-lg`, `-shape-square`/`-circle`, plus `-condensed`, `-toggle`, `-without-background`/`-without-border`           |
| `.instui-alert`           | `-color-info`/`-success`/`-warning`/`-danger` (deprecated InstUI `-variant-*`), `-has-shadow`                                                                                                                              |
| `.instui-badge`           | `-color-success`, `-color-danger`, `-placement-*`                                                                                                                                                                          |
| `.instui-pill`            | `-color-info`, `-color-success`, `-color-warning`, `-color-danger`                                                                                                                                                         |
| `.instui-tag`             | `-size-sm`/`-lg` (hover state)                                                                                                                                                                                             |
| `.instui-avatar`          | `-shape-rectangle`, `-size-sm`/`-lg`, `-color-blue`/`green`/`red`/`orange`                                                                                                                                                 |
| `.instui-tabs`            | `.list`, `.tab` (`-selected`), `.panel`                                                                                                                                                                                    |
| `.instui-metric`          | `.value`, `.label`                                                                                                                                                                                                         |
| `.instui-byline`          | `.title`, `.description`                                                                                                                                                                                                   |
| `.instui-table`           | styles `th`/`td` inside (for hand-built tables)                                                                                                                                                                            |
| `.instui-link`            | hover, `[aria-disabled]`                                                                                                                                                                                                   |
| `.instui-list`            | token-driven item spacing                                                                                                                                                                                                  |
| `-icon-<name>`            | glyph modifier on any element — masked `::before` in `currentColor`, sized to the text (`<span class="instui-icon -icon-arrow-right">`; glyph classes ship in `icons.css`; a full `<instui-icon>` lives in web-components) |
| `.instui-checkbox`        | wraps a native checkbox + label; `-variant-toggle` renders it as a switch                                                                                                                                                  |
| `.instui-radio`           | wraps a native radio + label                                                                                                                                                                                               |
| `.instui-spinner`         | animated CSS ring                                                                                                                                                                                                          |
| `.instui-progress`        | `.bar` with `-color-success`, `-color-danger`                                                                                                                                                                              |
| `.instui-menu`            | `.item`, `.separator`                                                                                                                                                                                                      |
| `.instui-modal`           | `.header`, `.body`, `.footer`                                                                                                                                                                                              |
| `.instui-breadcrumb`      | `.item` (with `/` separators)                                                                                                                                                                                              |
| `.instui-billboard`       | `.message`                                                                                                                                                                                                                 |
| `.instui-rating`          | `.star` (`-filled`)                                                                                                                                                                                                        |
| `.instui-toggle-group`    | joins `.instui-button` children into a segmented control                                                                                                                                                                   |
| `.instui-context-view`    | a callout surface with a caret                                                                                                                                                                                             |
| `.instui-progress-circle` | a ring driven by a `--value` (0–100) custom property                                                                                                                                                                       |
| `.instui-pagination`      | `.page` (with `[aria-current]`)                                                                                                                                                                                            |
| `.instui-truncate`        | single-line ellipsis; `--lines` for a multi-line clamp                                                                                                                                                                     |
| `.instui-toggle-details`  | a styled native `<details>` accordion                                                                                                                                                                                      |
| `.instui-file-drop`       | dropzone with `-hover`, `-accepted`, `-rejected`                                                                                                                                                                           |
| `.instui-range`           | a styled `input[type="range"]`                                                                                                                                                                                             |

The prose layer also styles GFM strikethrough (`~~`) and task lists. Components that are inherently
interactive or layout-only (drawers, editable/in-place-edit, popover/tray positioning, transitions,
charts, trees, view/flex/grid, app shells) are intentionally left to `@instructure/ui`; this library
covers the styleable, static ones.

## Related

- The site renderers (`@pantoken/vitepress`, `@pantoken/docusaurus`, and the rest) ship the prose
  layer pre-scoped to their content root as their own `components.css`.
- `@pantoken/react-markdown` renders the actual InstUI components (the exact, interactive tier).

## License

MIT
