[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# دالة: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

مصنع مكوّن إضافي لـ markdown-it. استخدمه مع `md.use(pantokenMarkdownIt, options)`.

## المعلمات

### md

`MarkdownIt`

مثيل markdown-it.

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## القيم المرجعة

`void`

## مثال

**تأليف مُحلّل مكوّن إضافي لأيقونة العلامة التجارية**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
