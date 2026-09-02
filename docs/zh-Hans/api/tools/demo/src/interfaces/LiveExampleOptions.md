[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# 接口: LiveExampleOptions

How to seam a live preview onto each `@example` HTML fence on matching pages.

## 属性

### match

> **match**: (`relativePath`) => `boolean`

Only wrap fences on pages whose markdown-it `env.relativePath` matches (e.g. the CSS-API pages).

#### 参数

##### relativePath

`string`

#### 返回值

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### 参数

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### 返回值

`string`
