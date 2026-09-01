# CSS: visual-debug

`.-with-visual-debug` — مخطط لتصحيح التخطيط: ضع مركب `.-with-visual-debug` على أي عنصر لتحديد حدود الصندوق وأطفاله المباشرين، بحيث يصبح هيكل التخطيط مرئيًا بنظرة سريعة.

**المجموعة:** الإضافات · **المصدر:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

## الاستخدام

```css
@import "@pantoken/plugin-visual-debug/visual-debug.css";
```

## أمثلة

```html
<div class="instui-view -with-visual-debug">
  <span>Outlined child.</span>
</div>
```

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--pantoken-visual-debug-color` | — | — | لون الإطار المحدد (الافتراضي أرجواني ساطع)؛ أعد تلوينه لتغيير كل إطار تصحيح. |

