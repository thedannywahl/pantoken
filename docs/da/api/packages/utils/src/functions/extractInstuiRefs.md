[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Function: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvert `--instui-*` custom-property-navn, der vises hvor som helst i `text`.

## Parameters

### text

`string`

## Returns

`Set`\<`string`\>

## Example

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
