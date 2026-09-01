[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# دالة: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء سلسلة مُحلِّلات الأيقونات: مُحلِّلات الإضافة `rehype` أولاً، ثم `resolvers` الصريحة، ثم
مجموعة `@pantoken/icons` المضمّنة. الأفضلية لأول تطابق.

## المعلمات

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## القيم المرجعة

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## مثال

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
