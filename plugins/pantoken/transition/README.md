# @pantoken/plugin-transition

The CSS behind InstUI's `Transition` utility, as a pantoken plugin. It emits a base
`.instui-transition` class (the animated `transition` property) plus the `fade`, `scale`, and
`slide-{up,down,left,right}` type/state classes, and defines the `--instui-transition-duration` and
`--instui-transition-timing` tokens they read.

InstUI's `Transition` toggles per-state class names as an element mounts and unmounts. This plugin
ships those rules; you (or a framework transition group) toggle the state class.

## Install

```sh
npm i @pantoken/plugin-transition
```

Also available as `pantoken/transition`.

## Usage

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { transition } from "@pantoken/plugin-transition";

const css = toCss(byTheme("rebrand"), { plugins: [transition()] });
```

Then apply a type class and swap the state class over time:

```html
<div class="instui-transition -fade-exited">…</div>
<!-- → -fade-entering → …--fade-entered -->
```

States are `-entering`, `-entered`, `-exiting`, `-exited`. Types are `fade`, `scale`, and
`slide-up` / `slide-down` / `slide-left` / `slide-right`. Duration defaults to `300ms` and timing to
`ease-in-out` (both overridable via options).
