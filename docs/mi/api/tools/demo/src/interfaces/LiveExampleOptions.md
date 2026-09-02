[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Atanga: LiveExampleOptions

How to seam a live preview onto each `@example` HTML fence on matching pages.

## Ngā Rawa

### match

> **match**: (`relativePath`) => `boolean`

Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages).

#### Ngā Tawhā

##### relativePath

`string`

#### Whakahokia

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Ngā Tawhā

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Whakahokia

`string`
