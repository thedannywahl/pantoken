[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/react` — مساعدات React خفيفة على `@pantoken/web-components` وCSS للرموز.

- `&lt;Icon&gt;` يقوم برندر عنصر مخصص `&lt;instui-icon&gt;` (React 19 يمرر props إلى العناصر المخصصة).
- `useToken` يقرأ قيمة `--instui-*` المحللة في وقت التشغيل (آمن مع SSR: يعيد القيمة الاحتياطية على
  الخادم).
- `&lt;TokenProvider&gt;` يسجل العناصر وهنا يمكن للتطبيق حقن ملف الأنماط.

## واجهات

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## الدوال

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## المراجع

### register

يعيد تصدير [register](../../angular/src/functions/register.md)

***

### registerLocalized

يعيد تصدير [registerLocalized](../../svelte/src/functions/registerLocalized.md)
