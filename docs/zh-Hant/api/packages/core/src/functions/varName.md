[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# 函式: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## 參數

### prefix

`string`

### path

`string`[]

## 回傳

`string`

## 範例

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
