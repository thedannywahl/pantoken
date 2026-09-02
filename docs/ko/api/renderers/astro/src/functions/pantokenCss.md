[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# 함수: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## 매개변수

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## 반환값

`string`

The CSS string.

## 예제

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
