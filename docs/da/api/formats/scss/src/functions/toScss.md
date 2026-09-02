[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# Funktion: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udlever SCSS-variabler for en token-IR.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## Returnerer

`string`

SCSS-kildestreng.

## Eksempler

**Udsend standardvariabler (light)**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**Løs mørk tilstand for et andet tema**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```
