# pantoken CLI

`@pantoken/cli` տալիս է `pantoken generate <target>`, որը գրում է token աղբյուրը նպատակային պահեստանոցում:
Օգտագործել այն, երբ պլատֆորմին անհրաժեշտ է գեներացված կոդ, ոչ թե runtime-կախվածություն — տեղական հավելվածներ,
CMS թեմաներ և ստատիկ կայքերի գեներատորներ։

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Նպատակներ

| Target      | Output                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `swift`     | Swift աղբյուր `Sources/<name>` տակ և `Package.swift` SwiftPM manifest նմուշ։        |
| `android`   | Android XML ռեսուրս ֆայլեր։                                                         |
| `compose`   | Jetpack Compose Kotlin ֆայլ։                                                        |
| `flutter`   | Flutter Dart ֆայլ։                                                                  |
| `rust`      | `tokens.rs`՝ egui-ի համար (առաջնային) կամ iced (`--format iced`)։                   |
| `wordpress` | Բլոկ-թեմայի `theme.json`։                                                           |
| `vanilla`   | Vanilla Forums `variables.json`։                                                    |
| `drupal`    | Drupal թեմայի նյութեր։                                                              |
| `jekyll`    | Jekyll կայքի տվյալներ։                                                              |
| `hugo`      | Hugo կայքի տվյալներ։                                                                |
| `swatches`  | Գույնի նմուշներ — `ase` (առաջնային), `gpl`, `sketch`, կամ `svg` միջոցով `--format`։ |
| `icon-font` | Նկարի վեբ-ֆոնը (TTF, WOFF2), դրա CSS և codepoints քարտեզ։                           |
| `pendo`     | Instructure-շարքի `global.css`՝ Pendo ուղեցույցների համար։                          |

## Ընդհանուր դրոշներ

- `--out <dir>` — որտեղ գրել (նախորոշված `./pantoken-out`)։
- `--theme <name>` — `rebrand` (նախորոշված), `canvas`, կամ `canvasHighContrast`։
- `--icons a,b,c` — իկոնների անուններ, որոնք պետք է արտահանվեն որպես տեղական ռեսուրսներ՝ նպատակների համար, որոնք աջակցության են տալիս դրանց։
- `--class <Name>` — գեներացված տիպի կամ փաթեթի անունը, նպատակների համար, որոնք դրա կարիքն ունեն։
- `--format <fmt>` — ելքի ֆորմատը, `swatches` և `rust` համար։

## Օրինակներ

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Մինչև մի քանիսն նպատաբեր նաև բաց են պատկերացումային ֆունկցիայի համար, որպեսզի կարողանաք կանչել դրանք ձեր սեփական build-ից CLI փոխարեն։ Տես [API reference](/api/) յուրաքանչյուր պլատֆորմ փաթեթի համար։
