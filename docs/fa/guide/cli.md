# رابط خط فرمان pantoken

`@pantoken/cli` فراهم می‌کند `pantoken generate <target>`، که منبع توکن را در یک مخزن هدف می‌نویسد.  
هنگامی که یک پلتفرم به کد تولیدشده نیاز دارد به‌جای وابستگی زمان‌اجرا — اپ‌های بومی، پوسته‌های CMS و تولیدکننده‌های سایت‌های ایستا — از آن استفاده کنید.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## اهداف

| هدف         | خروجی                                                                              |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | کد Swift زیر `Sources/<name>` به‌علاوه یک شابلون manifest SwiftPM `Package.swift`. |
| `android`   | فایل‌های منابع XML برای اندروید.                                                   |
| `compose`   | یک فایل Kotlin برای Jetpack Compose.                                               |
| `flutter`   | یک فایل Dart برای Flutter.                                                         |
| `rust`      | یک `tokens.rs` برای egui (پیش‌فرض) یا iced (`--format iced`).                      |
| `wordpress` | یک `theme.json` برای block-theme.                                                  |
| `vanilla`   | یک `variables.json` برای Vanilla Forums.                                           |
| `drupal`    | دارایی‌های تم Drupal.                                                              |
| `jekyll`    | داده‌های سایت Jekyll.                                                              |
| `hugo`      | داده‌های سایت Hugo.                                                                |
| `swatches`  | نمونه‌های رنگ — `ase` (پیش‌فرض)، `gpl`، `sketch`، یا `svg` از طریق `--format`.     |
| `icon-font` | یک قلم وب آیکون (TTF, WOFF2)، CSS آن، و یک نقشه codepoints.                        |
| `pendo`     | `global.css` با سبک Instructure برای راهنماهای Pendo.                              |

## فلگ‌های معمول

- `--out <dir>` — محل نوشتن (پیش‌فرض `./pantoken-out`).
- `--theme <name>` — `rebrand` (پیش‌فرض)، `canvas`، یا `canvasHighContrast`.
- `--icons a,b,c` — نام‌های آیکون برای منتشر شدن به‌عنوان دارایی‌های بومی، برای اهدافی که از آن پشتیبانی می‌کنند.
- `--class <Name>` — نوع یا نام پکیج تولیدشده، برای اهدافی که به آن نیاز دارند.
- `--format <fmt>` — فرمت خروجی، برای `swatches` و `rust`.

## مثال‌ها

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

چندین هدف همچنین یک تابع ساده را نیز ارائه می‌دهند، بنابراین می‌توانید آن‌ها را از درون ساخت خود فراخوانی کنید به‌جای CLI. برای هر بسته پلتفرم به [مستندات API](/api/) مراجعه کنید.
