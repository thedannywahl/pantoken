[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# फंक्शन: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Select the token map for a mode (default `"light"`).

## पैरामीटर

### mode?

`Mode` = `"light"`

## वापसी

`Record`\<`string`, `string`\>

## उदाहरण

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
