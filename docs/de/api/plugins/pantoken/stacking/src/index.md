[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-stacking` — named z-index depths.

InstUI's `View` exposes a stacking scale (`deepest`, `below`, `above`, `topmost`) so layers stack
predictably instead of by hand-tuned magic numbers. This plugin emits `--instui-stacking-&lt;level&gt;`
tokens, resolved to concrete z-index values from the shipped `--instui-component-view-stacking-*`
tokens, for consumers using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.
The matching `.instui-stack-&lt;level&gt;` utility classes now live in `@pantoken/components`' own
`stacking` utility.

## Beispiel

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## Schnittstellen

- [StackingOptions](interfaces/StackingOptions.md)

## Variablen

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## Funktionen

- [stacking](functions/stacking.md)

## Referenzen

### default

Renames and re-exports [stacking](functions/stacking.md)
