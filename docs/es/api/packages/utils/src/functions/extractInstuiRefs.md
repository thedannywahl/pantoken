[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Función: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Parámetros

### text

`string`

## Devuelve

`Set`\<`string`\>

## Ejemplo

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
