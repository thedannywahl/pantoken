# 컴포넌트

`@pantoken/components`는 Instructure 토큰으로 빌드된 클래스 기반 컴포넌트 스타일을 제공합니다. 스타일시트를 임포트하고 마크업에 태그하세요 — 프레임워크 불필요.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> 커스텀 요소를 선호하나요? `@pantoken/web-components`은 동일한 스타일을 `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` 등으로 래핑합니다 — [패키지 맵](/guide/packages) 참조.

## 규칙

이 패키지의 CSS 규칙은 수정된 버전의 [RSCSS](https://ricostacruz.com/rscss/index.html)를 기반으로 합니다.

모디파이어는 **키-값** 형식입니다 — `-<prop>-<val>`, InstUI prop 이름에 정렬되어 있어 자체 설명이 됩니다: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. 불리언 prop은 이름만 사용하며, 존재하면 `true`을 의미합니다 (`-has-shadow`, `-clickable`); 기본값이 켜진 불리언을 끄면 반전됩니다 (`-without-background`, `-without-border`). 사이즈는 짧은 표기와 긴 표기 둘 다 허용합니다 (`-size-sm` = `-size-small`). 이름이 InstUI와 다를 때는 InstUI 의미의 클래스가 여전히 작동하지만 더 이상 권장되지 않습니다(예: `-variant-info` → `-color-info` 사용).

### 예시

Instructure UI React 컴포넌트:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken 컴포넌트:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

InstUI의 `timeout` prop에 대해서는 단위 없는 밀리초 단위 `--timeout` 커스텀 프로퍼티를 설정하고 Alert 인터랙션을 로드하세요. 양수 값은 자동 닫기를 예약하며; `0`(기본값)은 알림을 그대로 둡니다. InstUI의 페이드 효과를 위해 `transition` 유틸리티의 `instui-transition -fade-entered` 클래스를 추가하세요; 즉시 제거하려면 생략합니다. 인터랙션은 `-fade-exiting` 상태를 구동하고 제거 전에 취소 가능한 버블링 `dismiss` 이벤트를 발행하므로, 애플리케이션은 `preventDefault()`을 호출해 알림을 유지할 수 있습니다.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

프로그레스 바는 `--min`(기본 `0`), `--value`, `--max`(`100` 기본값) 등을 통해 임의의 스케일을 허용하며, 더 이상 권장되지 않는 `--value-now` 및 `--value-max` 별칭이 있습니다. 값이 변경될 때 InstUI의 0.5초 전환을 적용하려면 `-should-animate`을 추가하세요. `.value`은 루트의 자식으로 `.bar`와 함께 위치합니다; 트랙 위에 시작 정렬로 렌더링하려면 대신 `-render-value-inside`을 추가하세요(미터 색상에 대비되게 스타일링하세요). 제로 기반 범위에는 네이티브 `<progress>`를 사용하고, 최소값이 0이 아닐 때는 `<meter>`를 사용하세요; 웹 컴포넌트는 자신의 `min` 속성에서 자동으로 선택합니다. InstUI에는 불확정(indeterminate) 상태가 없으므로 `<progress>`가 `value` 속성을 누락하면 pantoken에서 추정 처리합니다: `progress-bar`는 `.bar`를 슬라이딩 세그먼트로 애니메이트하고 `progress-circle`은 고정 각도로 링을 회전시키며 둘 다 `.value`을 숨깁니다.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

프로그레스 서클은 동일한 임의 스케일을 `--min`, `--value`, `--max`을 통해 허용합니다. `--value-now`와 `--value-max`은 더 이상 권장되지 않는 기능별 별칭으로 남아 있습니다. InstUI의 마운트 애니메이션을 재현하려면 `-should-animate`를 추가하고 포커스 인터랙션 번들을 로드하세요; `--animation-delay`는 단위 없는 밀리초 지연값입니다. 더 이상 권장되지 않는 `-should-animate-on-mount` 및 `-shold-animate-on-mount` 표기법도 기능별 별칭으로 남아 있습니다.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## 클래스 접두사

모든 클래스는 기본적으로 `instui-` 네임스페이스를 가집니다. 자체 접두사(또는 없음)로 스타일시트를 빌드하려면 어떤 빌더에든 `prefix`를 전달하세요. falsy 값(`null`, `undefined`, `""` 또는 생략)은 접두사를 완전히 제거하므로, `class="heading -level-h1"` 대신 `class="instui-heading -level-h1"`를 작성할 수 있습니다:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

대시 접두 모디파이어(`.-color-secondary`, `.-level-h1`)는 어느 쪽이든 변경되지 않습니다. 패키지에서 제공하는 스타일시트는 `instui` 접두사를 유지합니다.

## 베이스

`base.css`는 토큰에서 전역 문서 기본값을 설정하는 옵트인 리셋입니다: `box-sizing`, `body` 리셋, 페이지 표면, 기본 텍스트 색상 및 폰트, `color-scheme`(그래서 `light-dark()` 토큰과 네이티브 컨트롤이 테마를 따라감), 그리고 기본 링크. pantoken이 페이지를 소유할 때 컴포넌트 및 프로스 시트 전에 한 번 로드하세요.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

호스트가 이미 자체 `html`와 `body`로 테마를 적용하고 있다면 리셋을 건너뛰세요 — 리셋은 페이지 표면을 칠하므로 호스트와 충돌하기를 원치 않습니다. 리셋이 설정하는 모든 것은 낮은 특이성의 `:where()` 선택자이므로, 귀하의 규칙이 항상 우선합니다.

`base.css`은 브랜드 폰트(`font-family: var(--instui-font-family-base)`, 시스템 폴백 포함)를 _적용_합니다; 폰트를 _로드_하려면 옵트인 `fonts.css`을 임포트하세요 — `@font-face`는 패키지에 포함된 woff2를 가리키는 Atkinson Hyperlegible Next에 대한 규칙입니다. 폰트 파일은 약 350 kB이므로 별도 파일로 분리되어 있으며, 자체 호스팅 폰트는 신중한 선택입니다.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## 화면 낭독기용 콘텐츠

<p>이 문장 뒤에 숨겨진 메시지가 있습니다.<span class="instui-screen-reader-content">오직 화면 낭독기만이 이를 안내합니다.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content`는 접근성 트리에는 남겨두고 시각적으로 요소를 숨깁니다 — 디자인에 보이지 않아야 하지만 보조 기술이 읽어야 하는 레이블 및 상태 텍스트에 사용하세요.

## 유틸리티

`utilities.css`은 횡단적 클래스의 옵트인 레이어입니다: `View` 원시값, 토큰 스케일의 여백, 그리고 의미론적 색상 재정의. 컴포넌트의 `-modifier` 클래스와 달리, 이들은 **더블 대시**(`--mod`)를 사용하여 컴포넌트 자체 모디파이어 이름과 충돌하지 않으며 어떤 요소에도 적용됩니다 — 베어 요소이거나 컴포넌트에 합성된 경우 모두 가능.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue 표면과 on-color 텍스트.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto로 가운데 정렬.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view`는 InstUI의 `View`입니다. 여기에 여백과 색상을 레이어링하고, 자체 시각적 prop을 위한 키-값 모디파이어를 갖고 있어 유틸리티를 쓰지 않아도 됩니다: `-background-*` (표면), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, 및 `-cursor-*` — 이들은 `view`의 단일 대시 모디파이어로, 아래의 더블 대시 유틸리티와는 별개입니다. 너비/높이/인셋 같은 자유 값 속성은 인라인 스타일에 두세요; `margin`/`padding`는 여백 유틸리티를 사용합니다.

**Spacing(여백)** — 여백 스케일의 방향별 클래스입니다. `{m|p}{side}-{step}`처럼 읽습니다: 마진은 `m` 또는 패딩은 `p` (전체 단어 `margin`/`padding` 가능), 선택적 논리적 방향, 그리고 단계 숫자. 그래서 `.--m-lg`와 `.--margin-lg`는 동일하며, `.--pt-md`와 `.--paddingt-md`도 동일합니다.

- 방향: none(전체), `t`/`b`(블록 시작/종료), `s`/`e`(인라인 시작/종료), `x`/`y`(인라인/블록 축). 논리적 방향은 RTL 레이아웃에서도 올바르게 유지됩니다.
- 단계: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, 그리고 마진 전용 `auto`.

InstUI의 `margin="small auto large"` 약식 표기법을 위해 조합하세요:
`class="--mt-sm --mx-auto --mb-lg"`.

**색상** — 팔레트 내 의미론적 재정의: `.--bg-<name>`(배경), `.--text-<name>`(텍스트 색상), `.--border-<name>`(테두리 색상). 각 `<name>`는 의미론적 색상 토큰입니다 — 의도(intent)들(`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …)과 `accent-*` 팔레트(`accent-blue`, `accent-green` 등). 이름은 해당 계열에 토큰이 있을 때만 존재하므로 `text-brand`는 클래스가 아닙니다 — 텍스트에는 브랜드 토큰이 없습니다. 원시 값이나 임의의 헥스에 접근하는 방법은 없고 모든 재정의는 테마를 따릅니다.

**토큰 계열** — 모든 "하나의 토큰, 하나의 속성" 계열은 토큰당 하나의 클래스를 가집니다. 이름으로 자유롭게 조합하세요:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (및 `-depth1`…`-card`) → `box-shadow`

각 클래스는 하나의 속성만 설정하므로 `border-width`/`border-radius`는 실제 테두리를 그리려면 `border-*` 색상과 테두리 스타일이 필요합니다. 이들은 전체 토큰 이름(`.--border-radius-md`)을 사용하고, 위의 색상 및 여백 헬퍼는 단축 별칭(`.--bg-brand`, `.--mt-lg`)을 사용합니다 — 별칭은 사용성 향상용이며 토큰 클래스는 문자 그대로 포괄적입니다.

**레이아웃** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) 및 `.--text-align-<value>` (`start`, `center`, `end`, `justify`)는 InstUI의 횡단적 `display` 및 `textAlign` prop들(View, Button, Metric, Tabs 등)을 조합 가능한 클래스로 커버합니다 — 따라서 이들은 컴포넌트별 모디파이어가 아닙니다.

모든 더블 대시 클래스는 동일 이름의 단일 대시 컴포넌트 모디파이어보다 캐스케이드에서 결정적으로 우선합니다(스타일시트 임포트 순서와 무관). 메커니즘은 [작성 규칙](/conventions/authoring) 참조.

여기의 모든 것은 `--instui-*` 토큰으로 구동되는 순수 CSS이므로 토큰 레이어를 통해 InstUI를 따라갑니다. `componentsCss` 및 컴포넌트별 빌더는 [API 참조](/api/)를 보세요.

## 오버레이: 다이얼로그와 팝오버

오버레이 컴포넌트는 네이티브 플랫폼 프리미티브를 사용하므로 자바스크립트가 거의 또는 전혀 없어도 접근성 있게 동작합니다.

**모달** — 네이티브 `<dialog>`에 `.instui-modal`를 넣으세요. 포커스 트래핑, `Esc`로 닫기, 그리고 `::backdrop`을 기본적으로 얻습니다; 백드롭은 `.instui-mask`와 동일한 `--instui-component-mask-background-color` 토큰으로 어둡게 처리됩니다(얼음 효과를 원하면 `-blur` 추가). 인보커 명령으로 열고 닫으세요 — 스크립트 불필요:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**컨텍스트 뷰 / 팝오버** — `.instui-context-view`를 `[popover]` 요소에 넣고 `popovertarget`으로 토글하세요. 최상위 레이어를 타고 외부 클릭이나 `Esc`으로 라이트-디스미스되며, 마찬가지로 스크립트가 필요 없습니다:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**드로어 레이아웃** — 레이아웃 루트에 `.instui-drawer-layout`를 두고 `.tray` 및 `.content` 자식을 배치하세요. 트레이를 표시하려면 `open` 속성(또는 `-open`)을 추가하고, 인라인-끝 쪽에 도킹하려면 `placement="end"`(또는 `-placement-end`)을 사용하세요 — 배치는 논리적 `inset-inline-*`/`flex-direction` 속성을 통해 해결되어 `dir="rtl"`일 때 자동으로 반전되므로 추가 규칙이 필요 없습니다. 포커스 인터랙션 번들은 Invoker 명령 라우팅을 추가하고 너비가 `--drawer-layout-min-width`(기본 `--instui-breakpoints-sm`, 그 다음 `30rem`)를 넘을 때 오버레이 모드(`should-overlay-tray`)를 전환합니다:

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**마스크** — `.instui-mask`는 인-플로우 오버레이(카드 위의 스피너)에 사용되고; 모달의 `::backdrop`는 모달 케이스를 커버합니다.

두 패턴 모두 `@pantoken/web-components`에서 행동(custom behavior) 커스텀 요소로 래핑됩니다: `<instui-modal open>`(`<dialog>`이 `open` 속성으로 구동) 및 `<instui-context-view>`(네이티브 팝오버).

브라우저 지원: 팝오버 API 및 `popovertarget`는 Baseline 2024, 인보커 명령(`command`/`commandfor`)은 Baseline 2025이므로, 구형 브라우저에서는 버튼을 한 줄짜리 폴백으로 `dialog.showModal()`에 연결하세요. 트리거 옆에 팝오버를 위치시키는 것은 CSS 앵커 포지셔닝을 사용(Chromium에서 지원)하며, 다른 환경에서는 최상위 레이어 중앙에 배치됩니다.

## 폼

**FormField** — `.instui-form-field`은 레이블, 컨트롤, 메시지를 배치하는 CSS-Grid 래퍼입니다. 레이블이 네이티브로 컨트롤과 연결되도록 `<label>`에 적용하세요. 세 개의 그리드 영역을 가집니다 — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

기본값 `-layout-stacked`는 영역을 쌓고; `-layout-inline`는 레이블을 컨트롤 옆에 배치합니다( `-label-align-{start,end}` 및 `-v-align-{top,middle,bottom}`로 조정). `-readonly`는 레이블 색상을 변경합니다.

**필수 별표**는 필드가 `-required` 클래스 또는 내부의 네이티브 `required` 컨트롤 중 어느 쪽에 의해 필수로 지정되면 표시됩니다 — 따라서 입력에 `required`만 설정해도 마크가 표시됩니다. 이는 장식용(레이블에 있는 `::after`, 접근성 트리에서 제외)이며, 폼이 명확하지 않다면 "별표(*)가 있는 필드는 필수입니다"와 같은 메모와 짝지으세요.

**FormFieldGroup** — `.instui-form-field-group`은 관련 필드를 `<fieldset>`로 그룹화하고 `<legend>` 설명을 가집니다. 전적으로 레이아웃 전용(전용 토큰 없음): 기본은 필드를 스택하고; `-layout-columns`/`-layout-inline`는 반응형 컬럼으로 흐르게 하며, `-row-spacing-*`/`-col-spacing-*` 및 `-v-align-*`로 그리드를 조정합니다.

**RadioInputGroup** — `.instui-radio-input-group`은 동일한 `<fieldset>`/`<legend>` 그룹으로, 라디오에 특화되어 있습니다. 자식 라디오가 `name`을 공유하므로 선택은 네이티브로 단일 선택입니다 — 따라서 토글 버튼 세트는 느슨한 버튼이 아니라 하나의 컨트롤처럼 동작합니다. 기본값 `-variant-simple`는 표준 라디오를 배치하고(`-layout-columns`/`-inline`는 행으로 흐름), `-variant-toggle`는 자식 `.instui-radio.-variant-toggle` 버튼을 단일 분할 컨트롤로 연결합니다(겹친 테두리, 둥근 외곽 끝):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**메시지** — `.instui-form-field-messages`는 컨테이너이고; 각 `.instui-form-field-message`는 `-type-*`를 가집니다: `-type-hint`(회색, 기본), `-type-error`(빨간 텍스트 + 원경고 글리프), `-type-success`(녹색 텍스트 + 원체크 글리프), 및 `-type-screenreader-only`(시각적으로 클리핑되었으나 여전히 낭독됨). 글리프는 `currentColor`로 채색되어 항상 메시지 색과 일치합니다. `-type-new-error`는 `-type-error`의 더 이상 권장되지 않는 별칭입니다. 컨테이너를 `aria-describedby`로 컨트롤에 연결하고 오류가 있을 때 컨트롤에 `aria-invalid`를 설정하세요.

FormField 내부에서 `-type-error` 메시지는 클라이언트 사이드 유효성 검사에 따라 따릅니다: 필드의 컨트롤이 `:user-invalid`(사용자 상호작용 후 네이티브)일 때까지 숨겨져 있다가 표시되며 — 또는 서버 측 오류의 경우 `-invalid`을 `.instui-form-field`에 강제 설정하여 표시할 수 있습니다. 필드에 속하지 않은 독립형 `.instui-form-field-messages`는 영향을 받지 않습니다. 컨트롤의 포커스 링도 동일하게 작동합니다: `:user-invalid`/`-invalid`일 때 위험 상태, `-success`일 때 성공 상태입니다.

**텍스트 컨트롤** — `.instui-text-input`(네이티브 `<input>`), `.instui-text-area`(네이티브 `<textarea>`, 크기 조정 가능), 및 `.instui-simple-select`(네이티브 `<select>`와 캐럿)는 동일한 모양과 상태를 공유합니다: `-invalid`(오류 테두리), `-success`(성공 테두리), `-readonly`, 네이티브 `:disabled`, 및 `-size-{sm,md,lg}`. 선행/후행 아이콘(InstUI의 `renderBeforeInput`/`renderAfterInput`)을 위해 입력을 `.instui-input-group`로 래핑하고 `.before`/`.after` 슬롯(글리프용 `-icon-*`)을 추가하세요; `-should-not-wrap`는 한 줄을 유지합니다. `.instui-number-input`는 페사드와 `.arrows` +/- 스피너 컬럼(네이티브 `type="number"`; 버튼을 `stepUp()`/`stepDown()`에 연결)입니다. `.instui-range-input`은 스타일된 `input[type="range"]`로 값이 `.instui-range-input-value` 역버블에 렌더됩니다. 리스트박스 팝오버가 있는 리치 콤보박스는 `@instructure/ui`를 사용하세요 — 이 라이브러리는 네이티브 컨트롤을 포괄합니다.

**스타일된 셀렉트 드롭다운(실험적)** — 옵트인 `select.css`는 _동일한_ `.instui-simple-select` 요소를 업그레이드합니다: 열릴 때 드롭다운(패널 및 각 옵션, 호버 및 선택 상태)을 CSS Customizable Select 모델로 스타일링합니다.

> [!WARNING]
> `select.css`는 **실험적**인 `appearance: base-select` / `::picker(select)`에 의존합니다(Chrome 135+, 아직 Baseline 아님). 별도의 옵트인 시트로 제공되며 모든 규칙이 `@supports (appearance: base-select)` 뒤에 게이트되어 있어, 지원되지 않는 브라우저에서는 아무 동작도 하지 않습니다 — `.instui-simple-select` 컨트롤은 기본 네이티브 셀렉트 상태로 남습니다. 향상된 드롭다운을 원하고 제한된 지원을 수용하는 경우에만 로드하세요.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
