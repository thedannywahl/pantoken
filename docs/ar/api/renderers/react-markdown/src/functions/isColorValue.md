[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# دالة: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

صحيح عندما تكون السلسلة قيمة لون CSS مستقلة (بصيغة سداسية عشرية أو دالة لون).

## المعلمات

### value

`string`

## القيم المرجعة

`boolean`

## مثال

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
