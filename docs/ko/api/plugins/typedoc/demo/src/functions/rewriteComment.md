[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# 함수: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Move every `@demo` block tag on a comment into `demo` fences appended to its summary, in order.
Block-tag content gets re-fenced by the markdown theme, so the fence must live in the summary
prose, which is emitted verbatim.

## 매개변수

### comment

`Comment`

The comment to rewrite in place.

## 반환값

`void`

## 예제

```ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
```
