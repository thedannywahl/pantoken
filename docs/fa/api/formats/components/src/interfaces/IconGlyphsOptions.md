[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# رابط: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Options for [iconGlyphsCss](../functions/iconGlyphsCss.md).

## گسترش می‌دهد

- [`ComponentOptions`](ComponentOptions.md)

## خصوصیات

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-button`); any
falsy value (`null`, `undefined`, `""`, or omitting the option) drops the prefix entirely
(`.button`), so you can author `class="heading -h1"`. The stylesheets shipped by this package are
built with `"instui"`.

#### ارث‌بری از

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

***

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Target theme for emitted CSS. Defaults to `"rebrand"` when omitted.

#### ارث‌بری از

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

***

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Also emit the deprecated InstUI-prop glyph aliases (`-render-icon-&lt;name&gt;`, `-render-custom-icon-&lt;name&gt;`)
as functional aliases of `-icon-&lt;name&gt;`. Off by default — turning it on roughly doubles the sheet, so
enable it only when you need markup written against the old `renderIcon`/`renderCustomIcon` prop names
to keep rendering. The shipped `icons.css` is built with this on.
