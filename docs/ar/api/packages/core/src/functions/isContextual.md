[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# دالة: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

صحيح عندما لا يمكن أن تكون القيمة قيمة ابتدائية من نوع `@property` (`var()` / `light-dark()`).

## المعلمات

### value

`string`

## القيم المرجعة

`boolean`

## مثال

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
