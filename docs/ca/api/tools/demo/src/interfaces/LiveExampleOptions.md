[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interface: LiveExampleOptions

Com cosir una vista prèvia en directe a cada tanca `@example` HTML a les pàgines coincidents.

## Properties

### match

> **match**: (`relativePath`) => `boolean`

Només embolicar tanques a les pàgines la markdown-it `env.relativePath` de les quals coincideix (per exemple, les pàgines CSS-API).

#### Parameters

##### relativePath

`string`

#### Returns

`boolean`

---

### wrap

> **wrap**: (`html`, `flags`) => `string`

Construir el bloc de vista prèvia afegit després de cada tanca `html` que no sigui superposició, a partir del seu codi i qualsevol token `-flag` analitzat de la cadena d'informació de la tanca.

#### Parameters

##### html

`string`

##### flags

`Set`\<`string`\>

#### Returns

`string`
