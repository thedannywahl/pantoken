[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Function: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء سلسلة محل الأيقونات: محللات `rehype` للمكون الإضافي أولاً، ثم `resolvers` الصريح، ثم
مجموعة `@pantoken/icons` المدمجة. التطابق الأول يفوز.

## Parameters

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Returns

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Example

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
