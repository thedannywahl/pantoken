[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContextOptions

# Интерфейс: RegisterContextOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

The options `register()` and [buildRegisterContext](../functions/buildRegisterContext.md) share (everything but `only`, which only
makes sense at the `register()` call site — `buildRegisterContext`'s callers decide their own
element subset directly).

## Свойства

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

***

### locale?

> `optional` **locale?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

***

### strings?

> `optional` **strings?**: `Partial`\<[`WebComponentStrings`](WebComponentStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>
