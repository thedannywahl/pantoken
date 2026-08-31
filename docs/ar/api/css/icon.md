# CSS: icon

`.instui-icon` — نظام الأيقونة: حجم `.instui-icon` بالإضافة إلى الرسام المشترك `-icon-&lt;name&gt;` الذي يغطي الحرف الرسومي (في `currentColor`) قبل أي عنصر.

**المصدر:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibility

الحرف الرسومي زخرفي، لذا اوضحه `aria-hidden="true"`؛ أعطيه `role` أو تسمية فقط عندما تنقل الأيقونة معنى بمفردها.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modifiers

| Modifier   | Description                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| `.-icon-*` | عيّن رمز الحرف الرسومي (`--pantoken-glyph`) وصيره عبر الرسام المشترك (على سبيل المثال `-icon-search`). |

## Pseudo-elements

| Pseudo-element | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `::before`     | الحرف الرسومي نفسه: صندوق 1em مغطى من `--pantoken-glyph` ومملوء بـ `currentColor`. |

## Tokens consumed

| Token              | Type    | Value |
| ------------------ | ------- | ----- |
| `--pantoken-glyph` | `<url>` | —     |
