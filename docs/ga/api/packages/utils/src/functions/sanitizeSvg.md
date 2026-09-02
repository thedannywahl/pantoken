[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / sanitizeSvg

# Feidhm: sanitizeSvg()

> **sanitizeSvg**(`svg`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Strip `&lt;script&gt;` elements and event-handler attributes from SVG markup.

Defense-in-depth for SVG decoded from vendored data URIs or contributed by plugins.
Not a full HTML parser — relies on the upstream source being trusted and pinned.

## Paraiméadair

### svg

`string`

## Tuairisceáin

`string`
