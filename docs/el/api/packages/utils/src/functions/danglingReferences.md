[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# Συνάρτηση: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Self-containment check: `--instui-*` names referenced via `var()` in a stylesheet that it never
defines (as an `@property` registration or a `--x:` declaration). Sorted; empty means every
reference resolves within the same output. Use for self-contained stylesheets (css, pendo).

## Παράμετροι

### css

`string`

The generated stylesheet.

## Επιστρέφει

`string`[]

The dangling reference names.

## Παράδειγμα

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
