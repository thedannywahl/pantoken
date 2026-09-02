[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Συνάρτηση: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Παράμετροι

### text

`string`

## Επιστρέφει

`Set`\<`string`\>

## Παράδειγμα

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
