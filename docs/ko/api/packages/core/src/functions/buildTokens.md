[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# 함수: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Build the canonical token IR for a theme: primitives, layout, semantic colours, component tokens,
and optional icons, then run plugin hooks over the result.

## 매개변수

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## 반환값

[`Token`](../interfaces/Token.md)[]

The resolved, de-duplicated [Token](../interfaces/Token.md) list.

## 예제들

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
