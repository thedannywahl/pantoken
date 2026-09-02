# pantoken CLI

`@pantoken/cli`, token kaynağını hedef bir depoya yazan `pantoken generate <target>` sağlar.
Bir platform çalışma zamanı bağımlılığı yerine oluşturulmuş kod gerektirdiğinde — yerel uygulamalar,
CMS temaları ve statik site üreticileri gibi — ona başvurun.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Hedefler

| Hedef       | Çıktı                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------- |
| `swift`     | `Sources/<name>` altında Swift kaynağı artı bir `Package.swift` SwiftPM manifest taslağı. |
| `android`   | Android XML kaynak dosyaları.                                                             |
| `compose`   | Bir Jetpack Compose Kotlin dosyası.                                                       |
| `flutter`   | Bir Flutter Dart dosyası.                                                                 |
| `rust`      | egui için bir `tokens.rs` (varsayılan) veya iced için (`--format iced`).                  |
| `wordpress` | Bir block-theme `theme.json`.                                                             |
| `vanilla`   | Bir Vanilla Forums `variables.json`.                                                      |
| `drupal`    | Drupal tema varlıkları.                                                                   |
| `jekyll`    | Jekyll site verisi.                                                                       |
| `hugo`      | Hugo site verisi.                                                                         |
| `swatches`  | Renk paletleri — `ase` (varsayılan), `gpl`, `sketch` veya `svg` aracılığıyla `--format`.  |
| `icon-font` | Bir simge web yazı tipi (TTF, WOFF2), onun CSS'i ve bir kod noktaları haritası.           |
| `pendo`     | Pendo rehberleri için Instructure tarzında `global.css`.                                  |

## Yaygın bayraklar

- `--out <dir>` — nereye yazılacağı (varsayılan `./pantoken-out`).
- `--theme <name>` — `rebrand` (varsayılan), `canvas` veya `canvasHighContrast`.
- `--icons a,b,c` — hedeflerin desteklediği yerlere yerel varlık olarak aktarılacak simge adları.
- `--class <Name>` — oluşturulan tür veya paket adı; bunu gerektiren hedefler için.
- `--format <fmt>` — çıktı formatı; `swatches` ve `rust` için.

## Örnekler

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Birçok hedef ayrıca düz bir işlev de sunar, böylece bunları CLI yerine kendi yapınızdan çağırabilirsiniz. Her platform paketine ilişkin [API reference](/api/) bölümüne bakın.
