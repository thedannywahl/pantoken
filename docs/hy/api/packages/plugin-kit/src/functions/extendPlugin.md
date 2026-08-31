[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# Function: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Լրացուցիչ մոդուլ ստեղծել մեկ ուրիշի վերև: Նույն-փուլային կարներ կազմված են: `tokens` վազեցվում է `base`-ից հետո
`overrides` (որ տեսնում է բազայի արդյունքը); `css` միաձուլում է երկու `CssContribution`-ներ; `icons`/`native` վազեցվում են
յուրաքանչյուր; `rehype` շղթայատ լուծիչներ (գերակայում առաջինը): Գործիքներ են միավորում:

## Parameters

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Ընդլայնել լրացուցիչ մոդուլ:

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

Կարներ (եւ ընտրովի `name`) շերտավորված վերևում:

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Նոր դրանովանակ լրացուցիչ մոդուլ:

## Example

**Ավելացյալ CSS ներդրում ավելացնել բազային լրացուցիչ մոդուլի վերևում**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
