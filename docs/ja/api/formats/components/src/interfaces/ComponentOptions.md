[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# インターフェース: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Options common to every builder.

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## プロパティ

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-button`); any
falsy value (`null`, `undefined`, `""`, or omitting the option) drops the prefix entirely
(`.button`), so you can author `class="heading -h1"`. The stylesheets shipped by this package are
built with `"instui"`.

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Target theme for emitted CSS. Defaults to `"rebrand"` when omitted.
