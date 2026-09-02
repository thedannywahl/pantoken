[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Entèfas: LiveExampleOptions

How to seam a live preview onto each `@example` HTML fence on matching pages.

## Pwopriyete

### match

> **match**: (`relativePath`) => `boolean`

Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages).

#### Paramèt

##### relativePath

`string`

#### Retounen

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Paramèt

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Retounen

`string`
