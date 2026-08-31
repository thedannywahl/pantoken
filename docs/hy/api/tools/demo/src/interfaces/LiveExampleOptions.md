[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Interface: LiveExampleOptions

Թե ինչպես ամբողջացնել ուղիղ նախադրս յուրաքանչյուր `@example` HTML պատի վրա համապատասխան էջերում:

## Properties

### match

> **match**: (`relativePath`) => `boolean`

Պատել միայն պատերը էջերում որոնց markdown-it `env.relativePath`-ը համապատասխանում է (օր. CSS-API էջերը):

#### Parameters

##### relativePath

`string`

#### Returns

`boolean`

---

### wrap

> **wrap**: (`html`, `flags`) => `string`

Կառուցել նախադրս բլոկ ավելացված յուրաքանչյուր ոչ-վերածածկ `html` պատից հետո, նրա նշանակումից և ցանկացած `-flag` տոկեններ վերլուծված պատի տեղեկատվության տողից:

#### Parameters

##### html

`string`

##### flags

`Set`\<`string`\>

#### Returns

`string`
