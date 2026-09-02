[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Fonksiyon: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Select the token map for a mode (default `"light"`).

## Parametreler

### mode?

`Mode` = `"light"`

## Döndürür

`Record`\<`string`, `string`\>

## Örnekler

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
