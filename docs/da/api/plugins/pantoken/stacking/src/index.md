[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-stacking` — navngivne z-index dybder.

InstUIs `View` eksponerer en stacking skala (`deepest`, `below`, `above`, `topmost`) så lag stakles
forudsigeligt i stedet for af hånd-tunet magiske tal. Denne plugin udsender `--instui-stacking-&lt;level&gt;`
tokens, løst til konkrete z-index værdier fra de leverede `--instui-component-view-stacking-*`
tokens, for forbrugere der bruger `@pantoken/css`/`@pantoken/tokens` pipeline på lavere niveau direkte.
De matchende `.instui-stack-&lt;level&gt;` utility klasser bor nu i `@pantoken/components`s egen
`stacking` utility.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## Interfaces

- [StackingOptions](interfaces/StackingOptions.md)

## Variables

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## Functions

- [stacking](functions/stacking.md)

## References

### default

Omdøber og re-eksporterer [stacking](functions/stacking.md)
