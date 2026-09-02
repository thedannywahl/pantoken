[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Funktion: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Select the token map for a mode (default `"light"`).

## Parameter

### mode?

`Mode` = `"light"`

## Rückgabe

`Record`\<`string`, `string`\>

## Beispiele

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
