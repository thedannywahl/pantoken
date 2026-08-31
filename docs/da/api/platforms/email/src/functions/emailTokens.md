[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Function: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Vælg tokenkortet for en tilstand (standard `"light"`).

## Parameters

### mode?

`Mode` = `"light"`

## Returns

`Record`\<`string`, `string`\>

## Examples

**Integrer et token i en email-celle (lys tilstand)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**Mørk tilstand**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
