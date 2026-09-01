[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/rehype` — يعرض رموز `:icon:` كـ SVG مضمن.

يقوم المكوّن الإضافي بالتنقّل عبر عقد النص في hast ويستبدل رموز `:code:` بعنصر SVG مضمن,
مع حلّ كل رمز عبر سلسلة: محللات الإضافة `rehype` أولاً، ثم أي
`resolve` صريحة، ثم مجموعة `@pantoken/icons` المضمّنة. يقوم بترحيل `rehype-instui-markdown` إلى
سجل الأيقونات المشترك.

## واجهات

- [RehypeOptions](interfaces/RehypeOptions.md)

## الدوال

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## المراجع

### default

يعيد تسمية ويُصدِّر [rehypePantokenIcons](functions/rehypePantokenIcons.md)
