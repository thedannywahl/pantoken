[pantoken](../../../../index.md) / [formats/css/src](../index.md) / toCss

# Function: toCss()

> **toCss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Արտանետել CSS տոկեն IR-ի համար:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR (օր. `@pantoken/tokens`-ից):

### options?

[`ToCssOptions`](../interfaces/ToCssOptions.md) = `{}`

[ToCssOptions](../interfaces/ToCssOptions.md).

## Returns

`string`

CSS տողը։

## Examples

**Կառուցել լռելի ոճային թերթ**

```ts
import { toCss } from "@pantoken/css";
import { tokens } from "@pantoken/tokens";

const stylesheet = toCss(tokens); // declarations under :root
```

**Շրջանային հայտարարություններ դասին և կառուցել այլ թեմա**

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";

toCss(byTheme("canvas"), { scope: '[class*="instui"]' });
```

**Հետ-մշակել plugin css կեռներով**

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
