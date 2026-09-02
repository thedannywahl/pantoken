[pantoken](../../../../index.md) / [packages/core/src](../index.md) / decodeIconSvg

# 函式: decodeIconSvg()

> **decodeIconSvg**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Decode an icon token's `url('data:…')` value back to inline SVG.

## 參數

### value

`string`

## 回傳

`string`

## 範例

```ts
import { decodeIconSvg } from "@pantoken/core";

const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
```
