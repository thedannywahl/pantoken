[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# Função: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Look up an icon by name.

## Parâmetros

### name

`string`

## Retorna

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## Exemplo

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
