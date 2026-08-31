[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# Function: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg icon-glyph stylesheet: en `.&lt;prefix&gt;-icon-&lt;name&gt;` klasse pr. ikon, der peger
`--pantoken-glyph` på det matchende `--instui-icon-&lt;name&gt;` token. Holdt uden for komponentbundt
(det er stort); sendes som sit eget `icons.css`. Pass ikonnavnene (f.eks. fra `@pantoken/icons`).

## Parameters

### names

readonly `string`[]

Ikonnavn uden præfikset `--instui-icon-` (f.eks. `["megaphone", "check"]`).

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (tilføjer `deprecatedAliases` til [ComponentOptions](../interfaces/ComponentOptions.md)).

## Returns

`string`

CSS-strengen.

## Example

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

Dette er glyph-token-halvdelen af ikonsystemet (de `.-icon-&lt;name&gt;` modifikatorer, leveret som
`icons.css`); `icon` utility er painter-halvdelen (det delte `::before`). De deler `icon`
demo.
