[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Интерфейс: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## Свойства

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## Методы

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### Параметры

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Возвращаемое значение

`void`
