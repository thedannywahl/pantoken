# CDN 및 배포

pantoken은 모든 패키지를 npm에 게시하므로, 빌드 단계나 번들러 없이 CDN에서 토큰, 컴포넌트, 웹 컴포넌트를 바로 가져올 수 있습니다. 이 페이지는 CSS 결합 URL(대화형 빌더 포함)과 웹 컴포넌트 드롭인을 다룹니다.

## 토큰 기반

모든 pantoken 컴포넌트는 페이지의 토큰 시트에서 `--instui-*` 커스텀 속성을 읽습니다. 두 가지 변형이 제공됩니다:

- `@pantoken/css/dist/style.lean.css` — 권장되는 CDN 기반입니다. 전체 아이콘 세트를 제외한 모든 토큰을 포함하므로 gzip으로 약 23KB입니다.
- `@pantoken/css/dist/style.css` — 전체 시트로 약 1,777개의 아이콘 글리프 토큰(`--instui-icon-*`)을 포함합니다. gzip으로 약 140KB입니다. `var(--instui-icon-*)`를 통해 아이콘을 광범위하게 참조한다면 이 파일을 로드하세요.

elevation 스케일과 포커스 링 변수는 두 시트 모두에 포함되어 있어, 기반 시트만 로드해도 그림자와 포커스 링이 작동합니다.

## 컴포넌트와 아이콘 선택

[interactive CDN picker](/guide/cdn-picker)는 CSS용 jsDelivr 결합 URL과 JavaScript 패키지 스니펫을 생성합니다. 열어보고 필요한 항목을 체크한 다음 생성된 출력을 복사하세요.

- **Components 탭** — 개별 컴포넌트 스타일시트 또는 전체 `components.css` 배럴을 선택합니다. 필요하면 기본 리셋이나 spacing/color 유틸리티를 추가하세요.
- **JS 탭** — `@pantoken/interactions`용 ESM 임포트 스니펫을 복사합니다.
- **Icons 탭** — InstUI 세트(~1,800 아이콘) 또는 Simple Icons(~3,300 브랜드 글리프)에서 개별 아이콘을 선택합니다. 피커는 아이콘 CSS 파일용 별도 결합 URL을 출력하므로 실제로 사용하는 아이콘만 로드할 수 있습니다.
- **Web Components 탭** — `@pantoken/web-components` 스니펫(ESM 선택적 등록 또는 클래식 스크립트 부트스트랩)을 생성합니다.

각 컴포넌트 파일은 작으며 대부분 약 2KB입니다. 아이콘을 렌더링하는 컴포넌트(`alert`, `checkbox` 등)는 해당 글리프가 필요하므로, 빌더는 레인 시트를 선택할 경우 `@pantoken/components/dist/component-icons.css`(gzip 약 0.5KB — 컴포넌트 세트가 사용하는 11개 아이콘)을 추가합니다. 전체 시트는 이미 이들을 포함합니다.

### 로드 순서 및 폰트

토큰 기반을 먼저 로드한 다음 선택적 기본 리셋을 로드하고, 그다음 컴포넌트 파일을 로드하며 유틸리티는 마지막에 로드하세요 — 유틸리티는 오버라이드용이므로 캐스케이드에서 컴포넌트 규칙보다 나중에 위치해야 실제로 오버라이드합니다. 위의 결합 URL은 이미 올바른 순서로 정렬합니다. 폰트는 예외입니다: `@pantoken/components/dist/fonts.css`는 상대 경로로 폰트 파일을 가리키므로 결합이 이를 재작성할 수 없습니다 — 해당 항목은 별도의 `<link>`로 로드하세요:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### 한 번에 모두

피커에서 **All components**를 체크하면 배럴로 전환되거나 직접 지정할 수 있습니다(약 gzip 141KB). 토큰 시트와 함께 사용하세요:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## 웹 컴포넌트

`@pantoken/web-components`은 프레임워크에 구애받지 않는 `<instui-*>` 커스텀 요소를 등록합니다. 이들은 자체 CSS를 인라인하지만 여전히 페이지의 시트에서 토큰을 읽으므로 토큰 기반도 함께 로드하세요.

### ES 모듈(권장)

ESM CDN은 패키지의 의존성을 대신 해결해 줍니다. 이 방법은 모든 요소를 등록합니다:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

아이콘 렌더링 요소가 글리프를 해결할 수 있도록 전체 토큰 시트(또는 레인 시트 + `component-icons.css`)를 사용하세요.

일부 요소와 그 중첩 의존성만 등록하려면 `register`을 임포트하고 `only`를 전달하세요:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### 클래식 스크립트 태그

모듈을 사용하지 않는 드롭인 방식은 IIFE 빌드를 로드하세요. 이 빌드는 의존성을 번들링하고 로드 시 모든 요소를 자동 등록하며 `PantokenWebComponents` 전역을 노출합니다:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

ESM 경로보다 크며 — `@pantoken/components`과 `@pantoken/icons`을 인라인하므로 — 모듈을 사용할 수 없을 때만 이 방식을 사용하세요.

## 버전 고정

위의 URL과 피커가 작성하는 URL은 최신 릴리스를 가리킵니다. 운영 환경에서는 메이저(또는 정확한) 버전을 고정하세요 — 예: `@pantoken/css@0` — 업그레이드로 놀라지 않도록 합니다.
