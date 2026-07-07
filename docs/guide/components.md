# Components

`@pantoken/components` ships class-based component styles built from the Instructure tokens. Import
the stylesheet and tag your markup — no framework required.

```ts
import "@pantoken/components/components.css";
```

Prefer custom elements? `@pantoken/web-components` wraps these same styles as `<instui-button>`,
`<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, and more — see the
[package map](/guide/packages).

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

Modifiers are **key-value** — `-<prop>-<val>`, aligned to InstUI prop names — so they read for
themselves: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean props are the prop
name alone, where presence means `true` (`-has-shadow`, `-clickable`); a default-on boolean turned off
inverts (`-without-background`, `-without-border`). Sizes accept both short and long spellings
(`-size-sm` = `-size-small`). Where a name deviates from InstUI, the InstUI-semantic class still works
but is deprecated (e.g. `-variant-info` → use `-color-info`).

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

## Button

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button">Primary</button>
  <button class="instui-button -color-secondary">Secondary</button>
  <button class="instui-button -color-success">Success</button>
  <button class="instui-button -color-danger">Danger</button>
  <button class="instui-button" disabled>Disabled</button>
</div>

```html
<button class="instui-button">Primary</button>
<button class="instui-button -color-secondary">Secondary</button>
<button class="instui-button -color-success">Success</button>
<button class="instui-button -color-danger">Danger</button>
```

Color modifiers are `-color-secondary`, `-color-tertiary`, `-color-success`, `-color-danger`,
`-color-ai`, `-color-ai-secondary`, and `-color-primary-inverse`. The `-color-ai` and
`-color-ai-secondary` variants carry the violet-to-sea gradient border and add the ai glyph
automatically, so you don't pass an icon. Use `-color-primary-inverse` on a dark or brand surface. Add
`-without-background` for an outline button with no fill (the `withBackground={false}` form); compose
it with `-color-secondary` for the secondary ghost. Add `-without-border` for the `withBorder={false}`
form, or `-display-block` for a full-width button. Sizes are `-size-sm` and `-size-lg` (medium is the
default). Shapes are `-shape-square` (icon-only) and `-shape-circle`, and `-condensed` and `-toggle`
cover low-emphasis text buttons and pressed toggle states. Add an icon with the `-icon-<name>` modifier
directly on the button — `<button class="instui-button -icon-plus">` — which renders an InstUI glyph
in the button's color (the glyph classes ship in `@pantoken/components/icons.css`).

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button -size-sm">Small</button>
  <button class="instui-button">Medium</button>
  <button class="instui-button -size-lg">Large</button>
</div>

```html
<button class="instui-button -size-sm">Small</button>
<button class="instui-button -size-lg">Large</button>
```

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button -shape-square" aria-label="Add">+</button>
  <button class="instui-button -condensed">Condensed</button>
  <button class="instui-button -toggle" aria-pressed="true">Pressed</button>
  <button class="instui-button -toggle" aria-pressed="false">Unpressed</button>
</div>

```html
<button class="instui-button -shape-square" aria-label="Add">+</button>
<button class="instui-button -condensed">Condensed</button>
<button class="instui-button -toggle" aria-pressed="true">Pressed</button>
```

## Heading

<div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
  <span class="instui-heading -level-h2">Section heading</span>
  <span class="instui-heading -variant-title-card-regular">Card title</span>
  <span class="instui-heading -level-h4 -color-secondary">Secondary</span>
  <span class="instui-heading -level-h4 -color-ai">AI gradient</span>
</div>

```html
<h2 class="instui-heading -level-h2">Section heading</h2>
<span class="instui-heading -variant-label">Field label</span>
```

`.instui-heading` is InstUI's Heading. Set the scale with a level (`-level-h1` through `-level-h6`) or
a named type variant (`-variant-title-page`, `-variant-title-section`, `-variant-title-card-section`,
`-variant-title-card-regular`, `-variant-title-card-mini`, `-variant-label`). Recolor with
`-color-secondary`, `-color-primary-inverse`, or `-color-ai` (a gradient wordmark), and add
`-border-top` or `-border-bottom` for a ruled heading.

## Text

<div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
  <span class="instui-text -size-lg">Large body text</span>
  <span class="instui-text">Default body text</span>
  <span class="instui-text -size-sm -color-secondary">Small, secondary</span>
  <span class="instui-text -weight-bold -color-danger">Bold danger</span>
</div>

```html
<span class="instui-text">Body copy</span>
<span class="instui-text -size-sm -color-secondary">Caption</span>
```

`.instui-text` is InstUI's Text. Modifiers are dash-prefixed, key-value classes you add alongside the
base — `<span class="instui-text -size-sm -color-secondary">` — and stack freely. Sizes are `-size-xs`,
`-size-sm`, `-size-lg`, and `-size-xl` (medium is the default; the long spellings `-size-x-small` …
`-size-x-large` are aliases). Add `-weight-bold` or `-style-italic`; recolor with `-color-secondary`,
`-color-brand`, `-color-success`, `-color-danger`, `-color-warning`, `-color-primary-inverse`, or
`-color-ai`. The content variants `-variant-description-page`, `-variant-description-section`,
`-variant-content-small`, and `-variant-legend` match InstUI's named type styles. (Every modifier is
scoped to `.instui-text`, so it never affects anything else on the page.)

## Toggle group

<div class="instui-toggle-group" role="group" aria-label="Text alignment">
  <button class="instui-button -toggle" aria-pressed="true">Left</button>
  <button class="instui-button -toggle" aria-pressed="false">Center</button>
  <button class="instui-button -toggle" aria-pressed="false">Right</button>
</div>

```html
<div class="instui-toggle-group" role="group">
  <button class="instui-button -toggle" aria-pressed="true">Left</button>
  <button class="instui-button -toggle" aria-pressed="false">Center</button>
