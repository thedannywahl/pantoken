[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/typedoc-plugin-demo` — مكون إضافي TypeDoc لعلامة كتلة `@demo`.

يرفق المؤلفون عرضًا توضيحيًا حيًا وقابلًا للتضمين بأي رمز مع `@demo &lt;spec&gt;`، حيث `&lt;spec&gt;` هو إما عنوان URL عادي أو زوج `&lt;provider&gt;:&lt;ref&gt;` (على سبيل المثال `stackblitz:abc123`، `codesandbox:xy12z`، `wp-playground:https://…/blueprint.json`، أو `self:button`). هذا المكون الإضافي لا يسجّل شيئًا عن مقدمي الخدمات نفسه — بقي متعمّدًا بسيطًا وقابلًا لإعادة الاستخدام: ينقل مواصفات علامة `@demo` لكل منها إلى كتلة `demo` مسيّجة مرفقة بملخص الرمز، ويقرّر معرض الوثائق كيفية تحويل المواصفة إلى iframe. (انظر `@pantoken/demo` لمحرك رسومات يحلّ مقدمي الخدمات.)

يمرّ السياج عبر markdown دون أن يتم لمسه — بما في ذلك أي خط أنابيب ترجمة يحافظ على كتل الكود — لذا يبقى العرض التوضيحي على قيد الحياة من التوطين.

**الإعداد:** أضف `"@demo"` إلى خيار `blockTags` في TypeDoc. يقرأ محلل التعليق تلك القائمة قبل تحميل المكونات الإضافية، لذا لا يمكن للمكون الإضافي تسجيل العلامة في الوقت المناسب لقمع تحذير "علامة كتلة غير معروفة"؛ يجب أن تكون في `typedoc.json` الخاص بك.

## Example

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"],
}
```

## Variables

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## Functions

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
