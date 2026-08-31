[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# Function: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

انقل كل علامة كتلة `@demo` على تعليق إلى أسوار `demo` مرفقة بملخصه، بالترتيب. يتم إعادة تسييج محتوى الكتلة بواسطة مظهر markdown، لذا يجب أن يعيش السياج في نثر الملخص، والذي يتم إصداره كما هو.

## Parameters

### comment

`Comment`

التعليق لإعادة كتابة موضعه.

## Returns

`void`

## Example

````ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
````
