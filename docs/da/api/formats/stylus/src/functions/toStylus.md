[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# Funktion: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udlever Stylus-variabler for en token-IR.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en (f.eks. fra `@pantoken/tokens`).

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## Returnerer

`string`

Stylus-kildestreng.

## Eksempler

**Udsend standardvariabler (light)**

```ts
import { toStylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

toStylus(tokens); // "instui-color-brand = #0374b5\n…"
```

**Løs mørk tilstand for et andet tema**

```ts
import { toStylus } from "@pantoken/stylus";
import { byTheme } from "@pantoken/tokens";

toStylus(byTheme("canvas"), { mode: "dark" });
```
