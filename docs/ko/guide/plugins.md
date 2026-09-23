# 플러그인

pantoken 플러그인은 패키지를 포크하지 않고 토큰 또는 CSS 출력을 확장합니다. `definePlugin`를 `@pantoken/plugin-kit`에서 사용하여 만들고, 그다음 `buildTokens` 또는 `toCss`에 전달합니다.

## 플러그인 작성

구현한 훅을 `definePlugin`에 제공합니다. 그러면 해당 훅에서 유추된 기능으로 표식된 일반 플러그인이 반환됩니다. 플러그인은 IR(`tokens`, `icons`), CSS 출력(`css`), 또는 둘 다를 확장할 수 있습니다.

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

`buildTokens`와 `toCss`는 전달된 플러그인들에 대해 `checkPlugins`을 실행합니다. 플러그인이 등록된 단계에 맞는 훅을 갖고 있지 않으면 경고를 출력하지만 예외를 던지진 않아서, 토큰 전용 플러그인이 `toCss`에 전달되면 아무 작업도 하지 않고 조용히 넘어가는 대신 메모와 함께 건너뜁니다.

## 플러그인 합성

`extendPlugin`로 다른 플러그인 위에 확장하거나, 동급 플러그인들을 `mergePlugin`로 결합합니다:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

같은 단계의 훅은 합성됩니다: `tokens`는 베이스를 실행한 다음 추가를 실행하고, `css`는 두 기여를 병합하며, `icons`는 둘 다 실행합니다.

## 플러그인 출력 검증

테스트에서 `@pantoken/utils`의 공통 드리프트 검사를 플러그인 자체 출력에 실행하여, 오타나 이름 변경된 토큰이 빠르게 지역적으로 실패하도록 합니다:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 번들된 플러그인들

- `@pantoken/plugin-simple-icons` — simple-icons의 아이콘을 브랜드 아이콘으로, 아이콘 토큰으로 등록합니다.
- `@pantoken/plugin-lucide-lab` — Lucide Lab 아이콘을 `--instui-icon-*` 이미지 토큰으로 등록합니다.
- `@pantoken/plugin-logos` — Instructure 제품 로고를 SVG, 데이터 URI 및 `--instui-logo-*` 이미지 토큰으로 제공합니다.
- `@pantoken/plugin-prune-custom-props` — 사용하지 않는 커스텀 프로퍼티를 스타일시트에서 제거하는 PostCSS 플러그인( pantoken 플러그인 아님).

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

예전에는 플러그인이었던 몇 가지 항목은 이제 많은 컴포넌트가 기본으로 필요로 하기 때문에 `@pantoken/components`에 함께 배포됩니다: 엘리베이션 그림자(`--instui-elevation-*`, `components.css`에 있음), 포커스-아웃라인 링(`base.css`에 있음 — pantoken이 페이지를 소유할 때 모든 포커스 가능한 요소에 적용), 그리고 Instructure 브랜드 폰트(Atkinson Hyperlegible Next: `base.css`가 `--instui-font-family-base`를 적용; 옵트인인 `@pantoken/components/fonts.css`는 `@font-face` woff2 파일들을 로드).

각 플러그인 내보내기에 대해서는 [API 레퍼런스](/api/)를 참조하세요.
