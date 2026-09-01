[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/typedoc-plugin-demo` — إضافة TypeDoc لخانة الكتلة `@demo`.

يقوم المؤلفون بإرفاق عرض تفاعلي قابل للتضمين بأي رمز باستخدام `@demo &lt;spec&gt;`، حيث تكون `&lt;spec&gt;` إما
رابطًا خامًا أو زوج `&lt;provider&gt;:&lt;ref&gt;` (على سبيل المثال `stackblitz:abc123`، `codesandbox:xy12z`،
`wp-playground:https://…/blueprint.json`، أو `self:button`). هذه الإضافة لا تسجل أي شيء عن
المزوّدين بنفسها — تظل متعمدة السذاجة وقابلة لإعادة الاستخدام: تنقل مواصفة كل علامة `@demo` إلى
كتلة `demo` محاطة بسياج تُضاف إلى ملخص الرمز، ويقرر عارض الوثائق الخاص بك كيف
يحوّل المواصفة إلى iframe. (انظر `@pantoken/demo` لعارض يحلّ المزوّدين.)

يمرّ السياج عبر الماركداون دون تغيير — بما في ذلك أي خط أنابيب ترجمة يحافظ على كتل الشيفرة — لذا يبقى العرض التوضيحي صالحًا بعد الترجمة.

**الإعداد:** أضف `"@demo"` إلى خيار `blockTags` في TypeDoc. يقرأ محلل التعليقات تلك القائمة قبل
تحميل الإضافات، لذلك لا يمكن لإضافة أن تسجّل العلامة متأخرة بما يكفي لقمع تحذير "علامة كتلة غير معروفة"؛ يجب أن تكون في `typedoc.json` الخاص بك.

## مثال

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"]
}
```

## المتغيرات

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## الدوال

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
