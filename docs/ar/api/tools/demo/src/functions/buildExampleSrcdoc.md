[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# Function: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

بناء سلسلة وثيقة `<!doctype html>` الكاملة لمعاينة مثال حي معزولة.

## Parameters

### html

`string`

ترميز المثال الخام (حرفياً من سياجه المصدري).

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## Returns

`string`

سلسلة الوثيقة — مررها عبر [escapeSrcdoc](escapeSrcdoc.md) قبل استخدامها كـ iframe
قيمة سمة `srcdoc`.

## Example

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc('<button class="instui-button">Save</button>', {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
