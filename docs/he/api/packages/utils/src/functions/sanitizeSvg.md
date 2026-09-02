[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / sanitizeSvg

# פונקציה: sanitizeSvg()

> **sanitizeSvg**(`svg`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Strip `&lt;script&gt;` elements and event-handler attributes from SVG markup.

Defense-in-depth for SVG decoded from vendored data URIs or contributed by plugins.
Not a full HTML parser — relies on the upstream source being trusted and pinned.

## פרמטרים

### svg

`string`

## מחזיר

`string`
