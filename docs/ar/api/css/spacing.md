# CSS: spacing

`.--p-md` — أدوات الهامش والحشو — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` و `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` على مقياس المسافة (الجوانب `t`/`b`/`s`/`e`/`x`/`y` أو لا شيء، مكتوب قصير أو طويل بالكامل — على سبيل المثال `--mb-sm` و `--margin-bottom-small` قاعدة واحدة؛ الهامش يأخذ أيضًا `auto`). قابل للاستخدام عارياً أو مسلسلاً على أي مكون (على سبيل المثال `class="instui-view --mb-sm"`).

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:spacing
```

## Examples

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## Modifiers

| Modifier  | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `.--p-md` | يطبق الحشو المتوسط على جميع الجوانب.                                   |
| `.--m*`   | أدوات الهامش عبر الإملاءات القصيرة والطويلة الموروثة والطويلة بالكامل. |
| `.--p*`   | أدوات الحشو عبر الإملاءات القصيرة والطويلة الموروثة والطويلة بالكامل.  |

## Tokens consumed

| Token                                                         | Type       | Value      |
| ------------------------------------------------------------- | ---------- | ---------- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem`     |
| `--instui-spacing-space-lg`                                   | `<length>` | `1rem`     |
| `--instui-spacing-space-md`                                   | `<length>` | `0.75rem`  |
| `--instui-spacing-space-sm`                                   | `<length>` | `0.5rem`   |
| `--instui-spacing-space-xl`                                   | `<length>` | `1.5rem`   |
| `--instui-spacing-space-xs`                                   | `<length>` | `0.25rem`  |
| `--instui-spacing-space2xl`                                   | `<length>` | `2rem`     |
| `--instui-spacing-space2xs`                                   | `<length>` | `0.125rem` |
