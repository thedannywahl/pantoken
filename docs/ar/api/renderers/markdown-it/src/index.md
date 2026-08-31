[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/markdown-it` — مكون إضافي markdown-it يعرض رموز `:icon:` كـ SVG مضمنة وقيم الألوان المستقلة (`#03893D`, `rgb(…)`, `oklch(…)`) كعينات، باستخدام مجموعة أيقونات pantoken.

يختص بنقل خطوط أنابيب `@pantoken/rehype` و `@pantoken/react-markdown` إلى markdown-it: تمشي قاعدة أساسية واحدة أطفال النص في كل رمز مضمن، وتقسمهم بناءً على أنماط الأيقونة والألوان، وتبدل المطابقات برموز `html_inline`. تحل رموز الأيقونات من خلال سلسلة — معالجات مكون إضافي `rehype` أولاً، ثم [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve) صريح، ثم مجموعة `@pantoken/icons` المدمجة — لذا تتكون مكونات إضافية لأيقونة العلامة التجارية بنفس الطريقة التي تتكون بها في أماكن أخرى.

يستخدم الترميز المنبعث نفس أسماء الفئات مثل العارضات الأخرى (`pantoken-icon`، `pantoken-color-swatch`)، لذا فإن تحميل `@pantoken/components` يصنعه. قم بلف HTML المعروض في حاوية `.pantoken-prose` (انظر [PROSE\_CLASS](variables/PROSE_CLASS.md)) لالتقاط طبقة النثر أيضاً.

## Example

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## Interfaces

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## Variables

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## Functions

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## References

### default

إعادة تسمية وإعادة تصدير [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
