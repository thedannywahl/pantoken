# @pantoken/components

An InstUI-look CSS component library, built from the `--instui-*` tokens. The shipped stylesheets:

- **`base.css`** — opt-in global document defaults from the tokens (box-sizing, body reset, page
  surface, base text/font, `color-scheme`). It also carries the focus-outline ring, so every focusable
  gets an accessible `:focus-visible` outline out of the box.
- **`prose.css`** — styles rendered markdown/prose HTML (tables, headings, links, lists, code) scoped
  to a content root, so a docs page or content region looks like InstUI. This is what the site
  renderers ship as their `components.css`.
- **`components.css`** — class-based component styles you apply to your own markup
  (`<button class="instui-button">`), for the InstUI look outside a component framework. The
  `--instui-elevation-*` shadow scale leads this sheet — enough components float that shadows are an
  intrinsic design attribute, not an add-on.
- **`utilities.css`** — an opt-in layer of cross-cutting classes: a `View` primitive, spacing, layout,
  and curated semantic colour/token utilities.
- **`fonts.css`** — opt-in `@font-face` rules for the Instructure brand fonts. `base.css` _applies_ the
  font; `fonts.css` _loads_ the woff2s, so text degrades gracefully without it.
- **`select.css`** — opt-in, **experimental**: styles the open `.instui-simple-select` dropdown via the
  CSS Customizable Select model (`appearance: base-select`, Chrome 135+). Every rule is `@supports`-gated,
  so it's inert where unsupported.
- **`icons.css`** — one `.instui-icon-<name>` glyph class per icon.

It's pure CSS derived from the tokens, so it tracks InstUI through the token IR with no dependency on
the InstUI React packages. For the real, interactive components, use `@pantoken/react-markdown`
(content) or `@instructure/ui-*` (apps).

Elevation and the focus ring used to be separate plugins; they now ship here because so many
components need them out of the box. The generic token→utility-class emitters, by contrast, live in
`@pantoken/utils` (this package feeds them the curated semantic names).

## Install

```sh
npm i @pantoken/components
```

Also available as `pantoken/components`.

## Usage

Import the ready stylesheets:

```ts
import "@pantoken/components/base.css"; // opt-in reset + focus ring (when pantoken owns the page)
import "@pantoken/components/components.css"; // .instui-button, .instui-alert, .instui-badge (+ elevation)
import "@pantoken/components/prose.css"; // styles content in a .pantoken-prose region
import "@pantoken/components/utilities.css"; // opt-in View, spacing, layout, colour/token utilities
import "@pantoken/components/fonts.css"; // opt-in: loads the Instructure brand woff2s
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

- **`componentsCss(options?): string`** — every class-based component (button, alert, badge), led by
  the elevation shadow scale. `options.prefix` sets the class prefix; any falsy value drops it
  (`.button`).
- **`buttonCss` / `alertCss` / `badgeCss` (options?)** — one component's stylesheet.
- **`baseCss(): string`** — the global reset plus the focus-outline ring.
- **`proseCss(options?): string`** — the prose/content stylesheet. `options.scope` sets the
  content-root selector (default `".pantoken-prose"`).
- **`elevationCss(options?)`, `focusOutlineCss(options?)`** — the shadow scale and focus ring, exposed
  for renderers that compose their own sheets (`@pantoken/pendo` does this).
- **`viewCss`, `spacingUtilitiesCss`, `layoutUtilitiesCss`, `responsiveUtilitiesCss` (options?)** — the
  utility builders. `responsiveUtilitiesCss` emits viewport `.<prefix>-hidden-{max,min}-{sm,md,lg,xl}`
  classes plus a `.<prefix>-container` marker with `@container` `.<prefix>-cq-hidden-{max,min}-*`
  variants (component-width responsiveness). The generic token→class emitters (`colorUtilitiesCss`,
  `tokenUtilitiesCss`) come from `@pantoken/utils`.
- **`ComponentOptions`, `ProseOptions`** — the option types.
- **`./base.css`**, **`./components.css`**, **`./prose.css`**, **`./utilities.css`**, **`./fonts.css`**,
  **`./icons.css`** — the prebuilt sheets at the default `instui` prefix / `.pantoken-prose` scope.

## Components

Every class, modifier, part, consumed token, and example is documented in the generated **CSS API
reference** — built from these stylesheets by `@cssdoc/core`, so it can't drift. Browse it on the docs
site under _API reference → CSS reference_, grouped into Components, Utilities, Rules, and Declarations
(run `docs:dev` to serve it locally).

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
