[pantoken](../../../../index.md) / [packages/core/src](../index.md) / getIconSvgs

# دالة: getIconSvgs()

> **getIconSvgs**(`tokens`): `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قم بتعيين كل رمز أيقونة إلى SVG المفكك الخاص به (مفهرس بالاسم بدون بادئة `--instui-icon-`).

## المعلمات

### tokens

للقراءة فقط [`Token`](../interfaces/Token.md)[]

## القيم المرجعة

`Map`\<`string`, `string`\>

## مثال

```ts
import { buildTokens, getIconSvgs } from "@pantoken/core";

const svgs = getIconSvgs(buildTokens());
svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
```
