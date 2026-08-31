[pantoken](../../../../index.md) / [formats/css/src](../index.md) / toCss

# Function: toCss()

> **toCss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Emet CSS per a un IR de token.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

La IR (p. ex. de `@pantoken/tokens`).

### options?

[`ToCssOptions`](../interfaces/ToCssOptions.md) = `{}`

[ToCssOptions](../interfaces/ToCssOptions.md).

## Returns

`string`

La cadena CSS.

## Examples

**Construeix la fulla d'estil per defecte**

```ts
import { toCss } from "@pantoken/css";
import { tokens } from "@pantoken/tokens";

const stylesheet = toCss(tokens); // declarations under :root
```

**Declara declaracions a una classe i construeix un altre tema**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";

toCss(byTheme("canvas"), { scope: '[class*="instui"]' });
```

**Post-processa amb un ganxo de plugin css**

```ts
import { toCss } from "@pantoken/css";
import { tokens } from "@pantoken/tokens";

toCss(tokens, {
  plugins: [
    {
      name: "focus",
      css: () => ({ append: ":focus-visible { outline: 2px solid var(--instui-focus-color); }" }),
    },
  ],
});
```
