[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Feidhm: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Paraiméadair

### text

`string`

## Tuairisceáin

`Set`\<`string`\>

## Sampla

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
