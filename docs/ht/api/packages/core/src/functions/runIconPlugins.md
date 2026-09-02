[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# Fonksyon: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Run every plugin's `icons` hook, letting plugins register extra glyphs as `&lt;image&gt;` tokens.
Each hook receives the current icon list and returns new [IconEntry](../interfaces/IconEntry.md) records to add.
The result is de-duplicated by name.

## Paramèt

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## Retounen

[`Token`](../interfaces/Token.md)[]

## Egzanp

**Register an extra glyph as an \<image\> token**

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
