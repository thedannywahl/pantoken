[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# פונקציה: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## פרמטרים

### text

`string`

## מחזיר

`Set`\<`string`\>

## דוגמה

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
