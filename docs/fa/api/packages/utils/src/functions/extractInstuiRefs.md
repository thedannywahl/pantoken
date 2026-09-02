[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# تابع: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## پارامترها

### text

`string`

## مقدار بازگشتی

`Set`\<`string`\>

## نمونه

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
