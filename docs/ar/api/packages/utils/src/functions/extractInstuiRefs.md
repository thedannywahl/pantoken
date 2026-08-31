[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Function: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

كل `--instui-*` اسم خاصية مخصصة يظهر في أي مكان في `text`.

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
