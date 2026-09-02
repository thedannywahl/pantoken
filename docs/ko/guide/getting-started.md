# 시작하기

pantoken은 Instructure UI의 디자인 토큰과 아이콘을 한 번에 해석하고, 그 하나의 모델을 여러 플랫폼용 패키지로 재구성합니다: 일반 스타일시트, SCSS 및 Less, React와 Vue와 Svelte, Tailwind 및 Panda, 네이티브 Swift와 Kotlin, WordPress와 Drupal, Figma 등.

작업에 맞는 가장 작은 패키지를 설치합니다. 모든 항목은 통합된 `pantoken` 패키지로도 재수출되므로, 그곳에서 시작해 나중에 범위를 좁힐 수 있습니다.

## 스타터 프로젝트 골격 만들기

pantoken을 빠르게 사용해보는 가장 쉬운 방법: 이미 설치되어 있고 연결된 상태의 스타터 프로젝트 골격을 생성합니다.

```sh
npx create-pantoken-app react
```

플랫폼: `components` (일반 HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. 프로그램식 사용 및 `--dir <path>`에 관해서는 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)를 참고하세요.

AI 코딩 에이전트를 사용 중인가요? 설치 불필요 — 스킬을 직접 가리키면 됩니다:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, Amazon Q Developer CLI에서도 동일하게 작동합니다 — `claude`를 `gemini`, `agent`, `codex`, `copilot -p`, 또는 `q chat`로 교체하세요. pantoken의 에이전트 규칙을 리포지토리에 영구적으로 통합(AGENTS.md, 에디터 규칙, 이 스킬의 로컬 복사본)하려면 대신 `npx @pantoken/ai init`를 실행하세요.

## 토큰 모델

토큰은 `--instui-<group>-<name>` 같은 이름의 CSS 커스텀 프로퍼티입니다. 예를 들어 `--instui-color-background-brand` 또는 `--instui-spacing-space-md`가 있습니다. 세 가지 테마가 제공됩니다: 기본 테마인 `rebrand` (라이트와 다크가 다른 경우는 `light-dark()`), `canvas`, 그리고 `canvasHighContrast`. 아이콘은 Lucide와 Instructure의 커스텀 글리프에서 파생된 `<image>` 토큰(`--instui-icon-<name>`)입니다.

## 웹 앱 스타일링

스타일시트를 설치하고 한 번만 임포트하세요. 모든 `--instui-*` 프로퍼티를 정의하므로, 자체 CSS에서 바로 참조할 수 있습니다.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## 어디서나 아이콘 사용하기

웹 컴포넌트는 어떤 프레임워크에서도 포팅 없이 동작합니다.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS 토큰

아이콘은 CSS 커스텀 프로퍼티(`--instui-icon-<name>`)입니다. 스타일시트를 한 번 로드하고 어떤 아이콘이든 `mask-image` 또는 `background-image`로 참조하세요 — 아이콘별 임포트가 필요 없습니다.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — 단일 아이콘 vs 전체 세트

`@pantoken/icons`는 두 개의 명명된 내보내기를 제공합니다. 전체 배열을 반복하지 않고 하나의 아이콘만 가져오려면 `iconsByName`을 사용하세요:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

피커를 구축하는 등 전체 세트가 필요할 때는 `icons`을 사용하세요:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

두 내보내기 모두 모듈 초기화 시 전체 IR을 로드하므로 이 수준에서는 아이콘별 트리-쉐이킹이 없습니다. 경량의 CSS 전용 로드를 원하면 [CDN 피커](/guide/cdn-picker)를 사용해 필요한 아이콘만 결합한 URL을 생성하세요.

## 네이티브 플랫폼용 생성

CLI는 대상 리포지토리에 토큰 소스를 씁니다. 러너 외에 추가 설치는 필요 없습니다:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

모든 대상은 [pantoken CLI](/guide/cli)를 참조하세요.

## VS Code 작성 힌트

`@pantoken/pantoken`는 이제 VS Code 커스텀-데이터 파일을 제공하므로 downstream 프로젝트는 pantoken 전용 확장 설치 없이도 HTML/CSS에서 클래스 및 토큰 완성 기능을 얻을 수 있습니다.

1. 통합 패키지를 설치하세요:

```sh
npm i @pantoken/pantoken
```

1. 소비자 작업공간에서 제공된 custom-data JSON을 VS Code에 가리키세요:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 변경 사항을 적용하려면 VS Code를 재시작(또는 "Developer: Reload Window" 실행)하세요.

이로써 `instui-*` 클래스 토큰(및 `-modifier` 클래스 토큰)과 `--instui-*` 커스텀 프로퍼티에 대한 제안이 활성화됩니다.

## 다음은 어디인가

- [패키지 지도](/guide/packages) — 작업별로 어떤 패키지를 선택할지 안내.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 소비자 리포지토리에 에이전트 자산과 규칙 설치.
- [아키텍처](/guide/architecture) — 토큰 모델, 코어, 출력물이 어떻게 맞물리는지.
- [API 레퍼런스](/api/) — 소스에서 생성된 모든 내보내기 기호.
