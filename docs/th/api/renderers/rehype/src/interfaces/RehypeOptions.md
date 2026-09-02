[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# อินเทอร์เฟซ: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Options for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## คุณสมบัติ

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

The class name applied to the emitted wrapper (default: `pantoken-icon`).
