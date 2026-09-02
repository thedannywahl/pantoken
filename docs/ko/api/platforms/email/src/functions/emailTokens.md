[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# 함수: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Select the token map for a mode (default `"light"`).

## 매개변수

### mode?

`Mode` = `"light"`

## 반환값

`Record`\<`string`, `string`\>

## 예제들

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
