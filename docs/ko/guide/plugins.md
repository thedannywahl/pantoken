# 플러그인

pantoken 플러그인은 패키지를 포크하지 않고 토큰 또는 CSS 출력을 확장합니다. `definePlugin`을(를) `@pantoken/plugin-kit`에서 사용해 하나를 만들고, 그런 다음 `buildTokens` 또는 `toCss`에 전달합니다.

## 플러그인 작성

구현한 훅을 `definePlugin`에 제공하세요. 그러면 해당 훅들로부터 추론된 기능을 브랜드로 가진 일반 플러그인이 반환됩니다. 플러그인은 IR(`tokens`, `icons`), CSS 출력(`css`) 또는 둘 다를 확장할 수 있습니다.

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

`buildTokens`와 `toCss`는 전달한 플러그인들에 대해 `checkPlugins`을(를) 실행합니다. 등록된 단계에 대해 일치하는 훅이 없는 플러그인에 대해 경고를 표시하지만 예외를 던지지는 않습니다 — 따라서 토큰 전용 플러그인이 `toCss`에 전달되면 아무것도 조용히 하지 않고 메모와 함께 건너뜁니다.

## 플러그인 합성

`extendPlugin`을(를) 사용해 다른 플러그인 위에 구축하거나, 동급 플러그인들을 `mergePlugin`으로 결합하세요:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

같은 단계의 훅은 합성됩니다: `tokens`은(는) 베이스를 먼저 실행한 다음 추가를 실행하고, `css`은(는) 두 기여를 병합하며, `icons`은(는) 둘 다 실행합니다.

## 플러그인 출력 검증

플러그인의 자체 출력에 대해 공유된 드리프트 검사를 `@pantoken/utils`에서 실행하도록 테스트에 포함하세요. 그러면 오타나 이름이 바뀐 토큰이 빠르게 로컬에서 실패합니다:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 번들된 플러그인들

- `@pantoken/plugin-simple-icons` — simple-icons의 브랜드 아이콘을 아이콘 토큰으로 등록합니다.
- `@pantoken/plugin-lucide-lab` — Lucide Lab 아이콘을 `--instui-icon-*` 이미지 토큰으로 등록합니다.
- `@pantoken/plugin-logos` — Instructure 제품 로고를 SVG, 데이터 URI 및 `--instui-logo-*` 이미지 토큰으로 제공합니다.
- `@pantoken/plugin-prune-custom-props` — 사용되지 않는 커스텀 프로퍼티를 스타일시트에서 제거하는 PostCSS 플러그인( pantoken 플러그인은 아님)입니다.
- `@pantoken/plugin-custom-theme-colors` — 한 속성(`data-pantoken-color`)을 13개 팔레트 중 하나로 설정하거나 임의의 브랜드 헥스에 대해 `custom`로 설정해 페이지의 브랜드를 재지정합니다. [테마 색상](#theme-colors)을 참조하세요.

Lucide Lab의 레지스트리는 지연 로드할 수 있으며, 그런 다음 동기 토큰 훅에 전달할 수 있습니다:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

예전에는 플러그인이었던 몇 가지는 이제 많은 컴포넌트가 기본으로 필요로 하기 때문에 `@pantoken/components`에 함께 제공됩니다: 엘리베이션 그림자(`--instui-elevation-*`, `components.css`에 있음), 포커스-아웃라인 링(`base.css`에 있음 — pantoken이 페이지를 소유할 때 모든 포커스 가능한 요소에 적용됨), 그리고 Instructure 브랜드 폰트(Atkinson Hyperlegible Next: `base.css`은(는) `--instui-font-family-base`을(를) 적용하며; 옵트인 `@pantoken/components/fonts.css`은(는) `@font-face` woff2s를 로드합니다).

## 테마 색상 {#theme-colors}

`@pantoken/plugin-custom-theme-colors`는 팔레트마다 하나의 `[data-pantoken-color="…"]` 블록을 출력합니다
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). 각 블록은 선택된 팔레트를 브랜드 원시값(`--instui-primitive-color-navy-*` 및 `-blue-*`)으로 가리킵니다. 또한 업스트림이 리터럴 헥스로 평탄화한 브랜드 표면을 재파생하고, `color-mix()`를 통해 그들의 베이크된 알파를 유지합니다. 의미적 상태 색상, 명시적 파란색 악센트, 엘리베이션 그림자는 그대로 유지됩니다. [스와치 기반 테마 데모](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)에서 시도해 보세요.

```html
<html data-pantoken-color="sea"></html>
```

### 맞춤 브랜드 색상

관리자가 테마 편집기에서 입력하는 기본 색상과 같이 아무 헥스에서나 재브랜딩하려면 `data-pantoken-color="custom"`를 설정하세요. pantoken은 그로부터 전체 10–200 `--instui-primitive-color-custom-*` 스케일을 도출합니다:

1. **참조 곡선.** 각 단계의 목표 명도는 해당 단계에서 13개 팔레트의 OKLCH 명도의 평균이며, 0은 흰색으로 고정되고 210은 검정으로 고정됩니다. 따라서 맞춤 스케일의 간격은 제공된 팔레트들의 것과 일치합니다.
2. **앵커.** 입력 색상은 자신의 명도와 가장 가까운 목표 명도를 가진 단계에 위치하며, 그 정확한 명도로 스냅됩니다. `#cccccc`는 `#c9c9c9`에서 `custom-40`가 됩니다: 입력과 가깝지만 항상 동일하지는 않습니다. "가장 가까운"은 곡선상의 가장 가까운 단계이며 기존 팔레트 색상 중 가장 유사한 것을 의미하지 않습니다.
3. **채움.** 다른 모든 단계는 입력의 색상(Hue)을 유지합니다. 채도는 앵커에 대한 팔레트들의 평균 채도 곡선을 따르며, 색상이 sRGB 범위를 벗어나는 경우에만 줄어듭니다.

허용되는 입력은 `#rgb`과 `#rrggbb`뿐이며; 그 외는 `TypeError`를 던지므로 폼에서 받은 헥스가 CSS를 주입할 수 없습니다.

빌드 시에는 파생된 원시값이 이미 선언된 전체 규칙을 출력하세요:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

토큰 세트를 배포하지 않고 런타임에서 색상을 선택하려면 곡선과 리맵 규칙을 빌드 시 선계산(precompute)하세요. 그런 다음 브라우저에서 종속성이 없는 `/scale` 엔트리를 사용하고, 20개의 파생 원시값만 설정하세요:

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

문서 사이트의 테마 선택기, Canvas 테마 편집기, 위의 데모는 모두 이 방식을 사용합니다.

각 플러그인의 내보내기 항목에 대한 내용은 [API 참조](/api/)를 참조하세요.
