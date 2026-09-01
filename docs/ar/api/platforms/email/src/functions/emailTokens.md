[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# دالة: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حدد خريطة الرموز للوضع (الافتراضي `"light"`).

## المعلمات

### mode?

`Mode` = `"light"`

## القيم المرجعة

`Record`\<`string`, `string`\>

## أمثلة

**أدرج رمزًا داخل خلية البريد الإلكتروني (الوضع الفاتح)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**الوضع الداكن**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
