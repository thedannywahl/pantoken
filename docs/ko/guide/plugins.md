# 플러그인

pantoken 플러그인은 패키지를 포크하지 않고 토큰이나 CSS 출력을 확장합니다. `definePlugin`을 `@pantoken/plugin-kit`에서 만들어서, 그런 다음 `buildTokens` 또는 `toCss`에 전달합니다.

## 플러그인 작성하기

구현한 훅을 `definePlugin`에 제공합니다. 그러면 그 훅들로부터 추론된 기능을 브랜드로 갖는 일반 플러그인이 반환됩니다. 플러그인은 IR(`tokens`, `icons`), CSS 출력(`css`) 또는 둘 모두를 확장할 수 있습니다.

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

`buildTokens`과 `toCss`은 전달한 플러그인들에 대해 `checkPlugins`을 실행합니다. 이 과정은 경고를 발생시키지만 예외를 던지지는 않습니다 — 플러그인이 등록된 단계에 해당하는 훅이 없으면, 토큰 전용 플러그인이 `toCss`에 전달되었을 때 아무것도 조용히 수행하지 않고 건너뛰는 대신 메모와 함께 건너뜁니다.

## 플러그인 합성

`extendPlugin`으로 다른 플러그인 위에 구축하거나, `mergePlugin`으로 동급 플러그인들을 결합하세요:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

동일 단계 훅은 합성됩니다: `tokens`는 기본을 먼저 실행한 후 추가를 실행하고, `css`는 두 기여를 병합하며, `icons`는 둘 다 실행합니다.

## 플러그인 출력 검증

플러그인 자체 출력에 대해 공유 드리프트 검사를 테스트에서 `@pantoken/utils`로 실행하세요. 이렇게 하면 오타나 토큰 이름 변경이 빠르게 로컬에서 실패합니다:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## 번들된 플러그인들

- `@pantoken/plugin-simple-icons` — simple-icons의 아이콘을 브랜드로 하여 아이콘 토큰으로 등록합니다.
- `@pantoken/plugin-logos` — Instructure 제품 로고를 SVG, 데이터 URI, 및 `--instui-logo-*`
  이미지 토큰으로 제공합니다.
- `@pantoken/plugin-prune-custom-props` — 사용되지 않는 커스텀 프로퍼티를 스타일시트에서 제거하는 PostCSS 플러그인(이는 pantoken 플러그인이 아님).

예전에 플러그인이었던 몇 가지는 이제 많은 컴포넌트가 기본으로 필요하기 때문에 `@pantoken/components`에 번들로 제공됩니다: elevation 그림자(`--instui-elevation-*`, `components.css`에 있음), 포커스-아웃라인 링(`base.css`에 있음 — pantoken이 페이지를 소유할 때 모든 포커스 가능한 요소에 적용), 그리고 Instructure 브랜드 폰트(Atkinson Hyperlegible Next: `base.css`가 `--instui-font-family-base`을 적용; 옵트-인 `@pantoken/components/fonts.css`은 `@font-face` woff2 파일들을 로드함).

각 플러그인 내보내기에 대한 자세한 내용은 [API 레퍼런스](/api/)를 참조하세요.
