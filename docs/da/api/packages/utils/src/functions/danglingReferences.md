[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# Funktion: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Selvindeslutningskontrol: `--instui-*` navne, der refereres via `var()` i et stilark, som det aldrig
definer (som en `@property` registrering eller en `--x:` erklæring). Sorteret; tomt betyder, at hver
reference løses inden for samme output. Brug til selvindesluttede stilark (css, pendo).

## Parametre

### css

`string`

Det genererede stilark.

## Returnerer

`string`[]

De hengende referencenavne.

## Eksempel

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
