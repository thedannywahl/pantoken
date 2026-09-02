[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# फंक्शन: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## पैरामीटर

### text

`string`

## वापसी

`Set`\<`string`\>

## उदाहरण

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
