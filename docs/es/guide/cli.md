# La CLI de pantoken

`@pantoken/cli` proporciona `pantoken generate <target>`, que escribe la fuente de tokens en un repositorio destino.
Úsalo cuando una plataforma necesite código generado en lugar de una dependencia en tiempo de ejecución: aplicaciones nativas,
temas de CMS y generadores de sitios estáticos.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Destinos

| Destino     | Salida                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------- |
| `swift`     | Código fuente Swift bajo `Sources/<name>` además de un stub de manifiesto SwiftPM `Package.swift`. |
| `android`   | Archivos de recursos XML de Android.                                                               |
| `compose`   | Un archivo Kotlin para Jetpack Compose.                                                            |
| `flutter`   | Un archivo Dart para Flutter.                                                                      |
| `rust`      | Un `tokens.rs` para egui (por defecto) o iced (`--format iced`).                                   |
| `wordpress` | Un `theme.json` para block-theme.                                                                  |
| `vanilla`   | Un `variables.json` para Vanilla Forums.                                                           |
| `drupal`    | Assets de tema para Drupal.                                                                        |
| `jekyll`    | Datos de sitio para Jekyll.                                                                        |
| `hugo`      | Datos de sitio para Hugo.                                                                          |
| `swatches`  | Paletas de color — `ase` (por defecto), `gpl`, `sketch` o `svg` vía `--format`.                    |
| `icon-font` | Una fuente de iconos web (TTF, WOFF2), su CSS y un mapa de puntos de código.                       |
| `pendo`     | El `global.css` con estilo Instructure para guías de Pendo.                                        |

## Flags comunes

- `--out <dir>` — dónde escribir (por defecto `./pantoken-out`).
- `--theme <name>` — `rebrand` (por defecto), `canvas` o `canvasHighContrast`.
- `--icons a,b,c` — nombres de iconos para emitir como assets nativos, para destinos que los soportan.
- `--class <Name>` — el tipo generado o nombre del paquete, para destinos que lo requieran.
- `--format <fmt>` — el formato de salida, para `swatches` y `rust`.

## Ejemplos

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Varios destinos también exponen una función simple, para que puedas llamarlos desde tu propia compilación en lugar de
la CLI. Consulta la [referencia de la API](/api/) para cada paquete de plataforma.
