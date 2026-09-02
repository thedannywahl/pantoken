[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / sanitizeSvg

# 函式: sanitizeSvg()

> **sanitizeSvg**(`svg`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Strip `&lt;script&gt;` elements and event-handler attributes from SVG markup.

Defense-in-depth for SVG decoded from vendored data URIs or contributed by plugins.
Not a full HTML parser — relies on the upstream source being trusted and pinned.

## 參數

### svg

`string`

## 回傳

`string`