</div>
```

## Alert

<div style="display:flex; flex-direction:column; gap:12px;">
  <div class="instui-alert -color-info">
    Heads up — this is an informational alert.
    <button class="instui-close-button -size-sm" aria-label="Close"></button>
  </div>
  <div class="instui-alert -color-success">
    Saved. Everything went through.
    <button class="instui-close-button -size-sm" aria-label="Close"></button>
  </div>
  <div class="instui-alert -color-warning">Careful — double-check this before continuing.</div>
  <div class="instui-alert -color-danger">Something went wrong.</div>
</div>

```html
<div class="instui-alert -color-success">
  Saved.
  <button class="instui-close-button -size-sm" aria-label="Close"></button>
</div>
```

No wrappers: the colored bar and its variant glyph are drawn by the alert's own pseudo-elements, so
you just write the message (plain text or prose) inside. Variants are `-color-info`, `-color-success`,
`-color-warning`, and `-color-danger`. The close button is optional — when you add one, the alert reserves room
for it automatically (via `:has()`). Add `-has-shadow` to elevate it (through
`@pantoken/plugin-elevation`), or `-screen-reader-only` to announce it without showing it. Swap the
glyph with a `--pantoken-alert-glyph` custom property, and for an enter/exit animation layer on the
`.instui-transition` classes from `@pantoken/plugin-transition`.

## Close button

<div style="display:flex; gap:12px; align-items:center;">
  <button class="instui-close-button" aria-label="Close"></button>
  <button class="instui-close-button -size-lg" aria-label="Close"></button>
</div>

```html
<button class="instui-close-button" aria-label="Close"></button>
```

`.instui-close-button` is a transparent icon button with a built-in "×". Sizes are `-size-sm` and `-size-lg`
(medium is the default); use `-color-inverse` on a dark surface. Always give it an `aria-label`.

## Badge

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-badge">4</span>
  <span class="instui-badge -color-success">9</span>
  <span class="instui-badge -color-danger">3</span>
  <span class="instui-badge -type-notification -color-danger"></span>
</div>

Color variants are `-color-success`, `-color-danger`, and `-color-inverse`. `-color-inverse` swaps the fill and text into
a light chip with dark text — it's meant for a colored or dark surface, so it looks like nothing on a
plain page. `-type-notification` is a small dot with no count.

```html
<span class="instui-badge -color-danger">3</span>
<span class="instui-badge -type-notification -color-danger"></span>
```

By default the badge is a standalone inline chip. To place one over a target, wrap the target and the
badge in `.instui-badge__wrapper` and add a placement — `-placement-top-end` (most common), `-placement-top-start`,
`-placement-bottom-end`, `-placement-bottom-start`, `-placement-start-center`, or `-placement-end-center`. `-pulse` adds an expanding
ring in the badge's color, and `-standalone` resets a placed badge back into the flow. A count that
overflows a cap is just its text — format it as `99+` in your markup.

<div style="display:flex; gap:28px; align-items:center;">
  <span class="instui-badge__wrapper">
    <span class="instui-avatar -color-blue">AB</span>
    <span class="instui-badge -color-danger -placement-top-end">5</span>
  </span>
  <span class="instui-badge__wrapper">
    <button class="instui-button -color-secondary">Inbox</button>
    <span class="instui-badge -type-notification -color-danger -placement-top-end -pulse"></span>
  </span>
</div>

```html
<span class="instui-badge__wrapper">
  <span class="instui-avatar -color-blue">AB</span>
  <span class="instui-badge -color-danger -placement-top-end">5</span>
