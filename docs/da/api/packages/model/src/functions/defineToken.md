[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# Funktion: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opbyg en velformet [Token](../interfaces/Token.md) ud fra delvis input, og sæt som standard `syntax` til `"*"` og
`inherits` til `true`. Plugins importerer dette fra `@pantoken/model` for at undgå at afhænge af
`@pantoken/core`; til intelligent CSS-syntaksudledning bruges `defineToken` fra `@pantoken/core`.

## Parametre

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Returnerer

[`Token`](../interfaces/Token.md)

## Eksempel

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
