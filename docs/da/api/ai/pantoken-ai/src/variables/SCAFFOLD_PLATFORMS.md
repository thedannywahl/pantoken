[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# Variable: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Hver stilladset-kompatibel platform-nøgle (opdaget fra tilgængelige presets, plus eventuelle arvet skabelon-kun platforme endnu ikke understøttet af et preset).

## Example

**Oplyst tilgængelige platforme**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
