[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / parseAlertMarker

# Funció: parseAlertMarker()

> **parseAlertMarker**(`text`): \{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Detectar un marcador d'alerta de GitHub al principi del text; retorna el marcador i el text restant.

## Paràmetres

### text

`string`

## Retorna

\{ `marker`: [`AlertMarker`](../type-aliases/AlertMarker.md); `rest`: `string`; \} \| `undefined`

## Exemple

```ts
import { parseAlertMarker } from "@pantoken/react-markdown";

parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
parseAlertMarker("Plain text"); // undefined
```
