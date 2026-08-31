[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# Function: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix la IR canònica de tokens per a un tema: primitius, disposició, colors semàntics, tokens de component,
i icones opcionals, després executa ganxos de plugin sobre el resultat.

## Parameters

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## Returns

[`Token`](../interfaces/Token.md)[]

La llista resuelta i desduplicada de [Token](../interfaces/Token.md).

## Examples

**Construeix la IR per defecte (remarca)**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**Tria un tema i elimina la capa d'icona**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**Executa el ganxo de tokens d'un plugin sobre la IR**

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