</span>
```

## Pill

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <span class="instui-pill">Draft</span>
  <span class="instui-pill -color-info">In review</span>
  <span class="instui-pill -color-success">Published</span>
  <span class="instui-pill -color-warning">Stale</span>
  <span class="instui-pill -color-danger">Blocked</span>
</div>

Status variants are `-color-info`, `-color-success`, `-color-warning`, and `-color-danger`. Add a leading icon (InstUI's
`renderIcon`) by adding a glyph class right on the pill — the icon renders before the label and
inherits the pill's color.

```html
<span class="instui-pill -color-success -icon-check">Published</span>
```

## Tag

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-tag -size-sm">small</span>
  <span class="instui-tag">design</span>
  <span class="instui-tag -size-lg">large</span>
  <span class="instui-tag -inline">dismissible</span>
</div>

Sizes are `-size-sm` and `-size-lg`. The `-inline` variant is dismissible — it adds a trailing close glyph, so
use it on a `<button>` (or wire a click handler) to remove the tag. Add `-readonly` for a static tag
(no hover affordance, and the dismiss glyph is dropped).

```html
<span class="instui-tag">design</span> <button class="instui-tag -inline">dismissible</button>
```

## Avatar

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-avatar">DW</span>
  <span class="instui-avatar -color-blue">AB</span>
  <span class="instui-avatar -color-green">CD</span>
  <span class="instui-avatar -color-ai -size-lg">EF</span>
  <span class="instui-avatar -shape-rectangle -show-border">GH</span>
</div>

Grey by default. Colors are the InstUI avatar palette — `-color-ash`/`-blue`/`-green`/`-orange`/`-red`/`-grey`,
plus `-color-ai` (the gradient). InstUI documents these as `accent1`–`accent6`, so
`-color-accent1`…`-color-accent6` also work (deprecated aliases: accent1→blue, 2→green, 3→red,
4→orange, 5→ash, 6→grey). Sizes span `-size-2xs` through `-size-2xl`. Add `-shape-rectangle`,
`-show-border`, `-has-inverse-color` (light text for a dark backdrop), or a `-icon-<name>` glyph. For a
photo, nest an `<img>` — it fills the chip and covers the initials.

```html
<span class="instui-avatar -color-blue">AB</span>
<span class="instui-avatar -show-border"><img src="/avatar.jpg" alt="" /></span>
```

## Tabs

<div class="instui-tabs">
  <div class="instui-tabs__list" role="tablist">
    <div class="instui-tabs__tab -selected" role="tab">Overview</div>
    <div class="instui-tabs__tab" role="tab">Details</div>
    <div class="instui-tabs__tab" role="tab">History</div>
  </div>
  <div class="instui-tabs__panel" role="tabpanel">The selected tab's content shows here.</div>
</div>

Add `-variant-secondary` to each tab for the filled, pill-style secondary tabs.

## Metric

<div style="display:flex; gap:32px;">
  <div class="instui-metric">
    <span class="instui-metric__value">1,284</span>
    <span class="instui-metric__label">Active users</span>
  </div>
  <div class="instui-metric">
    <span class="instui-metric__value">98%</span>
    <span class="instui-metric__label">Uptime</span>
  </div>
</div>

## Byline

<div class="instui-byline">
  <span class="instui-avatar -color-blue">AB</span>
  <div>
    <div class="instui-byline__title">Ada Byron</div>
    <div class="instui-byline__description">Design systems, tokens, and the occasional pun.</div>
  </div>
</div>

## Table

<table class="instui-table">
  <thead><tr><th>Package</th><th>Bucket</th></tr></thead>
  <tbody>
    <tr><th scope="row">@pantoken/css</th><td>formats</td></tr>
    <tr><th scope="row">@pantoken/react</th><td>renderers</td></tr>
  </tbody>
</table>

`.instui-table` is for tables you build yourself; markdown tables get the same look automatically via
the prose layer. A `<th scope="row">` picks up the row-header style, and rows highlight on hover.

## Link and list

<a class="instui-link" href="#">A styled link</a>

Links take `-size-sm`/`-size-lg` sizes, `-inline` (for links inside running text), `-unstyled`, and
`-color-inverse` for dark surfaces.

<ul class="instui-list -delimiter-solid">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

Lists take `-size-sm`/`-size-lg` sizes and `-delimiter-solid` or `-delimiter-dashed` delimiters that draw a rule between items.

```html
<a class="instui-link -inline" href="#">read the docs</a>
<ul class="instui-list -delimiter-dashed">
  …
