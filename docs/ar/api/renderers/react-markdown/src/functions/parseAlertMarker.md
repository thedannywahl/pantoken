[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / parseAlertMarker

# دالة: parseAlertMarker()

> **parseAlertMarker**(`text`): \{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

كشف علامة تنبيه GitHub في بداية النص؛ يُرجع العلامة والنص المتبقٍ.

## المعلمات

### text

`string`

## القيم المرجعة

\{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

## مثال

```ts
import { parseAlertMarker } from "@pantoken/react-markdown";

parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
parseAlertMarker("Plain text"); // undefined
```
