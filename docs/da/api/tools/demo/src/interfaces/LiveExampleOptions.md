[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interface: LiveExampleOptions

Hvordan man sys en live forhåndsvisning på hver `@example` HTML fold på matchende sider.

## Egenskaber

### match

> **match**: (`relativePath`) => `boolean`

Omslut kun fold på sider hvis markdown-it `env.relativePath` matcher (f.eks. CSS-API siderne).

#### Parametre

##### relativePath

`string`

#### Returnerer

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Parametre

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Returnerer

`string`
