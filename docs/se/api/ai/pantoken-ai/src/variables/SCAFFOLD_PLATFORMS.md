[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# Variable: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Every scaffoldable platform key (discovered from available presets, plus any legacy
template-only platforms not yet backed by a preset).

## Exempel

**List available platforms**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