</ul>
```

## Form controls

<label class="instui-checkbox"><input type="checkbox" checked /> Email me updates</label>

<div style="height:8px"></div>
<label class="instui-radio"><input type="radio" name="demo" checked /> Option A</label>
<label class="instui-radio"><input type="radio" name="demo" /> Option B</label>

<div style="height:8px"></div>
<label class="instui-checkbox -variant-toggle"><input type="checkbox" checked /> Notifications on</label>
<label class="instui-checkbox -variant-toggle"><input type="checkbox" /> Notifications off</label>

Checkbox and radio are custom-styled from the InstUI tokens, so they carry the full range of states.
Both take `-size-sm`/`-size-lg` sizes and a `-readonly` state. Checkbox adds an `-invalid` state and a
`-toggle` switch variant whose handle shows a check when on and an X when off. The mixed state is
driven by the native `:indeterminate` property — set `input.indeterminate = true` in script and the
tick becomes a dash. Place the label with `-label-placement-end` (default), `-label-placement-start`, or `-label-placement-top`.

```html
<label class="instui-checkbox -variant-toggle">
  <input type="checkbox" checked /> Notifications on
</label>
```

## Spinner and progress

<div style="display:flex; align-items:center; gap:24px;">
  <span class="instui-spinner -size-sm" role="status" aria-label="Loading"></span>
  <span class="instui-spinner" role="status" aria-label="Loading"></span>
  <div style="flex:1;">
    <div class="instui-progress"><div class="instui-progress__bar -success" style="width:60%"></div></div>
  </div>
</div>

Spinner sizes are `-size-xs`/`-size-sm`/`-size-lg`, plus `-color-inverse` for dark surfaces. The progress track takes
`-size-xs`/`-size-sm`/`-size-lg` heights; the meter carries the full status palette
(`-color-info`/`-color-success`/`-color-warning`/`-color-alert`/`-color-danger`), and `-color-inverse` recolors the track and meter.

## Menu

<div class="instui-menu" style="max-width:220px;">
  <div class="instui-menu__group">Actions</div>
  <div class="instui-menu__item">Edit</div>
  <div class="instui-menu__item -active">Duplicate</div>
  <div class="instui-menu__separator"></div>
  <div class="instui-menu__item">Delete</div>
</div>

Wrap a labelled section in `__group`, mark the current choice with `-active` (or `aria-checked`), and
add a secondary line with `__item-info`.

## Modal

<div class="instui-modal" style="max-width:420px;">
  <div class="instui-modal__header"><strong>Confirm</strong></div>
  <div class="instui-modal__body">Are you sure you want to continue?</div>
  <div class="instui-modal__footer" style="display:flex; gap:12px; justify-content:flex-end;">
    <button class="instui-button -color-secondary">Cancel</button>
    <button class="instui-button">Confirm</button>
  </div>
</div>

Sizes are `-size-sm`/`-size-lg`/`-size-auto`, with a `-density-compact` density, a `-size-fullscreen` layout, and an
`-color-inverse` scheme that recolors the header, body, and footer.

## Breadcrumb

<nav class="instui-breadcrumb" aria-label="Breadcrumb">
  <span class="instui-breadcrumb__item"><a href="#">Home</a></span>
  <span class="instui-breadcrumb__item"><a href="#">Guides</a></span>
  <span class="instui-breadcrumb__item">Components</span>
</nav>

Sizes are `-size-sm` and `-size-lg`.

## Billboard

<div class="instui-billboard">
  <div class="instui-billboard__message">Nothing here yet. Create your first item to get started.</div>
</div>

Sizes are `-size-sm`/`-size-lg`. Add `-clickable` when the whole billboard acts as a button — it adds hover
and active states.

## Rating

<span class="instui-rating -size-lg">
  <span class="instui-rating__star -filled">★</span>
  <span class="instui-rating__star -filled">★</span>
  <span class="instui-rating__star -filled">★</span>
  <span class="instui-rating__star">★</span>
  <span class="instui-rating__star">★</span>
</span>

Sizes are `-size-sm` and `-size-lg`.

## Context view

<div class="instui-context-view" style="max-width:320px;">
  A context view frames a callout with a caret. Point it at the thing it explains.
</div>

## Progress circle

<div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
  <span class="instui-progress-circle -size-sm" style="--value:25;" role="img" aria-label="25 percent"></span>
  <span class="instui-progress-circle -color-success" style="--value:60;" role="img" aria-label="60 percent"></span>
  <span class="instui-progress-circle -size-lg -color-danger" style="--value:90;" role="img" aria-label="90 percent"></span>
</div>

Sizes are `-size-xs`/`-size-sm`/`-size-lg`, the ring takes the same status palette as the progress bar, and
`-color-inverse` swaps in the on-dark colors.

```html
<span class="instui-progress-circle" style="--value:60;" role="img" aria-label="60 percent"></span>
```

## Pagination

<nav class="instui-pagination" aria-label="Pagination">
  <a class="instui-pagination__page" href="#">1</a>
  <a class="instui-pagination__page" href="#" aria-current="page">2</a>
  <a class="instui-pagination__page" href="#">3</a>
  <a class="instui-pagination__page" href="#">4</a>
</nav>

## Truncate

<div class="instui-truncate" style="max-width:280px;">
  This single line keeps going past the edge of its box, so it ends in an ellipsis.
</div>

<div style="height:8px"></div>
<div class="instui-truncate" style="--lines:2; max-width:280px;">
  Set the <code>--lines</code> custom property to clamp to a fixed number of lines instead. This
  paragraph runs long on purpose so the clamp has something to cut off after the second line.
</div>

```html
<div class="instui-truncate">One line, then an ellipsis…</div>
<div class="instui-truncate" style="--lines:2;">Clamp me to two lines…</div>
```

## Toggle details

<details class="instui-toggle-details">
  <summary>What ships in this package?</summary>
  Class-based component styles, built from the Instructure tokens, plus a prose layer.
</details>

Sizes are `-size-sm` and `-size-lg`.

## File drop

<div class="instui-file-drop">
  Drag a file here, or click to browse.
</div>

<div style="height:8px"></div>
<div class="instui-file-drop -accepted">File accepted.</div>

## Range

<label for="range-demo">Volume</label>
<input id="range-demo" class="instui-range" type="range" min="0" max="100" value="40" />
<span class="instui-range__value">40</span>

The handle brightens on hover and shows a focus ring on keyboard focus. Pair the input with a
`__value` bubble (`-size-sm`/`-size-lg` sizes) to show the current value.

## Mask

<div style="position:relative; height:120px; border-radius:6px; overflow:hidden;">
  <div style="padding:12px;">Content behind the mask.</div>
  <div class="instui-mask"><span class="instui-spinner" role="status" aria-label="Loading"></span></div>
</div>

```html
<div style="position:relative;">
  …content…
  <div class="instui-mask"><span class="instui-spinner"></span></div>
</div>
```

`.instui-mask` covers its positioned parent with the overlay token; add `-fullscreen` to cover the
viewport, or `-blur` to blur what's behind it.

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
