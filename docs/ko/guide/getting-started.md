# 시작하기

Pantoken은 [Instructure UI](https://instructure.design)의 디자인 토큰과 아이콘을 한 번에 해석하고, 그 하나의 모델을 여러 플랫폼용 패키지로 재구성합니다: 일반 스타일시트, SCSS와 Less, React·Vue·Svelte, Tailwind와 Panda, 네이티브 Swift와 Kotlin, WordPress와 Drupal, Figma 등 다수.

작업에 맞는 가장 작은 패키지를 설치합니다. 모든 패키지는 통합된 `pantoken` 패키지로도 재내보내지므로, 우선 거기서 시작해 나중에 좁혀갈 수 있습니다.

## 스타터 프로젝트 스캐폴딩

pantoken을 가장 빠르게 시도하는 방법: 이미 설치되어 연동된 상태로 스타터 프로젝트를 스캐폴드하세요.

```sh
npx create-pantoken-app
```

플랫폼: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `--dir <path>` 및 프로그래매틱 사용법은 [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold)를 참조하세요.

AI 코딩 에이전트를 사용 중인가요? 설치가 필요 없습니다 — 스킬을 직접 가리키면 됩니다:

```prompt
create.pantoken.app/SKILL.md을 가져와 그 지침에 따라 이 프로젝트에 pantoken을 설정하세요.
```

만약 pantoken의 에이전트 규칙을 리포지토리에 영구적으로 연결하려면(AGENTS.md, 에디터 규칙, 이 스킬의 로컬 복사본), 대신 `npx @pantoken/ai init`를 실행하세요.

## 토큰 모델

토큰은 `--instui-<group>-<name>` 같은 이름의 CSS 커스텀 프로퍼티입니다. 예를 들어 `--instui-color-background-brand` 또는 `--instui-spacing-space-md`가 있습니다. 세 가지 테마가 제공됩니다: 기본값인 `rebrand` (`light-dark()`에서 라이트/다크가 다름), `canvas`, 그리고 `canvasHighContrast`. 아이콘은 Lucide와 Instructure의 커스텀 글리프에서 파생된 `<image>` 토큰(`--instui-icon-<name>`)입니다.

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

## 어디서나 아이콘 사용

웹 컴포넌트는 어떤 프레임워크에서도 동작하며 포팅이 필요 없습니다.

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

`@pantoken/icons`는 두 개의 명명된 익스포트를 제공합니다. 전체 배열을 순회하지 않고 단일 아이콘을 가져오려면 `iconsByName`을 사용하세요:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

픽커를 빌드하는 등 전체 세트가 필요할 때는 `icons`을 사용하세요:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

두 익스포트 모두 모듈 초기화 시 전체 IR을 로드합니다 — 이 수준에서는 아이콘별 트리쉐이킹이 없습니다. 가벼운 CSS 전용 로딩이 필요하면 [CDN 픽커](/guide/cdn-picker)를 사용해 필요한 아이콘만 결합한 URL을 생성하세요.

## 네이티브 플랫폼용 생성

CLI는 토큰 소스를 타깃 리포지토리에 씁니다. 러너 외에 추가 설치는 필요 없습니다:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

모든 타깃은 [the pantoken CLI](/guide/cli)를 참조하세요.

## VS Code 작성 팁

`@pantoken/pantoken`는 이제 VS Code 커스텀-데이터 파일을 제공하므로, 다운스트림 프로젝트는 pantoken 전용 확장을 설치하지 않고도 HTML/CSS에서 클래스와 토큰 완성 기능을 얻을 수 있습니다.

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

## 다음으로 갈 곳

- [패키지 맵](/guide/packages) — 작업별로 어떤 패키지를 선택할지.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — 소비자 리포지토리에 에이전트 자산과 규칙을 설치.
- [아키텍처](/guide/architecture) — 토큰 모델, 코어, 출력물이 어떻게 맞물리는지.
- [API 레퍼런스](/api/) — 소스에서 생성된 모든 익스포트 심볼.
