[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# फंक्शन: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.

## वापसी

\[`string`, `string`\][]

One `[customProperty, value]` pair per level and alias.

## उदाहरण

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
