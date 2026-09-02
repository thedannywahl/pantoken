[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# 函式: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Select the token map for a mode (default `"light"`).

## 參數

### mode?

`Mode` = `"light"`

## 回傳

`Record`\<`string`, `string`\>

## 範例

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
