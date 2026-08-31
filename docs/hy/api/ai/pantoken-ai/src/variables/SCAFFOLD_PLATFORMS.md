[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# Variable: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Յուրաքանչյուր scaffoldable հարթակի բանալին (հայտնաբերված հասանելի preset-երից, գումարած ցանկացած legacy
template-only հարթակներ, որոնք դեռ չեն հաջորդ preset-ի կողմից):

## Example

**Ցուցակել հասանելի հարթակներ:**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
