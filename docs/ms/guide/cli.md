# CLI pantoken

`@pantoken/cli` menyediakan `pantoken generate <target>`, yang menulis sumber token ke repo sasaran.
Gunakan ia apabila platform memerlukan kod yang dijana dan bukannya kebergantungan runtime — aplikasi asli,
tema CMS, dan penjana laman statik.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Sasaran

| Sasaran     | Keluaran                                                                           |
| ----------- | ---------------------------------------------------------------------------------- |
| `swift`     | Sumber Swift di bawah `Sources/<name>` serta stub manifes SwiftPM `Package.swift`. |
| `android`   | Fail sumber Android XML.                                                           |
| `compose`   | Fail Kotlin Jetpack Compose.                                                       |
| `flutter`   | Fail Dart untuk Flutter.                                                           |
| `rust`      | `tokens.rs` untuk egui (lalai) atau iced (`--format iced`).                        |
| `wordpress` | Sebuah `theme.json` block-theme.                                                   |
| `vanilla`   | Sebuah `variables.json` untuk Vanilla Forums.                                      |
| `drupal`    | Aset tema Drupal.                                                                  |
| `jekyll`    | Data tapak Jekyll.                                                                 |
| `hugo`      | Data tapak Hugo.                                                                   |
| `swatches`  | Swatch warna — `ase` (lalai), `gpl`, `sketch`, atau `svg` melalui `--format`.      |
| `icon-font` | Fon web ikon (TTF, WOFF2), CSSnya, dan peta codepoints.                            |
| `pendo`     | `global.css` bergaya Instructure untuk panduan Pendo.                              |

## Bendera biasa

- `--out <dir>` — tempat untuk menulis (lalai `./pantoken-out`).
- `--theme <name>` — `rebrand` (lalai), `canvas`, atau `canvasHighContrast`.
- `--icons a,b,c` — nama ikon untuk diterbitkan sebagai aset asli, untuk sasaran yang menyokongnya.
- `--class <Name>` — jenis atau nama pakej yang dijana, untuk sasaran yang memerlukannya.
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

Beberapa sasaran juga mendedahkan fungsi biasa, jadi anda boleh memanggilnya dari binaan anda sendiri dan bukannya
menggunakan CLI. Lihat [rujukan API](/api/) untuk setiap pakej platform.
