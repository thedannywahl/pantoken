[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/markdown-it` — مكوّن إضافي لِ markdown-it يعرض رموز `:icon:` كـ SVG مضمّن وقيم الألوان المنفصلة (`#03893D`, `rgb(…)`, `oklch(…)`) كعَيّنات، باستخدام مجموعة أيقونات pantoken.

ينقل خطوط أنابيب `@pantoken/rehype` و `@pantoken/react-markdown` إلى markdown-it: قاعدة أساسية واحدة تمشي عبر نصوص كل توكن مضمن، تقسمها بحسب أنماط الأيقونات والألوان، وتستبدل المدخلات بتوكنات `html_inline`. تحلّ رموز الأيقونات عبر سلسلة من المحلِّلات — محللات الإضافات `rehype` أولاً، ثم [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve) الصريحة، ثم مجموعة `@pantoken/icons` المضمّنة — لذا تتكوّن إضافات أيقونات العلامات التجارية بنفس الطريقة كما في أماكن أخرى.

العلامة المصدرة تستخدم نفس أسماء الأصناف كما في العارضات الأخرى (`pantoken-icon`, `pantoken-color-swatch`), لذلك يؤدي تحميل أنماط `@pantoken/components` إلى تنسيقها. لفّ HTML المولّد داخل حاوية `.pantoken-prose` (انظر [PROSE\_CLASS](variables/PROSE_CLASS.md)) لالتقاط طبقة النثر أيضاً.

## مثال

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## واجهات

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## المتغيرات

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## الدوال

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
