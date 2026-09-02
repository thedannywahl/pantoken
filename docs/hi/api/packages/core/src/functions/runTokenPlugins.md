[pantoken](../../../../index.md) / [packages/core/src](../index.md) / runTokenPlugins

# फंक्शन: runTokenPlugins()

> **runTokenPlugins**(`tokens`, `theme`, `plugins`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Run every plugin's `tokens` hook in order. Each hook receives the current list and returns the
full replacement; the result is de-duplicated by name.

## पैरामीटर

### tokens

[`Token`](../interfaces/Token.md)[]

### theme

[`Theme`](../type-aliases/Theme.md)

### plugins

readonly [`PantokenPlugin`](../interfaces/PantokenPlugin.md)[]

## वापसी

[`Token`](../interfaces/Token.md)[]

## उदाहरण

```ts
import { runTokenPlugins, type PantokenPlugin } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const base: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
];
const addBrand: PantokenPlugin = {
  name: "brand",
  tokens: ({ tokens }) => [
    ...tokens,
    defineToken({ name: "--instui-brand", value: "#0374B5" }),
  ],
};

runTokenPlugins(base, "rebrand", [addBrand]); // → base + the --instui-brand token
```
