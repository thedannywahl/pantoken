[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# دالة: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

نقل كل وسم كتلة `@demo` في التعليق إلى أسوار `demo` المضافة إلى الملخص، وبالترتيب.
يُعاد تسييج محتوى وسم الكتلة بواسطة سمة الماركداون، لذا يجب أن يكون السياج داخل نص الملخص
الذي يُصدَر حرفيًا.

## المعلمات

### comment

`Comment`

التعليق الذي يُعاد كتابته في موضعه.

## القيم المرجعة

`void`

## مثال

```ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
```
