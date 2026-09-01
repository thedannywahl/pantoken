[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/android` — يصدر رموز تصميم Instructure كملف XML لموارد Android.

يقوم بتسطيح IR إلى قيم ملموسة بنمط واحد (`@pantoken/core`'s `toStyleDictionary`), ثم
يصدر `res/values/colors.xml` (رموز الألوان) و `res/values/dimens.xml` (رموز الأبعاد) عبر
`@pantoken/sd-config`. يقوم Style Dictionary بتطبيق تحويلات Android (`#aarrggbb`, `dp`/`sp`).

## واجهات

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## الدوال

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## المراجع

### default

يعيد تسمية وإعادة تصدير [generateAndroid](functions/generateAndroid.md)
