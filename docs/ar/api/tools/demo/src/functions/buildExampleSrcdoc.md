[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# دالة: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

إنشاء سلسلة المستند الكاملة `<!doctype html>` لمعاينة مثال حي معزول.

## المعلمات

### html

`string`

العلامات الخام للمثال (حرفيًا من سياج المصدر الخاص به).

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## القيم المرجعة

`string`

سلسلة المستند — مررها عبر [escapeSrcdoc](escapeSrcdoc.md) قبل استخدامها كقيمة سمة
`srcdoc` داخل iframe.

## مثال

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
