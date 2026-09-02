[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Fonction: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## Paramètres

### text

`string`

## Retourne

`Set`\<`string`\>

## Exemple

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
