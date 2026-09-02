[pantoken](../../../../index.md) / [formats/css/src](../index.md) / toCss

# Fonksiyon: toCss()

> **toCss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Emit CSS for a token IR.

## Parametreler

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToCssOptions`](../interfaces/ToCssOptions.md) = `{}`

[ToCssOptions](../interfaces/ToCssOptions.md).

## Döndürür

`string`

The CSS string.

## Örnekler

**Build the default stylesheet**

```ts
import { toCss } from "@pantoken/css";
import { tokens } from "@pantoken/tokens";

const stylesheet = toCss(tokens); // declarations under :root
```

**Scope declarations to a class and build another theme**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";

toCss(byTheme("canvas"), { scope: '[class*="instui"]' });
```

**Post-process with a plugin css hook**

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
