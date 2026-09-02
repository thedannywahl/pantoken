[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Funzione: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Parametri

### text

`string`

## Restituisce

`Set`\<`string`\>

## Esempio

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
