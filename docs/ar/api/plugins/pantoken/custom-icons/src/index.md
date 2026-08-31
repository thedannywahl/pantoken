[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-icons` — حروف الأيقونات المخصصة المباعة للمستهلكين في اتجاه المصب.

يجلب الأيقونات التي ليست جزءًا من مجموعة InstUI (علامات المنتج/العلامة التجارية، وما إلى ذلك) كـ
رموز صور `--instui-icon-&lt;name&gt;` — نفس مساحة الاسم وفئة الرسام `.-icon-&lt;name&gt;` التي
تستخدمها أيقونات InstUI المدمجة، بحيث تسقط أيقونة مخصصة في `.instui-icon -icon-&lt;name&gt;` تمامًا مثل
أيقونة مدمجة. لا بادئة `custom-`: في حالة تضارب الأسماء، يجب أن تفوز أيقونة InstUI المدمجة (قم بتحميل
بعد CSS لهذه الإضافة في أي دمج URL).

## Example

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customIcons } from "@pantoken/plugin-custom-icons";

const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
// adds --instui-icon-highspot as an <image> token
```

## Interfaces

- [CustomIcon](interfaces/CustomIcon.md)
- [CustomIconsOptions](interfaces/CustomIconsOptions.md)

## Variables

- [icons](variables/icons.md)

## Functions

- [customIcons](functions/customIcons.md)

## References

### default

يعيد تسمية وإعادة تصدير [customIcons](functions/customIcons.md)
