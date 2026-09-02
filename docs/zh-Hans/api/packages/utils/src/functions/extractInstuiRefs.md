[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# 函数: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## 参数

### text

`string`

## 返回值

`Set`\<`string`\>

## 示例

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
