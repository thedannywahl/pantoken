[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# 인터페이스: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

One registered custom element: its base tag name plus a `define` that registers it via the context.

## 속성

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

The base tag name, e.g. `button` (minted to `&lt;instui-button&gt;`/`&lt;x-button&gt;` by the active prefix).

## 메서드

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Register the element into `ctx.registry`, using only the shared, prefix-aware helpers.

#### 매개변수

##### ctx

[`RegisterContext`](RegisterContext.md)

#### 반환값

`void`
