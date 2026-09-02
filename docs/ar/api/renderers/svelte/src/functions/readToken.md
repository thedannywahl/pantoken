[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# دالة: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اقرأ قيمة توكن محلولة. تُعيد `fallback` على الخادم.

## المعلمات

### name

`string`

### fallback?

`string` = `""`

## القيم المرجعة

`string`

## مثال

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
