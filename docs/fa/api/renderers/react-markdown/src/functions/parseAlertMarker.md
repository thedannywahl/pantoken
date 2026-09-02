[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / parseAlertMarker

# تابع: parseAlertMarker()

> **parseAlertMarker**(`text`): \{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Detect a GitHub alert marker at the start of text; returns the marker and the remaining text.

## پارامترها

### text

`string`

## مقدار بازگشتی

\{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

## نمونه

```ts
import { parseAlertMarker } from "@pantoken/react-markdown";

parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
parseAlertMarker("Plain text"); // undefined
```
