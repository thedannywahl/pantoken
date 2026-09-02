[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationDeclarations

# Функция: elevationDeclarations()

> **elevationDeclarations**(): \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.

## Возвращаемое значение

\[`string`, `string`\][]

One `[customProperty, value]` pair per level and alias.

## Пример

```ts
import { elevationDeclarations } from "@pantoken/utils";

elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
```
