[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# Ինտերֆեյս: LiveExampleOptions

Թե ինչպես ամբողջացնել ուղիղ նախադրս յուրաքանչյուր `@example` HTML պատի վրա համապատասխան էջերում:

## Առանձնահատկություններ

### match

> **match**: (`relativePath`) => `boolean`

Պատել միայն պատերը էջերում որոնց markdown-it `env.relativePath`-ը համապատասխանում է (օր. CSS-API էջերը):

#### Պարամետրեր

##### relativePath

`string`

#### Վերադարձվող արժեք

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

Build the preview block appended after each non-overlay `html` fence, from its markup, any `-flag` tokens parsed from the fence info string, and the page's `env.relativePath` (for locale/direction lookups).

#### Պարամետրեր

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### Վերադարձվող արժեք

`string`
