[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContextOptions

# 介面: RegisterContextOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

The options `register()` and [buildRegisterContext](../functions/buildRegisterContext.md) share (everything but `only`, which only
makes sense at the `register()` call site — `buildRegisterContext`'s callers decide their own
element subset directly).

## 屬性

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

***

### locale?

> `optional` **locale?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

***

### strings?

> `optional` **strings?**: `Partial`\<[`WebComponentStrings`](WebComponentStrings.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>
