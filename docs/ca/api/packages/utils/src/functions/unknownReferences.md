[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / unknownReferences

# Funció: unknownReferences()

> **unknownReferences**(`text`, `ir`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Comprovació de desviació: noms `--instui-*` a `text` que l'IR no defineix (ordenats; buit significa cap
desviació). Utilitza-ho per a sortides que *fan referència* a tokens definits en altres llocs — p. ex. els
pont docosaurus/vitepress, els quals `var(--instui-*)` els objectius han de ser tots tokens reals.

## Paràmetres

### text

`string`

La sortida generada.

### ir

readonly [`Token`](../../../core/src/interfaces/Token.md)[]

El token font IR.

## Retorna

`string`[]

Els noms de tokens desconeguts.

## Exemple

```ts
import { unknownReferences } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

const ir: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];

unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
// → ["--instui-gone"]
unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
```
