[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Fušla: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Parametera

### text

`string`

## Gullii / Gávdnat

`Set`\<`string`\>

## Exempel

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
