[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Function: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

حدد خريطة العلامة لوضع (افتراضي `"light"`).

## Parameters

### mode?

`Mode` = `"light"`

## Returns

`Record`\<`string`, `string`\>

## Examples

**أدرج علامة في خلية بريد إلكتروني (الوضع الفاتح)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**الوضع الداكن**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
