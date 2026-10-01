# 플러그인

pantoken 플러그인은 패키지를 포크하지 않고 토큰 또는 CSS 출력을 확장합니다. `definePlugin` 를 `@pantoken/plugin-kit` 에서 만들어, `buildTokens` 또는 `toCss` 에 전달해 사용합니다.

## 플러그인 작성

구현한 훅을 `definePlugin` 에 제공하세요. 그러면 해당 훅으로부터 유추된 기능을 브랜드화한 일반 플러그인을 반환합니다. 플러그인은 IR을 확장할 수 있습니다 (`tokens`, `icons`), CSS 출력을 확장할 수 있습니다 (`css`), 또는 둘 다 가능합니다.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 기능 인식 등록

`buildTokens` 과 `toCss` 은 전달한 플러그인들에 대해 `checkPlugins` 를 실행합니다. 플러그인이 등록된 단계에 일치하는 훅이 없을 경우 경고만 하고 예외를 던지지 않습니다 — 따라서 토큰 전용 플러그인이 `toCss` 에 전달되면 아무 동작을 하지 않고 조용히 넘어가는 대신 메모와 함께 건너뜁니다.

## 플러그인 합성

`extendPlugin` 으로 다른 플러그인 위에 빌드하거나, 동등한 플러그인들을 `mergePlugin` 으로 결합하세요:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

같은 단계의 훅들은 합성됩니다: `tokens` 은 먼저 베이스를 실행한 다음 추가를 실행하고, `css` 은 두 기여를 병합하며, `icons` 은 둘 다 실행합니다.

## 플러그인 출력 검증

플러그인의 자체 출력에 대해 공유된 드리프트 검사를 `@pantoken/utils` 에서 실행하도록 테스트에 추가하세요. 그러면 오타나 이름 변경된 토큰이 빠르게 로컬에서 실패합니다:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 번들된 플러그인들

