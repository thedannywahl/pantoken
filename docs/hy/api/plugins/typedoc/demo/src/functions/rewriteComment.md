[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# Function: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Տեղափոխել ամեն `@demo` block tag-ը մեկնաբանության մեջ `demo` fence-ների մեջ ավելացված իր ամփոփմանը, հերթականությամբ:
Block-tag բովանդակություն վերա-fence-ված է markdown թեմայի կողմից, այդ պատճառով fence-ը պետք է լինի ամփոփման
prose-ում, որ արտանետվել տերմինային:

## Parameters

### comment

`Comment`

Մեկնաբանություն վերաշարադրել տեղում:

## Returns

`void`

## Example

````ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
````
