[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# Function: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مصنع مكون إضافي markdown-it. استخدمه مع `md.use(pantokenMarkdownIt, options)`.

## Parameters

### md

`MarkdownIt`

مثيل markdown-it.

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## Returns

`void`

## Example

**إنشاء معالج مكون إضافي لأيقونة العلامة التجارية**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
