[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Functie: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Parameters

### text

`string`

## Retourneert

`Set`\<`string`\>

## Voorbeeld

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
