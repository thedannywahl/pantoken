[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# Function: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Comprovació d'autocontingut: noms `--instui-*` referenciats via `var()` en un full d'estils que mai
defineix (com a registre `@property` o declaració `--x:`). Ordenat; buit significa que tota referència es resol dins la mateixa sortida. Utilitzar per a fulls d'estils autocontinguts (css, pendo).

## Parameters

### css

`string`

El full d'estils generat.

## Returns

`string`[]

Els noms de referència penjants.

## Example

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
