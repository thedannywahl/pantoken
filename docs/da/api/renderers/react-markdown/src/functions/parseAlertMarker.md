[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / parseAlertMarker

# Function: parseAlertMarker()

> **parseAlertMarker**(`text`): \{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Registrer en GitHub-varselmarkør ved tekstens start; returnerer markøren og den resterende tekst.

## Parameters

### text

`string`

## Returns

\{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

## Example

```ts
import { parseAlertMarker } from "@pantoken/react-markdown";

parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
parseAlertMarker("Plain text"); // undefined
```
