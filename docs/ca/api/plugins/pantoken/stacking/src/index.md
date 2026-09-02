[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-stacking` — profunditats z-index nomenades.

El `View` d'InstUI exposa una escala d'apilament (`deepest`, `below`, `above`, `topmost`) de manera que les capes s'apilen de manera predictible en lloc de nombres màgics sintonitzats a mà. Aquest connector emet tokens `--instui-stacking-&lt;level&gt;`, resolts a valors z-index concrets dels tokens `--instui-component-view-stacking-*` expedits, per a consumidors que utilitzen la canonada més baixa `@pantoken/css`/`@pantoken/tokens` directament. Les classes d'utilitats `.instui-stack-&lt;level&gt;` coincidents ara viuen en la utilitat `stacking` pròpia de `@pantoken/components`.

## Exemple

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## Interfícies

- [StackingOptions](interfaces/StackingOptions.md)

## Variables

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## Funcions

- [stacking](functions/stacking.md)

## Referències

### default

Reanomena i re-exporta [stacking](functions/stacking.md)
