[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# Փոփոխական: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Յուրաքանչյուր scaffoldable հարթակի բանալին (հայտնաբերված հասանելի preset-երից, գումարած ցանկացած legacy
template-only հարթակներ, որոնք դեռ չեն հաջորդ preset-ի կողմից):

## Օրինակ

**Ցուցակել հասանելի հարթակներ:**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
