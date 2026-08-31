[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/react` — مساعدات React رقيقة فوق `@pantoken/web-components` و CSS الرمزة.

- `&lt;Icon&gt;` يعرض عنصر `&lt;instui-icon&gt;` المخصص (React 19 يمرر props إلى العناصر المخصصة).
- `useToken` يقرأ قيمة `--instui-*` محللة في وقت التشغيل (آمن SSR: يعيد العودة على
  الخادم).
- `&lt;TokenProvider&gt;` يسجل العناصر وهو المكان الذي يمكن لتطبيق حقن ورقة الأنماط فيه.

## Interfaces

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## Functions

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## References

### register

إعادة تصدير [register](../../angular/src/functions/register.md)

---

### registerLocalized

إعادة تصدير [registerLocalized](../../svelte/src/functions/registerLocalized.md)
