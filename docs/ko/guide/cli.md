# pantoken CLI

`@pantoken/cli`는 토큰 소스를 대상 저장소에 작성하는 `pantoken generate <target>`를 제공합니다.
런타임 종속성 대신 생성된 코드가 필요한 플랫폼(네이티브 앱, CMS 테마, 정적 사이트 생성기 등)에 사용하세요.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## 대상

| 대상        | 출력                                                                          |
| ----------- | ----------------------------------------------------------------------------- |
| `swift`     | `Sources/<name>` 아래의 Swift 소스와 `Package.swift` SwiftPM 매니페스트 스텁. |
| `android`   | Android XML 리소스 파일.                                                      |
| `compose`   | Jetpack Compose Kotlin 파일.                                                  |
| `flutter`   | Flutter Dart 파일.                                                            |
| `rust`      | egui용 `tokens.rs`(기본) 또는 iced용 (`--format iced`).                       |
| `wordpress` | 블록 테마 `theme.json`.                                                       |
| `vanilla`   | Vanilla Forums용 `variables.json`.                                            |
| `drupal`    | Drupal 테마 에셋.                                                             |
| `jekyll`    | Jekyll 사이트 데이터.                                                         |
| `hugo`      | Hugo 사이트 데이터.                                                           |
| `swatches`  | 색상 스와치 — `ase`(기본), `gpl`, `sketch`, 또는 `svg`을 `--format`를 통해.   |
| `icon-font` | 아이콘 웹 폰트(TTF, WOFF2), 해당 CSS 및 코드포인트 맵.                        |
| `pendo`     | Pendo 가이드를 위한 Instructure 스타일의 `global.css`.                        |

## 공통 플래그

- `--out <dir>` — 작성할 위치(기본값 `./pantoken-out`).
- `--theme <name>` — `rebrand`(기본), `canvas` 또는 `canvasHighContrast`.
- `--icons a,b,c` — 해당 대상이 지원하는 경우 네이티브 에셋으로 내보낼 아이콘 이름.
- `--class <Name>` — 대상이 필요로 하는 생성된 타입 또는 패키지 이름.
- `--format <fmt>` — `swatches` 및 `rust`에 대한 출력 형식.

## 예제

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

몇몇 대상은 평문 함수도 노출하므로 CLI 대신 자체 빌드에서 호출할 수 있습니다. 각 플랫폼 패키지의 [API reference](/api/)를 참조하세요.
