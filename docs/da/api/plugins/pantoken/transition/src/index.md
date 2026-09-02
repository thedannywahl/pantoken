[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-transition` — de `--instui-transition-duration`/`--instui-transition-timing`
tokens bag InstUI's `Transition` utility.

CSS'et selv (basereglerne `.instui-transition` plus tilstands-klasserne `fade`/`scale`/`slide-*`)
bor nu i `@pantoken/components`'s egen `transition` utility; dette plugin bager kun de to
varighed/timing-tokens ind i en token IR for forbrugere, der bruger den lavere-niveau `@pantoken/css` +
`@pantoken/tokens` pipeline direkte.

## Eksempel

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## Interfaces

- [TransitionOptions](interfaces/TransitionOptions.md)

## Funktioner

- [transition](functions/transition.md)

## Referencer

### default

Omdøber og re-eksporterer [transition](functions/transition.md)
