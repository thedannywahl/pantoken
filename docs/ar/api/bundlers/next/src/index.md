[pantoken](../../../index.md) / next

# next

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/next` — مُكَيِّف تكوين Next.js.

ترسل Instructure UI حزم ESM التي يجب على Next تحويلها (`transpilePackages`)، وهي المشكلة الأكثر إزعاجًا عند تشغيل InstUI على Next.
يقوم `withPantoken` بدمج حزم InstUI في تلك القائمة. غلِّف `next.config`، ثم استورد `@pantoken/css` في تخطيط الجذر للحصول على الرموز.

## واجهات

- [NextConfigLike](interfaces/NextConfigLike.md)
- [WithPantokenOptions](interfaces/WithPantokenOptions.md)

## المتغيرات

- [INSTUI\_TRANSPILE\_PACKAGES](variables/INSTUI_TRANSPILE_PACKAGES.md)

## الدوال

- [withPantoken](functions/withPantoken.md)

## المراجع

### default

يعيد تسمية ويعيد تصدير [withPantoken](functions/withPantoken.md)
