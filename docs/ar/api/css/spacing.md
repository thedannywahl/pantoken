# CSS: spacing

`.--p-md` — أدوات الهامش والحشو — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` و `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` على مقياس التباعد (الجانبين `t`/`b`/`s`/`e`/`x`/`y` أو لا شيء، مكتوبة بصيغة مختصرة أو طويلة كاملة — على سبيل المثال `--mb-sm` و `--margin-bottom-small` هما نفس القاعدة؛ الهامش يقبل أيضاً `auto`). قابلة للاستخدام منفردة أو متسلسلة على أي مكوّن (على سبيل المثال `class="instui-view --mb-sm"`).

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## الاستخدام

```css
@import "@pantoken/components/utilities.css";
```

## عرض توضيحي

```demo
self:spacing
```

## أمثلة

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.--p-md` | يطبّق حشواً متوسطاً على جميع الجوانب. |
| `.--m*` | أدوات الهامش بصيغ مختصرة، وصيغ طويلة قديمة، والصيغ الطويلة الكاملة. |
| `.--p*` | أدوات الحشو بصيغ مختصرة، وصيغ طويلة قديمة، والصيغ الطويلة الكاملة. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

