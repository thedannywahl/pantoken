[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / parseAlertMarker

# Swyddogaeth: parseAlertMarker()

> **parseAlertMarker**(`text`): \{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Detect a GitHub alert marker at the start of text; returns the marker and the remaining text.

## Paramedrau

### text

`string`

## Yn dychwelyd

\{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

## Enghraifft

```ts
import { parseAlertMarker } from "@pantoken/react-markdown";

parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
parseAlertMarker("Plain text"); // undefined
```
