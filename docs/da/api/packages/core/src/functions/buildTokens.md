[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# Function: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg den kanoniske token IR for et tema: primitiver, layout, semantiske farver, komponenttokens,
og valgfrie ikoner, og kør derefter plugin-kroge over resultatet.

## Parameters

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## Returns

[`Token`](../interfaces/Token.md)[]

Den løste, dedupleret [Token](../interfaces/Token.md) liste.

## Examples

**Byg standard-IR'en (rebrand)**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**Vælg et tema og dropp ikonlaget**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**Kør en plugins token-krog over IR'en**

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
