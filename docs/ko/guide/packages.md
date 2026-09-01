# 패키지 맵

pantoken은 버킷으로 그룹화된 작고 단일 목적의 패키지들로 구성된 모노레포입니다. 작업에 맞는 패키지를 설치하거나 통합된 `pantoken` 패키지를 설치하고 하위 경로에서 가져오세요(예: `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## 코어

공유 모델과 다른 모든 것이 빌드되는 변환기입니다.

| Package                                                 | What it does                                                                                 |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | 의존성이 없는 TypeScript 타입들: `Token` 형태와 플러그인 계약.                               |
| [`@pantoken/core`](/api/packages/core/src/)             | 업스트림 토큰과 아이콘을 정규 IR로 해석하고 CSS를 렌더링합니다.                              |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | 테마별로 벤더된 정적 JSON 형태의 해결된 IR과 원본 Tokens Studio 소스.                        |
| [`@pantoken/utils`](/api/packages/utils/src/)           | 토큰 리졸버, 참조 정규식, 케이스 및 색상 헬퍼, 드리프트 검사, 토큰→유틸리티 클래스 발생기들. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | `definePlugin`로 pantoken 플러그인을 빌드하고 합성합니다.                                    |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — 네이티브 및 플랫폼 소스 배출기.                               |

## 포맷

토큰을 파일 형식으로 변환합니다.

| Package                                                | Output                                                                                                                                                                                          |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-타입 CSS와 `light-dark()` 및 데이터 URI 아이콘.                                                                                                                                     |
| [`@pantoken/scss`](/api/formats/scss/src/)             | 단일 모드로 해석된 SCSS 변수들.                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Less 변수들.                                                                                                                                                                                    |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus 변수들.                                                                                                                                                                                  |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) 문서.                                                                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | JavaScript 및 JSON으로서의 IR (코어 섹션에도 나열됨).                                                                                                                                           |
| [`@pantoken/icons`](/api/formats/icons/src/)           | 아이콘 토큰에 대한 인체공학적 뷰.                                                                                                                                                               |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | 아이콘 웹 폰트(TTF, WOFF2) 및 해당 CSS.                                                                                                                                                         |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI 스타일의 CSS 컴포넌트 라이브러리(버튼, 알림, 테이블 등)와 포커스 링, 프로즈 스타일, 교차 유틸리티, 브랜드 폰트를 포함한 베이스 리셋. 자세한 내용은 [Components](/guide/components) 참고. |

## 렌더러

프레임워크 및 도구 통합.

| Package                                                                                                                                          | For                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React 훅, `<Icon>` 및 토큰 제공자.                         |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | 각 프레임워크에 연결된 웹 컴포넌트.                        |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet에 친화적인 토큰 객체(CSS 변수 없음).            |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` 및 스타일드 프리미티브, 프레임워크 비종속. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Astro 사이트용 토큰 설정.                                  |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | 마크다운에서의 아이콘 토큰 및 색상 스와치.                 |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | 아이콘 코드와 색상 스와치를 위한 markdown-it 플러그인.     |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | styled-components 및 Emotion용 타입 안전 테마.             |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI 테마.                                          |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Bootstrap 및 shadcn/ui용 CSS-변수 브리지.                  |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Foundation용 Sass 설정 오버라이드 및 CSS 오버레이.         |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus 및 VitePress 테마.                              |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` 테마(색상 + 배경).                    |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook 테마.                                            |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Pendo 가이드용 Instructure 스타일의 글로벌 CSS.            |

## 번들러

빌드 도구 통합.

| Package                                             | For                                              |
| --------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | 가상 모듈과 CSS 인젝션을 제공하는 Vite 플러그인. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | Next.js용 `withPantoken` `transpilePackages`.    |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | webpack 플러그인.                                |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                            |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind 프리셋.                                 |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS 프리셋.                                |

## 플랫폼

CLI 또는 자체 API로 배출되는 네이티브 및 사이트 생성기 대상.

| Package                                                                                        | Output                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift 소스와 SwiftPM 매니페스트 스텁.    |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML 리소스.                      |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | egui 또는 iced용 Rust 상수들.            |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress 블록-테마 `theme.json`.        |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal 테마 에셋.                        |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo 및 Jekyll 사이트 데이터.            |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | HTML 이메일에 적합한 인라인 친화적 값들. |

## 디자인

디자인 도구용.

| Package                                           | Output                                                      |
| ------------------------------------------------- | ----------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables 페이로드.                                   |
| [`@pantoken/swatches`](/api/design/swatches/src/) | 색상 스와치(ASE, GPL, Sketch) 및 보기 가능한 SVG 견본 시트. |

## 플러그인

토큰 또는 CSS 출력을 확장하는 선택적 변환기들. [Plugins](/guide/plugins) 참고.

| Package                                                                               | What it adds                                                   |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | `--instui-stacking-*` 토큰으로 명명된 z-index 깊이들.          |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` 레이아웃 디버깅 아웃라인.                 |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | simple-icons의 브랜드 아이콘들.                                |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure 제품 로고를 SVG, 데이터 URI, 이미지 토큰으로 제공. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | 사용되지 않는 커스텀 프로퍼티를 제거하는 PostCSS 플러그인.     |

## 도구

모노레포 자체의 빌드, 문서 및 데모 인프라. 대부분 내부용이지만 일부는 독립적으로 패키징되어 배포됩니다.

| Package                                            | What it does                                                                                                                                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | 통합된 `pantoken` 패키지 배럴과 그 종속성으로부터 `exports`을 생성합니다.                                                                                                     |
| `@pantoken/validate-generated`                     | 드리프트 게이트: 생성된 모든 스타일시트가 토큰 IR에 대해 해석되는지 검사합니다.                                                                                               |
| [`@pantoken/demo`](/api/tools/demo/src/)           | 자체 호스팅 라이브 데모 실행기: `@demo` 스펙을 iframe으로 해석하고 동일 출처의 베어 HTML/CSS/JS를 토큰 테마로 렌더링합니다.                                                   |
| `@cssdoc/core` (external)                          | 일반적인 CSS 문서 추출기(TSDoc, CSS용): 문서 주석과 CSS AST를 파싱하여 문서가 CSS API 레퍼런스로 출력하는 모델로 변환합니다. 별도 저장소에 있으며 링크 의존성으로 소비됩니다. |

`@pantoken/validate-generated`는 한 번만 실행되는 스크립트(`pnpm run ready`에 의해 호출)라 API 페이지가 없고, 다른 항목들은 있습니다.

## AI

사용자용 AI 설정 자산. 이들은 pantoken을 사용하는 프로젝트용이며 pantoken 자체 개발용이 아닙니다.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) 는 `AGENTS.md`, `llms.txt` 및
  어시스턴트/에디터 규칙(Cursor, Copilot, Windsurf, Claude Code)을 소비자 리포지토리에 설치합니다.

## 개발 플러그인

도구 제작을 위해 작성한 플러그인들로 호스트별로 그룹화되어 있으며 독립적이고 퍼블리셔블합니다.

| Package                                                                                  | Plugs into                                                                     |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: `@demo <provider>:<ref>` 블록 태그를 임베디드 데모 펜스로 변환합니다. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: 업스트림 워크스페이스 패키지(및 의존자)를 소스 변경 시 재빌드합니다.     |
