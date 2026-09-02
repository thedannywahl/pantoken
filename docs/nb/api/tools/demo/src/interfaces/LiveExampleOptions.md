[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Grensesnitt: LiveExampleOptions

How to seam a live preview onto each `@example` HTML fence on matching pages.

## Egenskaper

### match

> **match**: (`relativePath`) => `boolean`

Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages).

#### Parametere

##### relativePath

`string`

#### Returnerer

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Parametere

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Returnerer

`string`
