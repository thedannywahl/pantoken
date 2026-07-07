# @pantoken/plugin-focus-outline

A pantoken plugin that injects the InstUI focus-outline ring, which isn't captured in the source
design tokens. The ring animates the way InstUI's does — a transparent outline at rest,
transitioning to the visible colour and a grown offset on `:focus-visible` (outline-color 0.2s,
outline-offset 0.25s). It defines both a `tokens` hook and a `css` hook, so you choose the layer.

## Install

```sh
npm i @pantoken/plugin-focus-outline
```

Also available as `pantoken/focusOutline`.

## Usage

Bake focus-outline tokens into every output (CSS, Swift, …):

```ts
import { buildTokens } from "@pantoken/core";
import { focusOutline } from "@pantoken/plugin-focus-outline";

buildTokens({ theme: "rebrand", plugins: [focusOutline()] });
// adds --instui-focus-outline-color / -color-start / -width / -offset / -style /
//   -transition-color / -transition-offset to the IR
```

Inject only the CSS rules:

```ts
import { toCss } from "@pantoken/css";
import { focusOutline } from "@pantoken/plugin-focus-outline";

toCss(tokens, { plugins: [focusOutline()] });
// appends a resting rule (transparent ring + transition) and an active
// :where(…):where(:focus-visible) rule that reveals the colour — the IR is untouched
```

Defaults reference InstUI's shared focus-outline tokens
(`var(--instui-component-shared-tokens-focus-outline-*)`), fade in from `transparent`, and apply to
common interactive elements. The active state is wrapped in `:where(…)` so it's zero-specificity —
a resettable default any component style can override without `!important`. Those references resolve
to concrete leaf values against the caller's IR layered over the `theme`'s shipped token set (default
`"rebrand"`), so the output never carries a dangling `var()` — handy for native targets — and the
values track the tokens if they change upstream.

## API

- **`focusOutline(options?): PantokenPlugin`** — create the ring plugin, with `tokens` and `css`
  hooks.
- **`FocusOutlineOptions`** — `color`, `colorStart`, `width`, `offset`, `style`, `transitionColor`,
  `transitionOffset`, `selector`, `theme`, and `position` (`"append"` default or `"prepend"`).
- **default export** — `focusOutline`.

## Related

- Built with `@pantoken/plugin-kit` (`definePlugin`).
- Consumed by `@pantoken/pendo` for the guide focus ring.

## License

MIT