- `@pantoken/plugin-simple-icons` — simple-icons에서 브랜드 아이콘을 가져와 아이콘 토큰으로 등록합니다.
- `@pantoken/plugin-lucide-lab` — Lucide Lab 아이콘을 `--instui-icon-*` 이미지 토큰으로 등록합니다.
- `@pantoken/plugin-logos` — Instructure 제품 로고를 SVG, 데이터 URI, 및 `--instui-logo-*` 이미지 토큰으로 제공합니다.
- `@pantoken/plugin-prune-custom-props` — 사용되지 않는 커스텀 프로퍼티를 스타일시트에서 제거하는 PostCSS 플러그인(항상 pantoken 플러그인은 아님).
- `@pantoken/plugin-custom-theme-colors` — 한 속성(`data-pantoken-color`)을 13개 팔레트 중 하나로, 또는 임의의 브랜드 헥스로 `custom` 로 설정해 페이지를 리브랜딩합니다. [테마 색상](#theme-colors) 참조.
- `@pantoken/plugin-custom-components` — SegmentedControl 및 SkeletonLoader를 포함한 토큰 기반 커스텀 컨트롤들.

### 분할 컨트롤

분할 컨트롤은 두 개에서 다섯 개의 관련된 뷰 또는 필터에 사용하세요. 각 옵션은 하나의 이름 붙은 그룹에 속한 레이블이 있는 네이티브 라디오입니다; 초기에는 하나를 체크된 상태로 표시하세요. 옵션이 편히 들어가지 않으면 탭 또는 드롭다운을 사용하고, 행동을 위한 경우에는 선택 대신 버튼 그룹을 사용하세요. `-size-md` 스타일이 기본이며, 더 타이트하거나 눈에 띄는 문맥에는 `-size-sm` 과 `-size-lg` 을 사용합니다.

컨트롤과 오버플로우 버튼은 `@pantoken/plugin-custom-components/segmented-control.css` 을 임포트하세요. 세그먼트에 글리프가 필요할 때는 세그먼트 레이블에 `-icon-*` 클래스를 사용하세요; 상호작용 헬퍼는 네이티브 입력에서 라벨 페인터로 `-icon-*` 클래스를 승격시키기도 합니다. 필드셋에는 설명적인 `aria-label` 또는 보이는 legend를 제공하세요. 헬퍼는 네이티브 라디오 안내를 보존하고, 키보드 내비게이션을 추가하며, 옵션적으로 화살표 누름마다 하나의 잘린 세그먼트를 드러냅니다. 양방향에서 논리적 시작/끝 컨트롤과 접근 가능한 버튼 라벨을 사용하세요:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

DOM 준비 등록을 위해 `@pantoken/interactions/segmented-control.iife.js` 을 임포트하거나, `@pantoken/interactions` 에서 `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` 를 호출하고 제거 시 `cleanup()` 를 호출하세요. CSS 및 네이티브 라디오 선택은 JS 없이도 동작합니다; 오버플로우 화살표는 동작이 필요합니다. 선택된 항목은 시맨틱 드롭-섀도우 색상에서 두 겹 디자인 섀도를 사용합니다; 이는 기존의 `--instui-elevation-*` 복합체가 아니라 별도의 활성 항목 섀도입니다. 오버플로우 버튼은 `--pantoken-segmented-overflow-shadow` 을 통해 업스트림 elevation3 컴포넌트 토큰을 사용합니다.

### 스켈레톤 로딩

`skeleton-loader.css` 서브패스는 한 개의 장식용 Text, Avatar, 또는 Image 형태를 스타일링합니다. Text는 `-size-xxs` 를 `-size-xxl` 를 통해 허용하며; Avatar와 Image는 중간 크기입니다. 각 선택적 `.skeleton-row` 는 크기를 변경하지 않고 한 줄의 텍스트를 추가합니다. CSS 쉬머는 1.5초 회전에 3번까지 멈추고, 사용자가 동작 축소를 선호하면 정지 상태로 유지됩니다. 이는 JavaScript가 로드되기 전에도 동작합니다.

형태는 쿼리 의존적 콘텐츠가 나타날 위치에만 배치하세요; 서버에서 이미 알고 있는 내비게이션, 필터, 헤딩, 또는 컨트롤 위에 두지 마세요. 스켈레톤은 진행 표시기나 작업 대기 상태가 아닙니다. 백그라운드 새로고침 동안 기존 콘텐츠를 계속 보이게 유지하세요; 작업에는 스피너나 버튼의 busy 상태를 사용하세요.

상위 애플리케이션은 loading, loaded, empty, error 마크업을 소유합니다. 페이지당 하나의 empty 상태 영역과 서버 HTML에 별도의 empty alert를 제공하세요. 둘 다 바쁜 콘텐츠 영역의 밖에 있어야 합니다:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

요청 상태가 변경될 때 상위 레벨 동작을 호출하세요. 이는 `aria-busy` 와 기존의 두 안내를 업데이트하지만, 콘텐츠를 교체하거나 포커스를 이동시키지는 않습니다:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

컴포넌트별 상호작용 번들을 직접 임포트하는 대신 사용할 경우, `[data-skeleton-region]` 요소에서 `pantoken:skeleton-state` 이벤트를 `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` 과 함께 디스패치하세요. 빠른 요청에는 플레이스홀더 표시를 200–500ms 지연하세요; 동작은 로딩 안내를 별도로 400ms 지연합니다. 수동 페이지 로드에서는 포커스를 그대로 두세요. 사용자의 직접적인 동작으로 요청된 경우에만 새로 로드된 결과로 포커스를 이동하세요. 상태 노드는 결과와 비어있는 상태를 안내하고; alert 노드는 실패를 안내합니다. 하나의 요소에 `aria-busy`, `role="status"`, 그리고 `role="alert"` 를 결합하지 마세요.

Lucide Lab의 레지스트리는 지연 로드한 다음 동기 토큰 훅에 전달할 수 있습니다:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

예전에는 플러그인이었던 몇 가지는 이제 `@pantoken/components` 에 번들로 포함되어 많은 컴포넌트가 기본적으로 필요로 합니다: elevation 섀도우들 (`--instui-elevation-*`, `components.css` 내), 포커스-아웃라인 링 ( `base.css` 내 — pantoken이 페이지를 소유할 때 모든 포커서블에 적용), 그리고 Instructure 브랜드 폰트들(Atkinson Hyperlegible Next: `base.css` 는 `--instui-font-family-base` 를 적용; 옵트-인 `@pantoken/components/fonts.css` 는 `@font-face` woff2 파일들을 로드).

## 테마 색상 {#theme-colors}

`@pantoken/plugin-custom-theme-colors` 은 팔레트당 하나의 `[data-pantoken-color="…"]` 블록을 배출합니다
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). 각 블록은 브랜드 기본값들(`--instui-primitive-color-navy-*` 및 `-blue-*`)을 선택된 팔레트로 가리키게 합니다. 또한 업스트림에서 리터럴 헥스로 평탄화된 브랜드 표면들을 재유도하여, `color-mix()` 을 통해 베이크된 알파를 유지합니다. 시맨틱 상태 색상, 명시적 파란색 악센트, 및 elevation 섀도우는 그대로 유지됩니다. [스와치 기반 테마 데모](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)에서 시도해 보세요.

