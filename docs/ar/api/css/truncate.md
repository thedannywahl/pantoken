# CSS: truncate

`.--truncate` — اقتطاع الحروف بنقطة الحذف مع تقييد الأسطر يتحكم به `--lines` — قابل للاستخدام بمفرده أو مضافًا إلى أي مكوّن (`.instui-button.--truncate`).

تستخدم الفئة الأساسية `display: -webkit-box` وتقرأ الخاصية المخصصة `--lines` لتقييد النص لعدد ثابت من الأسطر قبل أن تنتهي بنقطة الحذف.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->
> [!TIP]
> **متطلب JS** — لا يرسل هذا المكوّن أي CSS خاص به — علامته وسلوكه يأتيان كليًا من `@pantoken/interactions`. المُعامل `--max-lines-auto` الخاص به يتم دفعه بواسطة ذلك السلوك. انظر [جدول المُعاملات أدناه](#modifiers).


## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## أمثلة

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">This text is clamped to three lines and ends in an ellipsis.</div>
<button class="instui-button --truncate">…</button>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--lines-1` | اسم مستعار لـ `--max-lines-1`. |
| `.--lines-2` | اسم مستعار لـ `--max-lines-2`. |
| `.--lines-3` | اسم مستعار لـ `--max-lines-3`. |
| `.--lines-4` | اسم مستعار لـ `--max-lines-4`. |
| `.--lines-5` | اسم مستعار لـ `--max-lines-5`. |
| `.--max-lines-1` | تقييد إلى سطر واحد (الافتراضي). |
| `.--max-lines-2` | تقييد إلى سطرين. |
| `.--max-lines-3` | تقييد إلى ثلاثة أسطر. |
| `.--max-lines-4` | تقييد إلى أربعة أسطر. |
| `.--max-lines-5` | تقييد إلى خمسة أسطر. |
| `.--max-lines-auto` | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate` | يُمكّن الاقتطاع وتقييد الأسطر على العنصر الهدف. |
| `.--truncate-character` | (الافتراضي) اقتطع على مستوى الأحرف. |
| `.--truncate-word` | اقتطع على مستوى الكلمات. |

## خصائص مخصّصة

| خاصية | نوع | افتراضي | الوصف |
| --- | --- | --- | --- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | — |
| `--lines` | `<integer>` | `1` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base` | `<percentage>` | `150%` |

## دعم المتصفّح

- التقييد يعتمد على `-webkit-line-clamp` مع `display: -webkit-box`، مقترنًا بـ `line-clamp` القياسي.

## ذات صلة

- [text](/ar/api/css/text.md) — تنسيق نص الجسم الذي يقوم هذا الاقتطاع بتقليصه.

