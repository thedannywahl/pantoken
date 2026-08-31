[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# Function: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք icon-glyph ոճ-հաղորդակցման թերթ՝ մեկ `.&lt;prefix&gt;-icon-&lt;name&gt;` դաս յուրաքանչյուր պատկերակի համար, որ նշում է `--pantoken-glyph` համապատասխան `--instui-icon-&lt;name&gt;` տոկենի վրա։ Պահպանված բաղադրիչային փաթեթից դուրս (այն մեծ է); նամակ ստացվում է որպես իր սեփական `icons.css`։ Փոխանցեք պատկերակի անունները (օրինակ՝ `@pantoken/icons` ից)։

## Parameters

### names

readonly `string`[]

Պատկերակների անունները առանց `--instui-icon-` նախածանցի (օր. `["megaphone", "check"]`):

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (`deprecatedAliases` ավելացնում է [ComponentOptions](../interfaces/ComponentOptions.md)-ին):

## Returns

`string`

CSS տողը։

## Example

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

Սա պատկերակային համակարգի գլիֆ-թոքեն կեսն է (`.-icon-&lt;name&gt;` փոփոխիչներ, հերթեկցված `icons.css`-ի ձեւով); `icon` հեռավորությունն է նկարիչ կեսը (ընդհանուր `::before`): Նրանք կիսում են `icon` ցուցադրումը:
