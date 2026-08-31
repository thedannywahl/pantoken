# CSS: truncate

`.--truncate` — اختصار بالحذف مع تثبيت السطر يتم التحكم به بواسطة `--lines` — يمكن استخدامه بمفرده أو ربطه بأي مكون (`.instui-button.--truncate`).

تستخدم الفئة الأساسية `display: -webkit-box` وتقرأ الخاصية المخصصة `--lines` لتقيد النص بعدد محدد من الأسطر قبل أن ينتهي بحذف.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->

> [!TIP]
> **JS Requirement** — هذا المكون لا يأتي مع CSS خاص به — يأتي الترميز والسلوك بالكامل من `@pantoken/interactions`. معدل `--max-lines-auto` يتم تشغيله بواسطة هذا السلوك. انظر إلى [جدول المعدلات أدناه](#modifiers).

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">
  This text is clamped to three lines and ends in an ellipsis.
</div>
<button class="instui-button --truncate">…</button>
```

## Modifiers

| Modifier                | Description                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.--lines-1`            | بديل لـ `--max-lines-1`.                                                                                                                                                                                    |
| `.--lines-2`            | بديل لـ `--max-lines-2`.                                                                                                                                                                                    |
| `.--lines-3`            | بديل لـ `--max-lines-3`.                                                                                                                                                                                    |
| `.--lines-4`            | بديل لـ `--max-lines-4`.                                                                                                                                                                                    |
| `.--lines-5`            | بديل لـ `--max-lines-5`.                                                                                                                                                                                    |
| `.--max-lines-1`        | تقيد إلى سطر واحد (افتراضي).                                                                                                                                                                                |
| `.--max-lines-2`        | تقيد إلى سطرين.                                                                                                                                                                                             |
| `.--max-lines-3`        | تقيد إلى ثلاثة أسطر.                                                                                                                                                                                        |
| `.--max-lines-4`        | تقيد إلى أربعة أسطر.                                                                                                                                                                                        |
| `.--max-lines-5`        | تقيد إلى خمسة أسطر.                                                                                                                                                                                         |
| `.--max-lines-auto`     | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate`           | يتيح الاختصار وتثبيت السطر على العنصر المستهدف.                                                                                                                                                             |
| `.--truncate-character` | (افتراضي) اختصر على مستوى الأحرف.                                                                                                                                                                           |
| `.--truncate-word`      | اختصر على مستوى الكلمة.                                                                                                                                                                                     |

## Custom properties

| Property     | Type                                   | Default    | Description |
| ------------ | -------------------------------------- | ---------- | ----------- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | —           |
| `--lines`    | `<integer>`                            | `1`        | —           |

## Tokens consumed

| Token                                          | Type                                               | Value                                                                        |
| ---------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base`          | `<percentage>`                                     | `150%`                                                                       |

## Browser support

- يعتمد التثبيت على `-webkit-line-clamp` مع `display: -webkit-box`، مقترنًا مع `line-clamp`.

## Related

- [text](/ar/api/css/text.md) — طباعة الجسم التي يقوم هذا بقصها.
