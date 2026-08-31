[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interface: LiveExampleOptions

Hvordan man sys en live forhåndsvisning på hver `@example` HTML fold på matchende sider.

## Properties

### match

> **match**: (`relativePath`) => `boolean`

Omslut kun fold på sider hvis markdown-it `env.relativePath` matcher (f.eks. CSS-API siderne).

#### Parameters

##### relativePath

`string`

#### Returns

`boolean`

---

### wrap

> **wrap**: (`html`, `flags`) => `string`

Byg forhåndsvisningsblokken som tilføjes efter hver ikke-overlay `html` fold, fra dens markup og eventuelle `-flag` tokens analyseret fra fold info-strengen.

#### Parameters

##### html

`string`

##### flags

`Set`\<`string`\>

#### Returns

`string`
