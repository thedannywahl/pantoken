[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

`@pantoken/plugin-stacking` — named z-index depths.

InstUI's `View` exposes a stacking scale (`deepest`, `below`, `above`, `topmost`) so layers stack
predictably instead of by hand-tuned magic numbers. This plugin emits `--instui-stacking-&lt;level&gt;`
tokens, resolved to concrete z-index values from the shipped `--instui-component-view-stacking-*`
tokens, for consumers using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.
The matching `.instui-stack-&lt;level&gt;` utility classes now live in `@pantoken/components`' own
`stacking` utility.

## Exemple

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

## Fonctions

- [stacking](functions/stacking.md)

## Références

### default

Renames and re-exports [stacking](functions/stacking.md)
