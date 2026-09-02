# CSS: icon

`.instui-icon` — نظام الأيقونات: أحجام `.instui-icon` بالإضافة إلى المُرسِم المشترك `-icon-&lt;name&gt;` الذي يطبق قناعًا على الرمز (في `currentColor`) قبل أي عنصر.

**المصدر:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## سهولة الوصول

الرمز زخرفي، لذا وسمه بـ `aria-hidden="true"`; امنحه `role` أو تسمية فقط عندما تنقل الأيقونة معنى بمفردها.

## الاستخدام

```css
@import "@pantoken/components/components.css";
```

## أمثلة

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-icon-*` | اضبط توكن الرمز (`--pantoken-glyph`) واعرضه عبر المُرسِم المشترك (على سبيل المثال `-icon-search`). |

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::before` | الرمز نفسه: صندوق بحجم 1em مقنع من `--pantoken-glyph` ومملوء بـ `currentColor`. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

