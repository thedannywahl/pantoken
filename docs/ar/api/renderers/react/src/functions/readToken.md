[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# دالة: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

قراءة قيمة توكن تم حلها من المستند. تُرجع `fallback` على الخادم.

## المعلمات

### name

`string`

### fallback?

`string` = `""`

## القيم المرجعة

`string`

## مثال

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
