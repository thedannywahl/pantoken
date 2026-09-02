[pantoken](../../../../index.md) / [formats/css/src](../index.md) / toCss

# 函式: toCss()

> **toCss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Emit CSS for a token IR.

## 參數

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

### options?

[`ToCssOptions`](../interfaces/ToCssOptions.md) = `{}`

[ToCssOptions](../interfaces/ToCssOptions.md).

## 回傳

`string`

The CSS string.

## 範例

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
