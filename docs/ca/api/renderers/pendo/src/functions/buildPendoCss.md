[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Funció: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix la fulla d'estils de la guia de Pendo.

## Paràmetres

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Retorna

`string`

El CSS compost.

## Exemples

**Construcció per defecte de redisseny de marca (amb abast, !important, tallada)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**Tema de Canvas, sense abast, manté el conjunt complet de tokens**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```
