[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# Function: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.

## Returns

\[`string`, `string`\][]

One `[customProperty, value]` pair per level and alias.

## Example

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
