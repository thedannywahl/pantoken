[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# دالة: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء سلسلة مُحلّل الأيقونات المشتركة: محلِّلات الإضافة `rehype` أولاً، ثم `resolve` الصريح، ثم مجموعة أيقونات pantoken المدمجة. تُستخدم بواسطة `@pantoken/rehype` و
`@pantoken/markdown-it` بحيث يظل ترتيب الحلول متماثلاً عبر العارضين.

## المعلمات

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## القيم المرجعة

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## مثال

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
