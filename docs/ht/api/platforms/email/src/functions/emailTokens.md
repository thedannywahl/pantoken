[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Fonksyon: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Select the token map for a mode (default `"light"`).

## Paramèt

### mode?

`Mode` = `"light"`

## Retounen

`Record`\<`string`, `string`\>

## Egzanp

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
