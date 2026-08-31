[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Function: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ընտրեք տոկեն քարտեզը ռեժիմի համար (լռելյայն `"light"`):

## Parameters

### mode?

`Mode` = `"light"`

## Returns

`Record`\<`string`, `string`\>

## Examples

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
