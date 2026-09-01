[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# دالة: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

كل اسم خاصية مخصصة `--instui-*` الذي يظهر في أي مكان داخل `text`.

## المعلمات

### text

`string`

## القيم المرجعة

`Set`\<`string`\>

## مثال

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
