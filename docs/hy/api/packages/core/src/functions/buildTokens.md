[pantoken](../../../../index.md) / [packages/core/src](../index.md) / buildTokens

# Function: buildTokens()

> **buildTokens**(`options?`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք թեմայի համար կանոնական token IR՝ primitives, layout, semantic colours, component tokens, և ընտրովի icons, ապա գործարկեք plugin hooks արդյունքի վրա:

## Parameters

### options?

[`BuildTokensOptions`](../interfaces/BuildTokensOptions.md) = `{}`

[BuildTokensOptions](../interfaces/BuildTokensOptions.md).

## Returns

[`Token`](../interfaces/Token.md)[]

Լուծված, դուպլիկատից մաքրված [Token](../interfaces/Token.md) ցանկ:

## Examples

**Կառուցեք լռելյալ (rebrand) IR**

```ts
import { buildTokens } from "@pantoken/core";

const tokens = buildTokens();
// → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
```

**Ընտրեք թեմա և հեռացրեք icon layer**

```ts
import { buildTokens } from "@pantoken/core";

// A smaller, colour/layout-only IR for the canvas theme.
const tokens = buildTokens({ theme: "canvas", includeIcons: false });
```

**Գործարկեք plugin-ի tokens hook IR-ի վրա**

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
