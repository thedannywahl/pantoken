[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# 함수: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## 매개변수

### text

`string`

## 반환값

`Set`\<`string`\>

## 예제

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
