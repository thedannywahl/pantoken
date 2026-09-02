[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interfície: LiveExampleOptions

Com cosir una vista prèvia en directe a cada tanca `@example` HTML a les pàgines coincidents.

## Propietats

### match

> **match**: (`relativePath`) => `boolean`

Només embolicar tanques a les pàgines la markdown-it `env.relativePath` de les quals coincideix (per exemple, les pàgines CSS-API).

#### Paràmetres

##### relativePath

`string`

#### Retorna

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Paràmetres

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Retorna

`string`
