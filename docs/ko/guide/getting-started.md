# 시작하기

Pantoken은 [Instructure UI](https://instructure.design) 디자인 토큰과 아이콘을 가져와 한 번에 해석한 뒤, 그 하나의 모델을 여러 플랫폼용 패키지로 재구성합니다: 일반 스타일시트, SCSS와 Less, React와 Vue와 Svelte, Tailwind와 Panda, 네이티브 Swift와 Kotlin, WordPress와 Drupal, Figma 등.

작업에 맞는 가장 작은 패키지를 설치하면 됩니다. 모든 것은 통합 `pantoken` 패키지로도 재내보내지므로, 거기서 시작해 나중에 좁혀갈 수 있습니다.

## 스타터 프로젝트 스캐폴딩

Pantoken을 빠르게 시도하는 가장 쉬운 방법: 이미 설치되고 연결된 스타터 프로젝트를 스캐폴딩하는 것입니다.

```sh
npx create-pantoken-app
```

플랫폼: `components` (일반 HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `--dir <path>` 및 프로그래매틱 사용법은 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)를 참고하세요.

AI 코딩 에이전트를 사용 중인가요? 설치가 필요 없습니다 — 해당 스킬을 직접 가리키면 됩니다:

```prompt
create.pantoken.app/SKILL.md를 가져와 그 지침을 따라 이 프로젝트에 pantoken을 설정하세요.
```

레포에 pantoken의 에이전트 규칙을 영구적으로 연결하려면 (AGENTS.md, 편집기 규칙, 이 스킬의 로컬 복사본), 대신 `npx @pantoken/ai init`를 실행하세요.

## 토큰 모델

토큰은 `--instui-<group>-<name>` 같은 이름의 CSS 커스텀 속성입니다. 예를 들어 `--instui-color-background-brand` 또는 `--instui-spacing-space-md`처럼 사용합니다. 세 가지 테마가 제공됩니다: 기본인 `rebrand` (라이트와 다크가 다른 경우 `light-dark()` 포함), `canvas`, 그리고 `canvasHighContrast`. 아이콘은 Lucide와 Instructure의 커스텀 글리프에서 파생된 `<image>` 토큰(`--instui-icon-<name>`)입니다.

## 웹 앱 스타일링

스타일시트를 설치하고 한 번만 임포트하세요. 모든 `--instui-*` 속성을 정의하므로 자체 CSS에서 바로 참조할 수 있습니다.

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

## 어디서나 아이콘 사용

웹 컴포넌트는 프레임워크에 관계없이 작동하며 포팅이 필요 없습니다.

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

아이콘은 CSS 커스텀 속성(`--instui-icon-<name>`)입니다. 스타일시트를 한 번 로드하고 어떤 아이콘이든 `mask-image` 또는 `background-image`로 참조하세요 — 아이콘별로 임포트할 필요가 없습니다.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### 자바스크립트 — 단일 아이콘 vs 전체 세트

`@pantoken/icons`는 두 개의 명명된 내보내기를 제공합니다. 전체 배열을 반복하지 않고 한 아이콘만 가져오려면 `iconsByName`을 사용하세요:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

픽커를 만들기 위해 전체 세트가 필요할 때는 `icons`을 사용하세요:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

두 내보내기 모두 모듈 초기화 시 전체 IR을 로드합니다 — 이 수준에서는 아이콘별 트리-쉐이킹이 없습니다. 경량의 CSS 전용 로드를 원하면 [CDN 픽커](/guide/cdn-picker)를 사용해 필요한 아이콘만 결합한 URL을 생성하세요.

## 네이티브 플랫폼용 생성

CLI는 토큰 소스를 대상 레포에 씁니다. 실행기 외에 별도 설치가 필요 없습니다:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

모든 대상은 [pantoken CLI](/guide/cli)를 참고하세요.

## VS Code 작성 힌트

`@pantoken/pantoken`는 이제 VS Code 커스텀-데이터 파일을 제공하므로, 파생 프로젝트는 pantoken 전용 확장을 설치하지 않아도 HTML/CSS에서 클래스와 토큰 자동완성을 받을 수 있습니다.

1. 통합 패키지를 설치하세요:

```sh
npm i @pantoken/pantoken
```

1. 소비자 워크스페이스에서 제공된 custom-data JSON을 VS Code에 가리키세요:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. 새 데이터를 적용하려면 VS Code를 다시 로드(또는 "Developer: Reload Window" 실행)하세요.

이렇게 하면 `instui-*` 클래스 토큰(및 `-modifier` 클래스 토큰)과 `--instui-*` 커스텀 속성에 대한 제안이 활성화됩니다.

## 다음은 어디로

- [패키지 맵](/api/) — 작업별로 어떤 패키지를 사용해야 하는지.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 소비자 레포에 에이전트 자산과 규칙을 설치합니다.
- [아키텍처](/guide/architecture) — 토큰 모델, 코어, 출력이 어떻게 맞물리는지.
- [API 레퍼런스](/api/) — 소스에서 생성된 모든 내보낸 심볼.
