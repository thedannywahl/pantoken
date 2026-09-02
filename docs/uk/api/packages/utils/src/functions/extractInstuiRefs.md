[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Функція: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Параметри

### text

`string`

## Повертає

`Set`\<`string`\>

## Приклад

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
