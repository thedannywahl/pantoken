# @pantoken/plugin-transition

The `--instui-transition-duration`/`--instui-transition-timing` tokens behind InstUI's `Transition`
utility, as a pantoken plugin. The CSS itself (the `.instui-transition` base rule plus the `fade`,
`scale`, and `slide-{up,down,left,right}` state classes) lives in `@pantoken/components`' own
`transition` utility — this plugin only bakes the two tokens for consumers using the lower-level
`@pantoken/css`/`@pantoken/tokens` pipeline directly.

## Install

```sh
npm i @pantoken/plugin-transition
```

Also available as `pantoken/transition`.

## Usage

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

Duration defaults to `300ms` and timing to `ease-in-out` (both overridable via options).
