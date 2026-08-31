[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-transition` — els tokens `--instui-transition-duration`/`--instui-transition-timing`
darrere la utilitat `Transition` d'InstUI.

El CSS en sí (la regla base `.instui-transition` més les classes d'estat `fade`/`scale`/`slide-*`)
viu a la utilitat `transition` pròpia de `@pantoken/components` ara; aquest connector només insereix els dos
tokens de durada/temporització en un IR de token per a consumidors que utilitzen el connector `@pantoken/css` +
`@pantoken/tokens` de nivell inferior directament.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## Interfaces

- [TransitionOptions](interfaces/TransitionOptions.md)

## Functions

- [transition](functions/transition.md)

## References

### default

Reanomena i reexporta [transition](functions/transition.md)
