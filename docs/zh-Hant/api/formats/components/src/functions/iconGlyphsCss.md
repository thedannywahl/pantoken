[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# 函式: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the icon-glyph stylesheet: one `.&lt;prefix&gt;-icon-&lt;name&gt;` class per icon that points
`--pantoken-glyph` at the matching `--instui-icon-&lt;name&gt;` token. Kept out of the component bundle
(it's large); ships as its own `icons.css`. Pass the icon names (e.g. from `@pantoken/icons`).

## 參數

### names

readonly `string`[]

Icon names without the `--instui-icon-` prefix (e.g. `["megaphone", "check"]`).

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (adds `deprecatedAliases` to [ComponentOptions](../interfaces/ComponentOptions.md)).

## 回傳

`string`

The CSS string.

## 範例

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

This is the glyph-token half of the icon system (the `.-icon-&lt;name&gt;` modifiers, shipped as
`icons.css`); the `icon` utility is the painter half (the shared `::before`). They share the `icon`
demo.
