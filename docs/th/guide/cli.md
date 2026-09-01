# อินเทอร์เฟซบรรทัดคำสั่ง pantoken

`@pantoken/cli` ให้บริการ `pantoken generate <target>` ซึ่งเขียนซอร์สโทเค็นลงในรีโปเป้าหมาย
ใช้เมื่อต้องการโค้ดที่สร้างขึ้นแทนการพึ่งพารันไทม์ — แอปเนทีฟ,
ธีม CMS และตัวสร้างไซต์แบบสแตติก

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## เป้าหมาย

| Target      | Output                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | โค้ด Swift ภายใต้ `Sources/<name>` พร้อมสตับ manifest SwiftPM แบบ `Package.swift`. |
| `android`   | ไฟล์ทรัพยากร XML ของ Android.                                                      |
| `compose`   | ไฟล์ Kotlin สำหรับ Jetpack Compose.                                                |
| `flutter`   | ไฟล์ Dart สำหรับ Flutter.                                                          |
| `rust`      | `tokens.rs` สำหรับ egui (ค่าปริยาย) หรือ iced (`--format iced`).                   |
| `wordpress` | `theme.json` แบบบล็อกธีม.                                                          |
| `vanilla`   | `variables.json` ของ Vanilla Forums.                                               |
| `drupal`    | แอสเซ็ตธีมของ Drupal.                                                              |
| `jekyll`    | ข้อมูลไซต์สำหรับ Jekyll.                                                           |
| `hugo`      | ข้อมูลไซต์สำหรับ Hugo.                                                             |
| `swatches`  | ชุดสวอชสี — `ase` (ค่าปริยาย), `gpl`, `sketch`, หรือ `svg` ผ่าน `--format`.        |
| `icon-font` | ฟอนต์ไอคอนเว็บ (TTF, WOFF2), ไฟล์ CSS ของมัน และแผนที่โค้ดพอยน์ทส์.                |
| `pendo`     | `global.css` ในสไตล์ของ Instructure สำหรับคำแนะนำ Pendo.                           |

## ออปชันทั่วไป

- `--out <dir>` — ที่จะเขียนผลลัพธ์ (ค่าปริยาย `./pantoken-out`).
- `--theme <name>` — `rebrand` (ค่าปริยาย), `canvas`, หรือ `canvasHighContrast`.
- `--icons a,b,c` — ชื่อไอคอนที่จะส่งออกเป็นแอสเซ็ตเนทีฟ สำหรับเป้าหมายที่รองรับ.
- `--class <Name>` — ประเภทหรือชื่อแพ็กเกจที่สร้างขึ้น สำหรับเป้าหมายที่ต้องการ.
- `--format <fmt>` — รูปแบบเอาต์พุต สำหรัับ `swatches` และ `rust`.

## ตัวอย่าง

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

หลายเป้าหมายยังมีฟังก์ชันปกติให้เรียกใช้งานได้ ดังนั้นจึงสามารถเรียกจากโปรเซส build ของตัวเองแทน
การใช้ CLI ดู [API reference](/api/) สำหรับแต่ละแพ็กเกจแพลตฟอร์ม.
