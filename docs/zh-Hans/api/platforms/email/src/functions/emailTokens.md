[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# 函数: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Select the token map for a mode (default `"light"`).

## 参数

### mode?

`Mode` = `"light"`

## 返回值

`Record`\<`string`, `string`\>

## 示例

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
