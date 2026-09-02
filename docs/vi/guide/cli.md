# CLI của pantoken

`@pantoken/cli` cung cấp `pantoken generate <target>`, ghi nguồn token vào một kho mục tiêu.
Sử dụng khi nền tảng cần mã được sinh thay vì phụ thuộc lúc chạy — ứng dụng gốc,
giao diện CMS và trình tạo site tĩnh.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Mục tiêu

| Target      | Output                                                                               |
| ----------- | ------------------------------------------------------------------------------------ |
| `swift`     | Mã nguồn Swift dưới `Sources/<name>` cùng một stub manifest SwiftPM `Package.swift`. |
| `android`   | Các tệp tài nguyên XML cho Android.                                                  |
| `compose`   | Một tệp Kotlin cho Jetpack Compose.                                                  |
| `flutter`   | Một tệp Dart cho Flutter.                                                            |
| `rust`      | Một `tokens.rs` cho egui (mặc định) hoặc iced (`--format iced`).                     |
| `wordpress` | Một block-theme `theme.json`.                                                        |
| `vanilla`   | Một `variables.json` cho Vanilla Forums.                                             |
| `drupal`    | Tài sản theme cho Drupal.                                                            |
| `jekyll`    | Dữ liệu site Jekyll.                                                                 |
| `hugo`      | Dữ liệu site Hugo.                                                                   |
| `swatches`  | Bảng màu — `ase` (mặc định), `gpl`, `sketch`, hoặc `svg` qua `--format`.             |
| `icon-font` | Một font biểu tượng web (TTF, WOFF2), CSS của nó, và bản đồ codepoints.              |
| `pendo`     | `global.css` theo phong cách Instructure cho hướng dẫn Pendo.                        |

## Cờ chung

- `--out <dir>` — nơi ghi (mặc định `./pantoken-out`).
- `--theme <name>` — `rebrand` (mặc định), `canvas`, hoặc `canvasHighContrast`.
- `--icons a,b,c` — tên icon để xuất thành tài sản gốc, cho các mục tiêu hỗ trợ.
- `--class <Name>` — kiểu hoặc tên gói được sinh, cho các mục tiêu cần.
- `--format <fmt>` — định dạng đầu ra, cho `swatches` và `rust`.

## Ví dụ

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Một số mục tiêu cũng cung cấp một hàm thuần túy, nên có thể gọi từ quá trình build của riêng bạn thay vì
dùng CLI. Xem [API reference](/api/) cho từng gói nền tảng.
