# A CLI do pantoken

`@pantoken/cli` fornece `pantoken generate <target>`, que grava a fonte de tokens em um repositório de destino.
Use-o quando uma plataforma precisar de código gerado em vez de uma dependência em tempo de execução — aplicativos nativos,
temas de CMS e geradores de sites estáticos.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Destinos

| Target      | Output                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `swift`     | Código Swift em `Sources/<name>` mais um stub de manifesto SwiftPM `Package.swift`. |
| `android`   | Arquivos de recurso XML do Android.                                                 |
| `compose`   | Um arquivo Kotlin para Jetpack Compose.                                             |
| `flutter`   | Um arquivo Dart para Flutter.                                                       |
| `rust`      | Um `tokens.rs` para egui (padrão) ou iced (`--format iced`).                        |
| `wordpress` | Um `theme.json` de bloco de tema.                                                   |
| `vanilla`   | Um `variables.json` do Vanilla Forums.                                              |
| `drupal`    | Recursos de tema do Drupal.                                                         |
| `jekyll`    | Dados do site Jekyll.                                                               |
| `hugo`      | Dados do site Hugo.                                                                 |
| `swatches`  | Paletas de cores — `ase` (padrão), `gpl`, `sketch` ou `svg` via `--format`.         |
| `icon-font` | Uma fonte de ícones para web (TTF, WOFF2), seu CSS e um mapa de codepoints.         |
| `pendo`     | O `global.css` com estilo Instructure para guias Pendo.                             |

## Flags comuns

- `--out <dir>` — onde escrever (padrão `./pantoken-out`).
- `--theme <name>` — `rebrand` (padrão), `canvas` ou `canvasHighContrast`.
- `--icons a,b,c` — nomes de ícone para emitir como assets nativos, para destinos que os suportam.
- `--class <Name>` — o tipo ou nome do pacote gerado, para destinos que precisam disso.
- `--format <fmt>` — o formato de saída, para `swatches` e `rust`.

## Exemplos

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Vários destinos também expõem uma função simples, para que você possa chamá-los a partir do seu próprio build em vez
do CLI. Veja a [referência da API](/api/) para cada pacote de plataforma.
