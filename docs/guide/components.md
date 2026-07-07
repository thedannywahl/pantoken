# Components

`@pantoken/components` ships class-based component styles built from the Instructure tokens. Import
the stylesheet and tag your markup — no framework required.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Prefer custom elements? `@pantoken/web-components` wraps these same styles as `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, and more — see the
> [package map](/guide/packages).

## Conventions

The CSS conventions in this package are based on a modified version of [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifiers are **key-value** — `-<prop>-<val>`, aligned to InstUI prop names — so they read for
themselves: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean props are the prop
name alone, where presence means `true` (`-has-shadow`, `-clickable`); a default-on boolean turned off
inverts (`-without-background`, `-without-border`). Sizes accept both short and long spellings
(`-size-sm` = `-size-small`). Where a name deviates from InstUI, the InstUI-semantic class still works
but is deprecated (e.g. `-variant-info` → use `-color-info`).

### Example

Instructure UI React component:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken components:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success -transition-fade -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div class="instui-alert -color-success -transition-fade -has-shadow -icon-megaphone">
  This is the alert content.
</div>
```

## Class prefix

Every class is namespaced `instui-` by default. Build a stylesheet with your own prefix — or none — by
passing `prefix` to any builder. Any falsy value (`null`, `undefined`, `""`, or omitting it) drops the
prefix entirely, so you can author `class="heading -level-h1"` instead of `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

The dash-prefixed modifiers (`.-color-secondary`, `.-level-h1`) are unchanged either way. The
stylesheets shipped by the package keep the `instui` prefix.

## Base

`base.css` is an opt-in reset that sets global document defaults from the tokens: `box-sizing`, a
`body` reset, the page surface, base text color and font, `color-scheme` (so `light-dark()` tokens
and native controls track the theme), and a base link. Load it once, before the component and prose
sheets, when pantoken owns the page.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Skip it when you're embedding components into a host that already themes its own `html` and `body` —
the reset paints the page surface, so you don't want it fighting the host. Everything it sets uses
low-specificity `:where()` selectors, so your own rules always win.

## Screen reader content

<p>There's a hidden message after this sentence.<span class="instui-screen-reader-content">Only screen readers announce this.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` hides an element visually while keeping it in the accessibility tree
— for labels and status text that assistive tech should read but the design shouldn't show.

## Utilities

`utilities.css` is an opt-in layer of cross-cutting classes: a `View` primitive, spacing on the token
scale, and semantic color overrides. Unlike the component `-modifier` classes, these apply to any
element, so they compose onto a component or a bare tag.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md instui-mb-sm" style="border-radius: 6px;">
  <span class="instui-text instui-fg-on-color">Accent-blue surface with on-color text.</span>
</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centered with mx-auto.</span>
</div>

```html
<div class="instui-view instui-bg-accent-blue instui-fg-on-color instui-p-md">…</div>
<div class="instui-view instui-bg-muted instui-p-sm instui-mx-auto">…</div>
```

**View** — `.instui-view` is InstUI's `View`. It's the base you layer spacing and color onto, and it
carries key-value modifiers for its own visual props so you don't have to reach for utilities:
`-background-*` (its surfaces), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, and `-cursor-*`. Free-value props
(width/height/inset) stay inline styles; `margin`/`padding` use the spacing utilities.

**Spacing** — per-side classes on the spacing scale. Read them as `{m|p}{side}-{step}`: `m` for
margin or `p` for padding (or the full words `margin`/`padding`), an optional logical side, then a
step. So `.instui-m-lg` and `.instui-margin-lg` are the same, as are `.instui-pt-md` and
`.instui-paddingt-md`.

- Sides: none (all), `t`/`b` (block start/end), `s`/`e` (inline start/end), `x`/`y` (inline/block
  axis). Logical sides stay correct in right-to-left layouts.
- Steps: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` for margin only.

Compose them for InstUI's `margin="small auto large"` shorthand:
`class="instui-mt-sm instui-mx-auto instui-mb-lg"`.

**Color** — semantic overrides that stay on-palette: `.instui-bg-<name>` (background),
`.instui-fg-<name>` (text color), and `.instui-border-<name>` (border color). Each `<name>` is a
semantic color token — the intents (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus the `accent-*` palette (`accent-blue`, `accent-green`, and so
on). A name is only there if the token exists in that family, so `fg-brand` isn't a class — text has
no brand token. There's no way to reach a primitive or an arbitrary hex, and every override follows
the theme.

**Token families** — every "one token, one property" family gets a class per token, named after the
token. Compose them freely:

- `.instui-font-family-heading`, `.instui-font-family-code`, … → `font-family`
- `.instui-font-weight-body-strong`, `.instui-font-weight-interactive`, … → `font-weight`
- `.instui-line-height-*` → `line-height`
- `.instui-border-radius-md`, `.instui-border-radius-full`, … → `border-radius`
- `.instui-border-width-sm`/`-md`/`-lg` → `border-width`
- `.instui-opacity-base`, `.instui-opacity-disabled` → `opacity`
- `.instui-elevation-resting`/`-above`/`-topmost` (and `-depth1`…`-card`) → `box-shadow`

Each sets only its one property, so `border-width`/`border-radius` need a `border-*` color and a border
style to actually draw a border. These use the full token name (`.instui-border-radius-md`), while the
color and spacing helpers above use short aliases (`.instui-bg-brand`, `.instui-mt-lg`) — the aliases
are ergonomic shortcuts; the token classes are literal and exhaustive.

**Layout** — `.instui-display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) and `.instui-text-align-<value>` (`start`, `center`, `end`, `justify`) cover InstUI's
cross-cutting `display` and `textAlign` props (View, Button, Metric, Tabs, …) as composable classes —
so those aren't per-component modifiers.

Everything here is pure CSS driven by the `--instui-*` tokens, so it tracks InstUI through the token
layer. See the [API reference](/api/) for `componentsCss` and the per-component builders.
