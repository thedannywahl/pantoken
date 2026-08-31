[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/android` — إصدار رموز تصميم Instructure كـ XML موارد Android.

يقوم بتسطيح IR إلى قيم ملموسة وحيدة الوضع (`@pantoken/core`'s `toStyleDictionary`)، ثم يصدر `res/values/colors.xml` (رموز اللون) و`res/values/dimens.xml` (رموز الأبعاد) عبر `@pantoken/sd-config`. يطبق Style Dictionary تحويلات Android (`#aarrggbb`، `dp`/`sp`).

## Interfaces

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## Functions

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## References

### default

إعادة تسمية وإعادة تصدير [generateAndroid](functions/generateAndroid.md)
