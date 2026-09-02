[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Ֆունկցիա: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ընտրեք տոկեն քարտեզը ռեժիմի համար (լռելյայն `"light"`):

## Պարամետրեր

### mode?

`Mode` = `"light"`

## Վերադարձվող արժեք

`Record`\<`string`, `string`\>

## Օրինակներ

**Մեծ ներդրել փոստային բջջի մեջ (թեթեւ ռեժիմ)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**Մութ ռեժիմ**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
