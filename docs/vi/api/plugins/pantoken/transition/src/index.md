[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-transition` — the `--instui-transition-duration`/`--instui-transition-timing`
tokens behind InstUI's `Transition` utility.

The CSS itself (the `.instui-transition` base rule plus the `fade`/`scale`/`slide-*` state classes)
lives in `@pantoken/components`' own `transition` utility now; this plugin only bakes the two
duration/timing tokens into a token IR for consumers using the lower-level `@pantoken/css` +
`@pantoken/tokens` pipeline directly.

## Ví dụ

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## Giao diện

- [TransitionOptions](interfaces/TransitionOptions.md)

## Hàm

- [transition](functions/transition.md)

## Tham chiếu

### default

Renames and re-exports [transition](functions/transition.md)
