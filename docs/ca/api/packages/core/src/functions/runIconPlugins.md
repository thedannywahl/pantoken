[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# Funció: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Executa el ganxo `icons` de cada plugin, deixant que els plugins registrin glifos addicionals com a tokens `&lt;image&gt;`.
Cada ganxo rep la llista d'icones actual i retorna nous registres [IconEntry](../interfaces/IconEntry.md) per afegir.
El resultat es desduplicat per nom.

## Paràmetres

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## Retorna

[`Token`](../interfaces/Token.md)[]

## Exemple

**Registra un glifo extra com a token \<image\>**

```ts
import { runIconPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [];
const star: PantokenPlugin = {
  name: "star",
  icons: () => [{ name: "star", path: "M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" }],
};

const tokens = runIconPlugins(base, [star], "rebrand");
// → adds a --instui-icon-star token whose value is a data-URI SVG
```
