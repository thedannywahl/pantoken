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

`base.css` _applies_ the brand font (`font-family: var(--instui-font-family-base)`, with system
fallbacks); to _load_ it, import the opt-in `fonts.css` — `@font-face` rules for Atkinson Hyperlegible
Next, pointing at the woff2s shipped in the package. It's separate because the faces are ~350 kB and
self-hosting fonts is a deliberate choice.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

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

## Overlays: dialog and popover

The overlay components ride native platform primitives, so they behave accessibly with little or no
JavaScript.

**Modal** — put `.instui-modal` on a native `<dialog>`. It gets focus trapping, `Esc`-to-close, and a
`::backdrop` for free; the backdrop is dimmed with the same `--instui-component-mask-background-color`
token as `.instui-mask` (add `-blur` to frost it). Open and close it with invoker commands — no script:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — put `.instui-context-view` on a `[popover]` element and toggle it with
`popovertarget`. It rides the top layer and light-dismisses on outside-click or `Esc`, again no script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Mask** — `.instui-mask` stays for in-flow overlays (a spinner over a card); a modal's `::backdrop`
covers the modal case.

Both patterns are also wrapped as behavioral custom elements in `@pantoken/web-components`:
`<instui-modal open>` (a `<dialog>` driven by its `open` attribute) and `<instui-context-view>` (a
native popover).

Browser support: the popover API and `popovertarget` are Baseline 2024; invoker commands
(`command`/`commandfor`) are Baseline 2025, so on older browsers wire the buttons to `dialog.showModal()`
as a one-line fallback. Positioning a popover next to its trigger uses CSS anchor positioning where
supported (Chromium); elsewhere it centers in the top layer.

## Forms

**FormField** — `.instui-form-field` is a CSS-Grid wrapper laying out a label, the control, and any
messages. Put it on a `<label>` so the label associates with its control natively. It has three grid
areas — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) stacks the areas; `-layout-inline` puts the label beside the control (tune
with `-label-align-{start,end}` and `-v-align-{top,middle,bottom}`). `-readonly` recolors the label.

The **required asterisk** appears when the field is required by _either_ the `-required` class _or_ a
native `required` control inside it — so you can just set `required` on the input and the mark shows.
It's decorative (a `::after` on the label, out of the accessibility tree); pair it with a note like
"fields marked \* are required" unless the form is self-evident.

**FormFieldGroup** — `.instui-form-field-group` groups related fields in a `<fieldset>` with a
`<legend>` description. It's pure layout (no dedicated tokens): default stacks the fields;
`-layout-columns` / `-layout-inline` flow them into responsive columns, with `-row-spacing-*` /
`-col-spacing-*` and `-v-align-*` to tune the grid.

**RadioInputGroup** — `.instui-radio-input-group` is the same `<fieldset>`/`<legend>` grouping,
specialized for radios. Because the child radios share a `name`, selection is natively single-choice —
so a set of toggle buttons behaves as one control, not loose buttons. `-variant-simple` (default) lays
out standard radios (`-layout-columns`/`-inline` flow them into a row); `-variant-toggle` connects the
child `.instui-radio.-variant-toggle` buttons into a single segmented control (collapsed borders,
rounded outer ends):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Messages** — `.instui-form-field-messages` is the container; each `.instui-form-field-message` takes a
`-type-*`: `-type-hint` (gray, default), `-type-error` (red text + a circle-alert glyph), `-type-success`
(green text + a circle-check glyph), and `-type-screenreader-only` (visually clipped, still announced).
The glyphs paint in `currentColor`, so they always match the message color. `-type-new-error` is a
deprecated alias of `-type-error`. Wire the container to the control with `aria-describedby`, and set
`aria-invalid` on the control when there's an error.

Inside a FormField, an `-type-error` message follows client-side validation: it stays hidden until the
field's control is `:user-invalid` (native, after the user interacts) — or you force it with `-invalid`
on the `.instui-form-field` (for a server-side error). A standalone `.instui-form-field-messages` (not in
a field) is unaffected. The control's focus ring follows suit: danger when `:user-invalid`/`-invalid`,
success on `-success`.

**Text controls** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
resizable), and `.instui-simple-select` (native `<select>` with a caret) share one look and the same
states: `-invalid` (error border), `-success` (success border), `-readonly`, native `:disabled`, and
`-size-{sm,md,lg}`. For a leading/trailing icon (InstUI's `renderBeforeInput`/`renderAfterInput`), wrap
the input in `.instui-input-group` and add a `.before`/`.after` slot (an `-icon-*` glyph); `-should-not-wrap`
keeps it on one line. `.instui-number-input` is that facade plus a `.arrows` +/- spinner column (native
`type="number"`; wire the buttons to `stepUp()`/`stepDown()`). `.instui-range-input` is a styled
`input[type="range"]` whose value renders in a `.instui-range-input-value` inverse bubble. For a rich
combobox with a listbox popover, reach for `@instructure/ui` — this library covers the native controls.

**Styled select dropdown (experimental)** — an opt-in `select.css` upgrades the _same_
`.instui-simple-select` element: it styles the open dropdown (the panel and each option, with hover and
selected states) using the CSS Customizable Select model.

> [!WARNING]
> `select.css` relies on `appearance: base-select` / `::picker(select)`, which is **experimental**
> (Chrome 135+, not yet Baseline). It's shipped as a separate opt-in sheet and every rule is gated
> behind `@supports (appearance: base-select)`, so it does nothing in unsupported browsers — the
> `.instui-simple-select` control just stays the plain native select. Load it only if you want the
> enhanced dropdown and accept the limited support.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
