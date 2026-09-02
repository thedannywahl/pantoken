[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runIconPlugins

# Ֆունկցիա: runIconPlugins()

> **runIconPlugins**(`tokens`, `plugins`, `theme?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գործարկեք յուրաքանչյուր plugin-ի `icons` hook, թույլ տալով plugins-ի լրացուցիչ glyphs գրանցել որպես `&lt;image&gt;` tokens: Յուրաքանչյուր hook ստանում է ընթացիկ icon ցանկ և վերադարձնում նոր [IconEntry](../interfaces/IconEntry.md) records ավելացման համար: Արդյունքը de-duplicated է անվամբ:

## Պարամետրեր

### tokens

[`Token`](../interfaces/Token.md)[]

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

### theme?

[`Theme`](../type-aliases/Theme.md) = `"rebrand"`

## Վերադարձվող արժեք

[`Token`](../interfaces/Token.md)[]

## Օրինակ

**Գրանցեք լրացուցիչ glyph որպես \<image\> token**

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
