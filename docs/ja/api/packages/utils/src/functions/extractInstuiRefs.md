[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# 関数: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## パラメーター

### text

`string`

## 戻り値

`Set`\<`string`\>

## 例

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
