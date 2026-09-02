[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# 函式: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## 參數

### text

`string`

## 回傳

`Set`\<`string`\>

## 範例

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
