[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Fonksyon: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Paramèt

### text

`string`

## Retounen

`Set`\<`string`\>

## Egzanp

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
