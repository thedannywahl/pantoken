[pantoken](../../../index.md) / next

# next

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/next` — محول إعدادات Next.js.

يشحن Instructure UI حزم ESM التي يجب على Next نقلها (`transpilePackages`)، المشكلة #1 عند تشغيل InstUI على Next. `withPantoken` يدمج حزم InstUI في تلك القائمة. لف `next.config` الخاص بك، ثم استورد `@pantoken/css` في تخطيطك الجذر للرموز.

## Interfaces

- [NextConfigLike](interfaces/NextConfigLike.md)
- [WithPantokenOptions](interfaces/WithPantokenOptions.md)

## Variables

- [INSTUI\_TRANSPILE\_PACKAGES](variables/INSTUI_TRANSPILE_PACKAGES.md)

## Functions

- [withPantoken](functions/withPantoken.md)

## References

### default

إعادة تسمية وإعادة تصدير [withPantoken](functions/withPantoken.md)