```html
<html data-pantoken-color="sea"></html>
```

### 커스텀 브랜드 색상

어떤 헥스에서든 리브랜딩하려면 `data-pantoken-color="custom"` 를 설정하세요 — 예를 들어 Canvas 관리자가 테마 편집기에 입력한 기본색 등. pantoken은 그것으로부터 전체 10–200 `--instui-primitive-color-custom-*` 스케일을 유도합니다:

1. **참조 곡선.** 각 단계의 목표 명도는 13개 팔레트의 해당 단계에서 평균 OKLCH 명도이며, 0은 흰색으로 고정되고 210은 검은색으로 고정됩니다. 따라서 커스텀 스케일의 간격은 제공된 팔레트들과 일치합니다.
2. **앵커.** 입력 색상은 자신의 명도에 가장 근접한 단계에 배치되어 그 정확한 명도로 스냅됩니다. `#cccccc` 은 `#c9c9c9` 의 시점에서 `custom-40` 이 됩니다: 입력과 가깝지만 항상 동일하지는 않습니다. "가장 근접"은 곡선 상의 가장 가까운 단계라는 의미이며, 기존 팔레트 색상 중 가장 근접한 색을 의미하지 않습니다.
3. **채우기.** 다른 모든 단계는 입력의 색조(hue)를 유지합니다. 채도는 앵커에 대한 팔레트들의 평균 채도 곡선을 따르며, 색상이 sRGB 범위를 벗어나는 경우에만 감소됩니다.

허용되는 값은 `#rgb` 과 `#rrggbb` 뿐이며; 다른 값이 들어오면 `TypeError` 를 던집니다. 따라서 폼에서 전달된 헥스가 CSS를 주입할 수 없습니다.

빌드 시에는 유도된 기본값들이 이미 선언된 상태로 전체 규칙을 배출하세요:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

런타임에서 토큰 세트를 전송하지 않고 색상을 선택하려면, 곡선과 리맵 규칙을 빌드 시에 미리 계산하세요. 그런 다음 브라우저에서는 의존성 없는 `/scale` 엔트리를 사용하고, 20개의 유도된 기본값만 설정하세요:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

도움말 사이트의 테마 선택기, Canvas 테마 편집기, 그리고 위 데모는 모두 이 방식으로 동작합니다.

각 플러그인의 내보내기에 대해서는 [API 참조](/api/) 를 확인하세요.
