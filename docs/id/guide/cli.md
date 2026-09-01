# CLI pantoken

`@pantoken/cli` menyediakan `pantoken generate <target>`, yang menulis sumber token ke repo target.
Gunakan ketika sebuah platform memerlukan kode yang dihasilkan daripada dependensi runtime — aplikasi native,
tema CMS, dan generator situs statis.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Target

| Target      | Keluaran                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------- |
| `swift`     | Kode sumber Swift di bawah `Sources/<name>` serta stub manifest SwiftPM `Package.swift`. |
| `android`   | Berkas sumber daya XML Android.                                                          |
| `compose`   | Berkas Kotlin Jetpack Compose.                                                           |
| `flutter`   | Berkas Dart Flutter.                                                                     |
| `rust`      | Sebuah `tokens.rs` untuk egui (default) atau iced (`--format iced`).                     |
| `wordpress` | Sebuah `theme.json` tema block.                                                          |
| `vanilla`   | Sebuah `variables.json` untuk Vanilla Forums.                                            |
| `drupal`    | Aset tema Drupal.                                                                        |
| `jekyll`    | Data situs Jekyll.                                                                       |
| `hugo`      | Data situs Hugo.                                                                         |
| `swatches`  | Satuan warna — `ase` (default), `gpl`, `sketch`, atau `svg` melalui `--format`.          |
| `icon-font` | Font web ikon (TTF, WOFF2), CSS-nya, dan peta codepoints.                                |
| `pendo`     | `global.css` bergaya Instructure untuk panduan Pendo.                                    |

## Flag umum

- `--out <dir>` — lokasi penulisan (default `./pantoken-out`).
- `--theme <name>` — `rebrand` (default), `canvas`, atau `canvasHighContrast`.
- `--icons a,b,c` — nama ikon untuk dikeluarkan sebagai aset native, untuk target yang mendukungnya.
- `--class <Name>` — tipe atau nama paket yang dihasilkan, untuk target yang memerlukannya.
- `--format <fmt>` — format keluaran, untuk `swatches` dan `rust`.

## Contoh

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Beberapa target juga menyediakan fungsi biasa, sehingga Anda dapat memanggilnya dari proses build Anda sendiri alih-alih
menggunakan CLI. Lihat [referensi API](/api/) untuk setiap paket platform.
