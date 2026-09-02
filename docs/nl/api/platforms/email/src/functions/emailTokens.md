[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Functie: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Select the token map for a mode (default `"light"`).

## Parameters

### mode?

`Mode` = `"light"`

## Retourneert

`Record`\<`string`, `string`\>

## Voorbeelden

**Inline a token into an email cell (light mode)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**Dark mode**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
