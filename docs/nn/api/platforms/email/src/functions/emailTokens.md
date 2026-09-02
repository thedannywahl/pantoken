[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Funksjon: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Select the token map for a mode (default `"light"`).

## Parametrar

### mode?

`Mode` = `"light"`

## Returnerer

`Record`\<`string`, `string`\>

## Døme

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
