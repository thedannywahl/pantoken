[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# 函式: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the canonical token IR for a theme: primitives, layout, semantic colours, component tokens,
and optional icons, then run plugin hooks over the result.

## 參數

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## 回傳

[`Token`](../interfaces/Token.md)[]

The resolved, de-duplicated [Token](../interfaces/Token.md) list.

## 範例

**Build the default (rebrand) IR**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**Pick a theme and drop the icon layer**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**Run a plugin's tokens hook over the IR**

```ts
import { buildTokens, type PantokenPlugin } from "@pantoken/core";

const brand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens, define }) => [
    ...tokens,
    define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
  ],
};

buildTokens({ theme: "rebrand", plugins: [brand] });
```
