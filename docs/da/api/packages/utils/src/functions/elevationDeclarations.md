[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / elevationDeclarations

# Funktion: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De `--instui-elevation-*` navn/værdi-par (hver en multi-lag `box-shadow`). Værdier refererer til
temaet drop-shadow farvetokens, så de tilpasses pr. tema, hvor en token-ark indlæses.

## Returnerer

\[`string`, `string`\][]

Et `[customProperty, value]` par pr. niveau og alias.

## Eksempel

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
