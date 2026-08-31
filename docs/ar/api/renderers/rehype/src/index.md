[pantoken](../../../index.md) / rehype

# rehype

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/rehype` — عرض أكواد `:icon:` كـ SVG مضمن.

يمشي المكون الإضافي عقد نصوص hast ويستبدل رموز `:code:` بعنصر SVG مضمن،
حل كل كود من خلال سلسلة: محللات مكون إضافي `rehype` أولاً، ثم أي
`resolve` صريح، ثم مجموعة `@pantoken/icons` المدمجة. ينقل `rehype-instui-markdown` إلى
بيان الأيقونات المشترك.

## Interfaces

- [RehypeOptions](interfaces/RehypeOptions.md)

## Functions

- [rehypePantokenIcons](functions/rehypePantokenIcons.md)

## References

### default

إعادة تسمية وإعادة تصدير [rehypePantokenIcons](functions/rehypePantokenIcons.md)
