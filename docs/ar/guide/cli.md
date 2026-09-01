# واجهة سطر أوامر pantoken

`@pantoken/cli` يوفر `pantoken generate <target>`، الذي يكتب مصدر الرموز إلى مستودع هدف.
استخدمه عندما يحتاج النظام الأساسي إلى رمز مولَّد بدلاً من اعتماد وقت التشغيل — تطبيقات أصلية،
قوالب نظم إدارة المحتوى، ومنشئات المواقع الثابتة.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## الأهداف

| الهدف       | المخرجات                                                                          |
| ----------- | --------------------------------------------------------------------------------- |
| `swift`     | مصدر Swift تحت `Sources/<name>` بالإضافة إلى نموذج تهيئة SwiftPM `Package.swift`. |
| `android`   | ملفات موارد Android بصيغة XML.                                                    |
| `compose`   | ملف Kotlin لـ Jetpack Compose.                                                    |
| `flutter`   | ملف Dart لـ Flutter.                                                              |
| `rust`      | `tokens.rs` لـ egui (الافتراضي) أو iced (`--format iced`).                        |
| `wordpress` | `theme.json` لكتلة القالب (block-theme).                                          |
| `vanilla`   | `variables.json` لمنتديات Vanilla.                                                |
| `drupal`    | أصول قالب Drupal.                                                                 |
| `jekyll`    | بيانات موقع Jekyll.                                                               |
| `hugo`      | بيانات موقع Hugo.                                                                 |
| `swatches`  | عينات ألوان — `ase` (الافتراضي)، `gpl`، `sketch`، أو `svg` عبر `--format`.        |
| `icon-font` | خط أيقونات ويب (TTF, WOFF2)، ملف CSS خاص به، وخريطة نقاط الشيفرة (codepoints).    |
| `pendo`     | `global.css` المصممة على نمط Instructure لمرشدات Pendo.                           |

## الوسيطات الشائعة

- `--out <dir>` — أين يُكتب (الافتراضي `./pantoken-out`).
- `--theme <name>` — `rebrand` (الافتراضي)، `canvas`، أو `canvasHighContrast`.
- `--icons a,b,c` — أسماء الأيقونات التي تُصدر كأصول أصلية، للأهداف التي تدعمها.
- `--class <Name>` — النوع أو اسم الحزمة المولَّد، للأهداف التي تحتاجه.
- `--format <fmt>` — صيغة الإخراج، لـ `swatches` و `rust`.

## أمثلة

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

تعرض عدة أهداف أيضاً دالة عادية، بحيث يمكنك استدعاؤها من نظام البناء الخاص بك بدلاً من
واجهة سطر الأوامر. راجع [مرجع الـ API](/api/) لكل حزمة منصة.
