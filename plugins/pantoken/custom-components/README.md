# @pantoken/plugin-custom-components

Custom, cssdoc-documented component rules for downstream consumers.

This package currently ships:

- An extra-small `--instui-breakpoints-xs: 20em` declaration in the aggregate stylesheet
- `cardRules(prefix?)` and `card.css` as deprecated compatibility aliases; use `cardCss` from `@pantoken/components`
- `banner` rules (the plugin output)
- `agent-shell` rules (the plugin output)
- `button-set` rules (the plugin output)

## Install

```sh
npm i @pantoken/plugin-custom-components
```

Also available as `pantoken/custom-components`.

## Usage

Use the plugin to append the custom component sheet to token CSS output:

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
```

Import the built stylesheet directly when you only need the static CSS:

```ts
import "@pantoken/plugin-custom-components/custom-components.css";
```

Or import one component:

```ts
import "@pantoken/plugin-custom-components/card.css";
```

### Split-action button set

Use `-width-half` on an individual icon-only dropdown trigger inside a button
set. The main action can have a text label or be a square icon-only button:

```html
<div class="instui-button-set -color-primary" role="group" aria-label="Save actions">
  <button class="instui-button" type="button">Save changes</button>
  <button
    class="instui-button -width-half -icon-chevron-down"
    type="button"
    aria-label="More save actions"
  ></button>
</div>
```

Load the token, base, button, shared icon painter (`@pantoken/components/icon.css`),
and icon glyph styles alongside `button-set.css`. The main
action stays content-sized; the trigger keeps the full height but has half the
standard square width: 16x32px (small), 20x40px (medium), or 24x48px (large).
For example, a medium square icon action is 40x40px beside a 20x40px trigger.
Set `-size-sm`, `-size-md`, or `-size-lg` on the group to size both buttons. A
button's own size modifier overrides the group default.

Apply `-width-half` to the child button, not the set. It also narrows a child
that has `-shape-square`; other buttons remain unchanged. These are narrow
pointer targets. At small and medium sizes, a flush half-width trigger doesn't
meet WCAG 2.2's 24px minimum target width without an applicable exception.
Prefer large sizing (24x48px triggers) or full square buttons when that minimum
is required.

This example shows layout only. To open a dropdown, connect the icon-only button
to your menu implementation and provide its popup semantics, expanded state,
keyboard interaction, and focus management.

## API

- `customComponents(options?)` — returns a CSS plugin with `position: "append" | "prepend"`.
- `breakpointDeclarations()` — returns the extra-small viewport token declaration.
- `cardRules(prefix?)` — deprecated alias for the `@pantoken/components` Card stylesheet.
- `bannerRules(prefix?)` — returns the banner rules as CSS text.
- `agentShellRules(prefix?)` — returns the agent-shell rules as CSS text.
- `buttonSetRules(prefix?)` — returns the button-set rules as CSS text.
- `./custom-components.css` — aggregate stylesheet export.
- `./card.css`, `./banner.css`, `./agent-shell.css`, `./button-set.css` — per-component stylesheet exports.

## cssdoc

`./model.json` publishes the documented component records as a `CssDocEntry[]` model. Add it
to your `cssdoc.json` `providers` so a consumer project resolves these classes/modifiers:

```jsonc
{
  "providers": [{ "path": "./node_modules/@pantoken/plugin-custom-components/model.json" }],
  // Built with a different prefix than the default "instui-" (or none)? Rewrite it — `to` is used
  // verbatim, no separator assumed:
  //   "prefix": { "from": "instui-", "to": "acme-" }
}
```
