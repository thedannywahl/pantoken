[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# Function: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կազմել լավ ձևավորված [Token](../interfaces/Token.md) մասնական մուտքից, որ `syntax`-ը լռելյայ դրվի `"*"`-ի եւ
`inherits`-ը `true`-ի: Լրացուցիչ մոդուլները այս ներմուծում են `@pantoken/model`-ից՝ `@pantoken/core`-ից կախվածությունից խուսափելու համար:
ուժեղ CSS շարահյուսության եզրակացման համար օգտագործեք `defineToken`-ը `@pantoken/core`-ից:

## Parameters

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Returns

[`Token`](../interfaces/Token.md)

## Example

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
