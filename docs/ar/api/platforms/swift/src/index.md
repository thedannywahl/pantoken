[pantoken](../../../index.md) / swift

# swift

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/swift` — انبعاث رموز تصميم Instructure كـ Swift عبر Style Dictionary.

هذا هو إثبات pantoken الأصلي: يقوم بتسطيح IR إلى قيم خرسانية ذات وضع واحد
(`@pantoken/core` من `toStyleDictionary`)، ويحتفظ بالرموز المكتوبة بشكل أصلي (الألوان، الأبعاد،
الأرقام)، ويسلمها إلى `@pantoken/sd-config`. يؤدي استبدال `platform` بـ `flutter`/`compose`
إلى إعادة استخدام نفس المسار.

## Interfaces

- [GenerateSwiftOptions](interfaces/GenerateSwiftOptions.md)

## Functions

- [toSwift](functions/toSwift.md)
- [generateSwift](functions/generateSwift.md)

## References

### default

إعادة تسمية وإعادة تصدير [generateSwift](functions/generateSwift.md)
