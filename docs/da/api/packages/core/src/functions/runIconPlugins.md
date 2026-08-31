[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# Function: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kør hvert plugins `icons` krog, der lader plugins registrere ekstra glyfer som `&lt;image&gt;` tokens.
Hver krog modtager den aktuelle ikon-liste og returnerer nye [IconEntry](../interfaces/IconEntry.md) poster at tilføje.
Resultatet dedupliseres efter navn.

## Parameters

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## Returns

[`Token`](../interfaces/Token.md)[]

## Example

**Registrer en ekstra glyf som et \<image\> token**

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
