# ממשק שורת הפקודה של pantoken

`@pantoken/cli` מספק `pantoken generate <target>`, שמייצר את מקור הטוקנים לתוך מאגר היעד.
להשתמש בו כאשר פלטפורמה זקוקה לקוד שנוצר במקום לתלות בזמן ריצה — אפליקציות נייטיב,
ערכות נושא ל-CMS, וגנרטורי אתרי סטטיים.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## יעדים

| Target      | Output                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `swift`     | מקור Swift תחת `Sources/<name>` בנוסף ל-stub של מטה-פרויקט SwiftPM `Package.swift`. |
| `android`   | קבצי משאבי XML לאנדרואיד.                                                           |
| `compose`   | קובץ Kotlin ל-Jetpack Compose.                                                      |
| `flutter`   | קובץ Dart ל-Flutter.                                                                |
| `rust`      | `tokens.rs` עבור egui (ברירת מחדל) או iced (`--format iced`).                       |
| `wordpress` | בלוק-תבנית `theme.json`.                                                            |
| `vanilla`   | `variables.json` ל-Vanilla Forums.                                                  |
| `drupal`    | נכסי נושא ל-Drupal.                                                                 |
| `jekyll`    | נתוני אתר ל-Jekyll.                                                                 |
| `hugo`      | נתוני אתר ל-Hugo.                                                                   |
| `swatches`  | דגימות צבע — `ase` (ברירת מחדל), `gpl`, `sketch`, או `svg` דרך `--format`.          |
| `icon-font` | גופן ווב לאייקונים (TTF, WOFF2), ה-CSS שלו ומפת codepoints.                         |
| `pendo`     | `global.css` בסגנון Instructure עבור מדריכי Pendo.                                  |

## דגלים נפוצים

- `--out <dir>` — היכן לכתוב (ברירת מחדל `./pantoken-out`).
- `--theme <name>` — `rebrand` (ברירת מחדל), `canvas`, או `canvasHighContrast`.
- `--icons a,b,c` — שמות אייקונים לפלט כהנכסים נייטיב, עבור היעדים שתומכים בכך.
- `--class <Name>` — סוג או שם חבילה שנוצר, עבור יעדים שזקוקים לכך.
- `--format <fmt>` — פורמט הפלט, עבור `swatches` ו-`rust`.

## דוגמאות

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

כמה יעדים גם חושפים פונקציה רגילה, כך שניתן לקרוא להם מבנייה משלך במקום
לעשות זאת דרך ה-CLI. ראו את [מראי ה-API](/api/) עבור כל חבילת פלטפורמה.
