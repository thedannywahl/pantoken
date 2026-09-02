[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# Funció: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cada nom de propietat personalitzada `--instui-*` que apareix a qualsevol lloc a `text`.

## Paràmetres

### text

`string`

## Retorna

`Set`\<`string`\>

## Exemple

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
