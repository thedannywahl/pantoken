[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-custom-icons` — أحرف أيقونات مضمّنة مخصصة للمستهلكين اللاحقين.

يجلب أيقونات ليست جزءًا من مجموعة InstUI (علامات المنتج/العلامة التجارية، إلخ) كـ
`--instui-icon-&lt;name&gt;` رموز صور — نفس فضاء الأسماء وفئة الرسام `.-icon-&lt;name&gt;` التي
تستخدمها أيقونات InstUI المضمّنة، لذا تُدرج الأيقونة المخصصة في `.instui-icon -icon-&lt;name&gt;` تمامًا مثل
الأيقونة المضمّنة. لا يوجد بادئة `custom-`: عند تعارض الأسماء، يجب أن تفوز الأيقونة المضمّنة من InstUI (حمّلها
بعد CSS لهذه الإضافة في أي عنوان URL مدمج).

## مثال

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customIcons } from "@pantoken/plugin-custom-icons";

const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
// adds --instui-icon-highspot as an <image> token
```

## واجهات

- [CustomIcon](interfaces/CustomIcon.md)
- [CustomIconsOptions](interfaces/CustomIconsOptions.md)

## المتغيرات

- [icons](variables/icons.md)

## الدوال

- [customIcons](functions/customIcons.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [customIcons](functions/customIcons.md)
